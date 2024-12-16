'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { Provider } from 'react-redux';
import store from './services/store';
import Content from './content';

/**
 * Se inicializa el uso del store desde pagina principal
 */
export default function Home() {
  return(
    <Provider store={store} >
      <main className={styles.main}>
        <Content />
      </main>
    </Provider>
  )
}