import Image from 'next/image'
import styles from './page.module.css'
import { Form } from './components/form';

export default function Home() {
  const a = 2;

  const onSubmit = (event) => {
    event.preventDefault();
  };

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
          Bienvenidos al sistema de gestión de empleados!
        </div>
        <Form />
      </main>
    )
  }
    
}
