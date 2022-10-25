// tipagem dos inputs
import {InputHTMLAttributes, TextareaHTMLAttributes} from 'react'

import styles from './styles.module.scss';

// interface InputProps extendendo InputHTMLAttributes 
//utilizado para pegar os atributos/propriedades dos componentes e torná-los dinamicos
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps){
  return(
    <input className={styles.input} {...rest}/>
  )
}

export function TextArea({...rest}: TextAreaProps){
  return(
    <textarea className={styles.input} {...rest}></textarea>
  )
}