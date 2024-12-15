'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { Form } from './components/form';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { LOGOUT } from './services/session';


export default function Content() {
  const stateSession = useSelector((state) => state.session.stateSession);
  const dispatch = useDispatch();
  
  function logout(){
    dispatch(LOGOUT());
  }

  if(stateSession === 1){
    return (
      <div>
          <div className={styles.description}>
              Hola NOMBRE
          </div>
          <div className={styles.exitButton} onClick={logout}>
              Salir
          </div>
      </div>
        
    )
  }else{
    return (
        <div>
          <div className={styles.description}>
            Bienvenidos al sistema de gestión de empleados!
          </div>
          <Form />
        </div>
    )
  }
}