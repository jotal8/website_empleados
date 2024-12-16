import React, { useEffect, useState } from 'react';
import styles from './empleadoList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { SHOW, setId } from './../../services/modal';

/**
 * Genera la tabla con el listado de empleados
 */
const EmpleadoList = () => {
  const token = useSelector((state) => state.session.token);
  const stateModal = useSelector((state) => state.modal.stateModal);
  const [empleados, setEmpleados] = useState([]);
  const [search, setSearch] = useState();

  const dispatch = useDispatch();

  function abrirModal(id){
    dispatch(setId(id));
    dispatch(SHOW());
  }

  useEffect(() => {
    getEmpleadoList();
  },[]);
  
  const getEmpleadoList = async () =>{
    try {
      const response = await fetch('http://localhost:3001/api/usuario', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
        },
        });

          if (!response.ok) {
          throw new Error(`Error en la autenticación: ${response.statusText}`);
          }
  
          const data = await response.json();
          
          if(data.success){
            setEmpleados(data.data); 
          }
      } catch (error) {
          console.error('Error en la solicitud:', error);
      }
  }

  useEffect(() => {
    if (!stateModal) {
      getEmpleadoList();
    }
  }, [stateModal]);

  function deleteUser(id){
    const sendRequestToDelete = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/usuario/${id}`, {
          method: 'delete',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          });

            if (!response.ok) {
            throw new Error(`Error en la autenticación: ${response.statusText}`);
            }

            const data = await response.json();
            
            if(data.success){
              const newEmpleados = [...empleados];
              const empleadosIndex = newEmpleados.findIndex(
                empleado => empleado.id === id
              );
              newEmpleados.splice(empleadosIndex, 1);
              setEmpleados(newEmpleados);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
      }

      sendRequestToDelete();
  }

  const searched = empleados.filter(empleado => {
      const empleadoText = empleado.nombres.toLowerCase();
      const searchText = search ? search.toLowerCase() : '';
      return empleadoText.includes(searchText);
  });

  return (
        <div>
            <div>
              <input 
                placeholder='Aqui puedes filtrar!' 
                className={styles.filtro}
                value={search} 
                onChange={(event) => {setSearch(event.target.value);}}
                />
              </div>
            <table border="1" className={styles.tableEmpleados}>
              <thead>
                <tr>
                <th>Nombres</th><th>Apellidos</th><th>Cargo</th><th>Correo</th><th>Fecha de Nacimiento</th><th colSpan="2"> Acciones </th></tr>      
              </thead>
                <tbody>
                  {searched.map((empleado, index) => {
                    if(empleado.rol=='Administrador'){
                      return;
                    }
                    return (
                      <tr key={index} className={styles.empleadoCard}>
                        <td className={styles.row}>{empleado.nombres}</td>
                        <td className={styles.row}>{empleado.apellidos}</td>
                        <td className={styles.row}>{empleado.cargo}</td>
                        <td className={styles.row}>{empleado.correo}</td>
                        <td className={styles.row}>{empleado.nacimiento}</td>
                        <td className={styles.button} title="Edita el empleado"  onClick={()=>{abrirModal(empleado.id)}}>Editar</td>
                        <td className={styles.button} title="Elimina el empleado" onClick={() => deleteUser(empleado.id)}>Eliminar</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
          </div>
  );
};

export { EmpleadoList };