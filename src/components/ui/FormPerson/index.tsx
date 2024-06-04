// este componente tem a função de capturar os dados fornecidos pelo usuário
// a função submit é passada via props recebendo os dados

import styles from './styles.module.scss'

import { Input } from '../Input';

import { ChangeEvent, FormEvent, useState } from 'react';

import { mask } from 'remask';
import { toast } from 'react-toastify';

// tipagem para os dados da tabela Person
export interface PersonData {
  name: string;
  rg: string;
  cnpjcpf: string;
  sex: string;
  nationality: string;
  maritial_status: string;
  born_in: string;
  telephone: string;
  telephone2: string;
  email: string;
  type: string;
  status: string;
}

// a funcao onSubmit é passada com propriedade
// onSubmit é um função sem retorno
interface FormComponentProps {
  onSubmit: (data: PersonData, resetForm: () => void) => void;
}

{/* FormPerson é exportado passando onSubmit como parametro para ser utilizado no componente pai
  onSubmit contem 'data', dados do formulario
  E resetForm que serve pra resetar os dados do formulario, resetForm é passado como uma função void(sem retorno)
*/}
export function FormPerson({ onSubmit }: FormComponentProps) {  

  const initialFormData: PersonData = {
    name: '',
    rg: '',
    cnpjcpf: '',
    sex: '',
    nationality: '',
    maritial_status: '',
    born_in: '',
    telephone: '',
    telephone2: '',
    email: '',
    type: '',
    status: ''
  }

  const [formData, setFormData] = useState<PersonData>(initialFormData);

  // reseta os dados do form
  function resetForm(){
    setFormData(initialFormData);
  }

  // tem como objetivo capturar o que foi digitado e passar para o formData
  // é necessário que o input tenha a propriedade NAME
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  
    //manipulador de evento que é chamado quando o form é enviado
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // funcao passada como prop para o componente FormPerson
    // formData é o estado atual do formulario, contem os dados inseridos pelo usuário
    // resetForm é uma função dentro do componente, redefine os campos para os valores iniciais
    if(formData.cnpjcpf === '' || formData.born_in === '') {
      toast.warning("Campo CPF/CNPJ é obrigatório")
      return
    }
    onSubmit(formData, resetForm);
  }

  // mascara para formatação de CNPJ e CPF
  // é chamada pelo evento do input
  function maskCnpjCpf(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    let newValue;
    if (value.length <= 14) {
      newValue = mask(value, ['999.999.999-99'])
    } else {
      newValue = mask(value, ['99.999.999/9999-99'])
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  }

  return (
    <>
      <h1>Dados Pessoais</h1>
      <form className={styles.form} onSubmit={handleSubmit}>

        <Input
          placeholder='Cliente ou Adverso'
          name="type"
          value={formData.type}
          onChange={handleChange}
        />

        <Input
          placeholder='Nome completo'
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          placeholder='RG'
          name="rg"
          value={formData.rg}
          onChange={handleChange}
        />

        <Input
          placeholder='CPF/CNPJ (Campo obrigatório)'
          name="cnpjcpf"
          value={formData.cnpjcpf}
          onChange={maskCnpjCpf}
        />

        <Input
          placeholder='Sexo'
          name="sex"
          value={formData.sex}
          onChange={handleChange}
        />

        <Input
          placeholder='Nacionalidade'
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
        />

        <Input
          placeholder='Data de Nascimento'
          name="born_in"
          value={formData.born_in}
          onChange={handleChange}
          type="date"
        />

        <Input
          placeholder='Estado Civil'
          name="maritial_status"
          value={formData.maritial_status}
          onChange={handleChange}
        />

        <Input
          placeholder='Contato Principal'
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />

        <Input
          placeholder='Secundário (Opcional)'
          name="telephone2"
          value={formData.telephone2}
          onChange={handleChange}
        />

        <Input
          placeholder='Email'
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          placeholder='Status Ex: Ativo ou Inativo'
          name="status"
          value={formData.status}
          onChange={handleChange}
        />

        <button
          className={styles.button}
          type='submit'
        >
          Avançar
        </button>

      </form>
    </>
  )
}