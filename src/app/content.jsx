'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { FormLogin } from './components/formLogin/formLogin';
import { useSelector } from 'react-redux';
import { EmpleadoList } from './components/empleadoList/empleadoList';
import { BtnAdicionar } from './components/btnAdicionar/btnAdicionar';
import { FormUsuario } from './components/formUsuario/formUsuario';
import { EmpleadoPage } from './components/empleadoPage/empleadoPage';
import { BtnLogout } from './components/btnLogout/btnLogout';

/**
 * Contenedor de la pantalla principal de la aplicacion
 */
export default function Content() {
  const stateSession = useSelector((state) => state.session.stateSession);
  const stateModal = useSelector((state) => state.modal.stateModal);
  const name = useSelector((state) => state.session.name);
  const rol = useSelector((state) => state.session.rol);

  if(stateSession === 1){
    if(rol === 'Administrador'){
      return (
        <div> 
          <div className={styles.head}>
             <div className={styles.description}>
                  {name}
              </div>
              <p className={styles.rol}>
                  ({rol})
              </p>
          </div>
          <div className={styles.containerApp}>
            <BtnAdicionar />
            <EmpleadoList />
            <BtnLogout />
            {stateModal ? <FormUsuario /> : null}
          </div>
        </div>
      )
    }else{
      return (
        <div>
          <EmpleadoPage />
          <BtnLogout />
        </div>
      )
    }
  }else{
    return (
        <div>
          <div className={styles.description}>
            Bienvenidos al sistema de gestión de empleados!
          </div>
          <FormLogin />
        </div>
    )
  }
}