import React, { useEffect, useState } from 'react';
import styles from './btnAdicionar.module.css';
import { useDispatch } from 'react-redux';
import { SHOW, setId } from './../../services/modal';

/**
 * Boton que adiciona Usuario
 */
const BtnAdicionar = () => {
  const dispatch = useDispatch();

  function abrirModal(){
    dispatch(SHOW());
    dispatch(setId(0));
  }

  return (
    <div className={styles.btnContainer}>
        <button className={styles.btnAdicionar} onClick={()=>{abrirModal()}} >Adicionar empleado nuevo</button>
    </div>
  );
};

export { BtnAdicionar };