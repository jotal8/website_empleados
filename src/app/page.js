'use client';

import Image from 'next/image'
import styles from './page.module.css'
import { Form } from './components/form';
import { Provider } from 'react-redux';
import store from './services/store';
import Content from './content';

export default function Home() {
  const a = 2;

  return(
    <Provider store={store} >
      <main className={styles.main}>
        <Content />
      </main>
    </Provider>
  )
}