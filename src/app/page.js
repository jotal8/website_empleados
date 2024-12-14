import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  const a = 2;

  if(a == 1){
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          Estas loggeado!!!
        </div>
      </main>
    )
  }else{
    return (
      <main className={styles.main}>
        <div className={styles.description}>
          Estas loggeado!!!Bienvenidos al sistema de gestión de empleados!
        </div>
        <form className={styles.formLogin}>
            <p>
              <input type="text" name="email" />
            </p>

            <p>
              <input type="password" name="password" />
            </p>
  
            <div className={styles.buttonContainer}>
              <button className={styles.ingresarBtn}>Ingresar</button>
            </div>
          </form>
      </main>
    )
  }
    
}
