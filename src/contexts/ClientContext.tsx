import { createContext, useState } from "react";

import { api } from "../services/apiClient";

import { toast } from 'react-toastify'

interface ClientProps {
  cnpjcpf?: string;
  name?: string
}

interface Client {
  id: number;
  name: string;
  cnpjcpf: string;
}

interface ClientContextData {
  searchClient: (client: string) => Promise<Client>
}

export const ClientContext = createContext({} as ClientContextData)

export function ClientProvider({ children }) {

  async function searchClient(cnpjcpf: string) {
    try {
      const response = await api.get('/person', {
        params: {
          cnpjcpf
        }
      })

      return response.data;
    } catch {
      toast.error('Erro ao buscar cliente.')
    }
  }

  const [client, setClient] = useState<ClientProps>();

  return (
    <ClientContext.Provider value={{ searchClient }}>
      {children}
    </ClientContext.Provider>
  )

}