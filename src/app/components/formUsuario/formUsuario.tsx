import React, { useState, useEffect } from 'react';
import styles from './formUsuario.module.css';
import { useDispatch } from 'react-redux';
import { HIDE } from './../../services/modal';
import { useSelector } from 'react-redux';
import { rolList } from './../../services/rolList';

/**
 * Retorna el formulario que adiciona o edita un Usuario
 */
function FormUsuario(){
    const dispatch = useDispatch();
    const token = useSelector((state) => state.session.token);
    const id = useSelector((state) => state.modal.id);

    const [nombres, setNombres] = useState<any>('');
    const [apellidos, setApellidos] = useState<any>('');
    const [correo, setCorreo] = useState<any>('');
    const [nacimiento, setNacimiento] = useState<any>('');
    const [cargo, setCargo] = useState<any>('');
    const [roles, setRoles] = useState<any[]>([]);


    if(id){
        useEffect(() => {
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
                        }
                    } catch (error) {
                        console.error('Error en la solicitud:', error);
                    }
                }
        
                getUserData();
        }, []);
    }else{
        useEffect(() => {
            const getRoles = async () => {
                const cargos = await rolList();
                setRoles(cargos);
              };

              getRoles();
        },[]);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        saveUsuario();
    };

    const saveUsuario = async () => {
        const url = id > 0 ? `http://localhost:3001/api/usuario/${id}` : `http://localhost:3001/api/usuario`;
        const method = id > 0 ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            body: new URLSearchParams({
                fecha_nacimiento: nacimiento,
                nombres,
                apellidos,
                correo,
                cargo
                })
            });

            if (!response.ok) {
                throw new Error(`Error en la autenticación: ${response.statusText}`);
            }

            const data = await response.json();

            if(data.success){
                dispatch(HIDE());
            }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
    }

    function close(){
        dispatch(HIDE());
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmit} className={styles.formStyles}>
                <p>
                <input 
                    type="text" 
                    className={styles.formFields} 
                    placeholder="nombres" 
                    value={nombres} 
                    onChange={(e) => setNombres(e.target.value)} 
                    required
                    />
                </p>

                <p>
                <input 
                    type="text" 
                    className={styles.formFields} 
                    placeholder="Apellidos"
                    value={apellidos}  
                    onChange={(e) => setApellidos(e.target.value)}
                    required
                    />
                </p>

                <p>
                <input 
                    type="text" 
                    className={styles.formFields} 
                    placeholder="Correo"
                    value={correo} 
                    onChange={(e) => setCorreo(e.target.value)} 
                    required
                    />
                </p>
                {
                !id ?
                    <div>
                        <p>
                        <input 
                            type="date" 
                            className={styles.formFields} 
                            placeholder="Fecha de Nacimiento"
                            onChange={(e) => setNacimiento(e.target.value)} 
                            required
                            />
                        </p>
                    
                        <div>
                            <p>
                                <label className={styles.label}>Seleccione el Cargo: </label>
                            </p>
                        <select id="cargos" 
                        className={styles.select} 
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        >
                        {roles.map((rol) => {
                        return (
                            <option key={rol} value={rol}>
                            {rol}
                            </option>
                        );
                        })}
                    </select>
                    </div>
                    </div>
                    
                : null
                }
                <div className={styles.buttonContainer}>
                <button className={styles.btn}>{id > 0 ? 'Editar' : 'Adicionar'}</button>
                <button className={styles.btn} onClick={()=>{close()}}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}

export { FormUsuario };