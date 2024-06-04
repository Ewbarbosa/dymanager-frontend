// este componente tem a função de capturar os dados fornecidos pelo usuário
// a função submit é passada via props recebendo os dados

import styles from './styles.module.scss'
import { toast } from 'react-toastify'

import { Input } from '../Input'
import { Button } from '../Button'

import apiCEP from '../../../services/apiCEP'

import { ChangeEvent, FormEvent, useState } from 'react';

export interface AddressData {
  street: string;
  complement: string;
  zip_code: string;
  district: string;
  city: string;
  state: string;
}

// a funcao onSubmit é passada com propriedade
// onSubmit é um função sem retorno
interface FormComponentProps {
  onSubmit: (data: AddressData) => void;
}

export function FormAddress({ onSubmit }: FormComponentProps) {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AddressData>({
    street: '',
    complement: '',
    zip_code: '',
    district: '',
    city: '',
    state: ''
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    onSubmit(formData);
    setLoading(false);
  }

  // funcao utilizada somente pelo Input de CEP
  async function handleCep(zip_code: string) {

    if (zip_code.length !== 8) {
      return
    } else {
      try {
        const response = await apiCEP.get(`${zip_code}/json`);
        //console.log(response.data);

        formData.zip_code = response.data.cep;
        formData.street = response.data.logradouro;
        formData.district = response.data.bairro;
        formData.city = response.data.localidade;
        formData.state = response.data.uf;

      } catch {
        toast.warning('Erro ao buscar o CEP!');
      }
    }
  }

  return (
    <>
      <h1>Endereço</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input placeholder='Rua/Avenida, 123'
          value={formData.street}
          onChange={handleChange}
        />

        <Input placeholder='CEP'
          value={formData.zip_code}
          onChange={() => handleCep(formData.zip_code)}
        />

        <Input placeholder='Bairro'
          value={formData.district}
          onChange={handleChange}
        />

        <Input placeholder='Cidade'
          value={formData.city}
          onChange={handleChange}
        />

        <Input placeholder='Estado'
          value={formData.state}
          onChange={handleChange}
        />

        <Button
          className={styles.button}
          loading={loading}
          type='submit'
        >
          Salvar
        </Button>
      </form>      
    </>
  )
}