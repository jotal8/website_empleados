import React, { useEffect, useState } from 'react';
import styles from './empleadoPage.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { SHOW, setId } from './../../services/modal';
import { rolList } from './../../services/rolList';

/**
 * Genera la tabla con la información del empleado
 */
const EmpleadoPage = () => {
  const id = localStorage.getItem('id');

  const [nombres, setNombres] = useState<any>('');
  const [apellidos, setApellidos] = useState<any>('');
  const [correo, setCorreo] = useState<any>('');
  const [nacimiento, setNacimiento] = useState<any>('');
  const [cargo, setCargo] = useState<any>('');
  const token = useSelector((state) => state.session.token);
  const [roles, setRoles] = useState<any[]>([]);
  const [message, setMessage] = useState<any>('');

  useEffect(() => {
    const getRoles = async () => {
      const cargos = await rolList();
      setRoles(cargos);
    };

    const getUserData = async () => {
        try {
                const response = await fetch(`http://localhost:3001/api/usuario/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                });

                if (!response.ok) {
                    throw new Error(`Error en la autenticación: ${response.statusText}`);
                }

                const data = await response.json();

                if(data.success){
                    const datos = data.data;
                    setNombres(datos.nombres);
                    setApellidos(datos.apellidos);
                    setCorreo(datos.correo);
                    setNacimiento(datos.nacimiento);
                    setCargo(datos.cargo);
                    getRoles();
                }
          } catch (error) {
              console.error('Error en la solicitud:', error);
          }
        }

        getUserData();
}, []);

  function updateCargo(cargo){
    const saveUsuario = async () => {
      try {
          const response = await fetch(`http://localhost:3001/api/usuario/${id}`, {
          method: 'PUT',
          headers: {
              'Authorization': 'Bearer ' + token
          },
          body: new URLSearchParams({
              cargo
              })
          });

          if (!response.ok) {
              throw new Error(`Error en la autenticación: ${response.statusText}`);
          }

          const data = await response.json();

          if(data.success){
              setCargo(cargo);
              setMessage('Se ha actualizado Correctamente!');
          }
          } catch (error) {
              console.error('Error en la solicitud:', error);
              setMessage('No fue posible resolver la solicitud');
          }
    } 

    saveUsuario();
  }

  return (
    <div>
      <table border="1" className={styles.tableEmpleado}>
        <thead>
            <tr>
                <th colSpan="2"></th>
            </tr>      
          </thead>
            <tbody>
                <tr>
                  <td className={styles.formFields}>Nombres</td>
                  <td className={styles.formFields}><span>{nombres}</span></td>
                </tr>
                <tr>
                  <td className={styles.formFields}>Apellidos</td>
                  <td className={styles.formFields}><span>{apellidos}</span></td>
                </tr>
                <tr>
                  <td className={styles.formFields}>Correo</td>
                  <td className={styles.formFields}><span>{correo}</span></td>
                </tr>
                <tr>
                  <td className={styles.formFields}>Fecha de Nacimiento</td >
                  <td className={styles.formFields}><span>{nacimiento}</span></td>
                </tr>
                <tr><td className={styles.formFields}>Cargo</td><td>
                  <select id="cargos" 
                    className={styles.select} 
                    value={cargo}
                    onChange={(e) => updateCargo(e.target.value)} 
                    >
                    {roles.map((rol) => {
                      return (
                        <option key={rol} value={rol}>
                          {rol}
                        </option>
                      );
                    })}
                  </select>
                </td>
                </tr>
            </tbody>
        </table>
        <p className={styles.message}>{message}</p>
    </div>
  );
};

export { EmpleadoPage };