'use client'

import React, { useState } from 'react';
import styles from './formLogin.module.css';
import { setSession, setRol, setName, LOGIN } from '../../services/session';
import { useDispatch } from 'react-redux';

/**
 * Contiene el formulario para iniciar sesion
 */
const FormLogin = () => {
   const [responseText, setResponseText] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const dispatch = useDispatch();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const credenciales = { email, password };

  try {
    const response = await fetch('http://localhost:3001/api/public/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept':  '*/*',
        'Connection': 'keep-alive'
      },
      body: new URLSearchParams(credenciales),
      });

        if (!response.ok) {
        throw new Error(`Error en la autenticación: ${response.statusText}`);
        }

        const data = await response.json();
        setResponseText(data.message);

        if(data.success){
          localStorage.setItem('id', data.data.id);
          dispatch(setSession(data.token));
          dispatch(setRol(data.data.rol));
          dispatch(setName(data.data.nombre));
          dispatch(LOGIN());
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  };

  return (
        <form className={styles.formLogin} onSubmit={onSubmit}>
            <p>
              <input 
                type="text" 
                name="email" 
                className={styles.formFields} 
                placeholder="Correo" 
                onChange={(e) => setEmail(e.target.value)} 
                required
                />
            </p>

            <p>
              <input 
                type="password" 
                name="password" 
                className={styles.formFields} 
                placeholder="Contraseña" 
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </p>
            <p className={styles.responseText}>
              {responseText}
            </p>
            <div className={styles.buttonContainer}>
              <button className={styles.ingresarBtn}>Ingresar</button>
            </div>
        </form>
  );
};

export { FormLogin };