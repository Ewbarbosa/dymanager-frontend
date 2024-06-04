// este componente tem a função de capturar os dados fornecidos pelo usuário
// a função submit é passada via props recebendo os dados

import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { mask } from 'remask';

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
  onSubmit: (data: AddressData, resetForm: () => void) => void;
}

// FormAddress é exportado passando onSubmit como parametro para ser usado no componente pai
// onSumit contem "data", dados do formulario
// e resetForm reseta os dados preenchidos, é passado como funcao que não haverá retorno
export function FormAddress({ onSubmit }: FormComponentProps) {

  const initialFormdata: AddressData = {
    street: '',
    complement: '',
    zip_code: '',
    district: '',
    city: '',
    state: ''
  }

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<AddressData>(initialFormdata);

  function resetForm() {
    setFormData(initialFormdata);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    let newValue;
    if (name === 'zip_code') {
      newValue = mask(value, ['99999-999']);

      setFormData(prevState => ({
        ...prevState,
        [name]: newValue
      }))

      // passa o value pra realizar a consulta na api e retornar os valores do endereço
      handleCep(value);
    }

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  //manipulador de evento que é chamado quando o form é enviado
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formData.zip_code) {
      toast.warning("Preencha os campos!")
      return
    }
    setLoading(true);
    onSubmit(formData, resetForm);
    setLoading(false);
  }

  // funcao utilizada somente pelo Input de CEP
  async function handleCep(zip_code: string) {

    if (zip_code.length !== 8) {
      return
    } else {
      try {
        const response = await apiCEP.get(`${zip_code}/json`);

        setFormData({
          street: response.data.logradouro,
          complement: '',
          zip_code: response.data.cep,
          district: response.data.bairro,
          city: response.data.localidade,
          state: response.data.uf
        })

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
        <Input
          placeholder='Rua/Avenida, 123'
          name='street'
          value={formData.street}
          onChange={handleChange}
        />

        <Input
          placeholder='CEP'
          name='zip_code'
          value={formData.zip_code}
          onChange={handleChange}
        />

        <Input
          placeholder='Bairro'
          name='district'
          value={formData.district}
          onChange={handleChange}
        />

        <Input
          placeholder='Cidade'
          name='city'
          value={formData.city}
          onChange={handleChange}
        />

        <Input
          placeholder='Estado'
          name='state'
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