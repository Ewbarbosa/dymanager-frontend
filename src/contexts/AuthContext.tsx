// Contexto
/* a função deste arquivo é validar se o usuario está
logado antes de acessar qualquer pagina.
*/

// import do criador de contexto e a tipagem do react
import {createContext, ReactNode, useState} from 'react'

/* tipagem para o AuthContextData
    recege as propriedades do usuário
  signIn = método de login, funcao anonima 
  recebe as credenciais que é do tipo SignInProps criado logo abaixo
*/
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
}

/* tipagem que recebe as informações do usuario atraves da API */
type UserProps = {
  id: number;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

/* aqui é iniciado o createContext passando o 
tipo AuthContextData que foi criado no inicio do código */
export const AuthContext = createContext({} as AuthContextData);

/* aqui é quem vai prover informações*/
export function AuthProvider({children}: AuthProviderProps){

  // aqui é criado o UserProps, onde recebemos os dados do usuário
  const [user, setUser] = useState<UserProps>();

  /* criando o isAuthenticated
   !! = converte a variável para boolean
   se existir algo dentro de "user" é true, se naõ falso
   */
  const isAuthenticated = !!user;

  async function signIn(){
    alert('Clicou no login')
  }

  return(
    <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}