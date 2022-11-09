// Contexto
/* a função deste arquivo é validar se o usuario está
logado antes de acessar qualquer pagina.
*/

// import do criador de contexto e a tipagem do react
import { createContext, ReactNode, useState, useEffect } from 'react'

// import da api, foi criado e feita as config
import { api } from '../services/apiClient';

// destroyCookie para destruir o cookie da aplicação
// setCookie para salvar um cookie
import { destroyCookie, setCookie, parseCookies } from 'nookies'

import Router from 'next/router'

// import de alerta personalizado
import { toast } from 'react-toastify'

/* tipagem para o AuthContextData
    recege as propriedades do usuário
  signIn = método de login, funcao anonima 
  recebe as credenciais que é do tipo SignInProps criado logo abaixo
*/
type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
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

// funcao para deslogar o usuário
export function signOut() {
  try {
    destroyCookie(undefined, '@dymanager.token')
    Router.push('/')
  } catch {
    console.log('Erro ao deslogar.')
  }
}


/* aqui é quem vai prover informações*/
export function AuthProvider({ children }: AuthProviderProps) {

  // aqui é criado o UserProps, onde recebemos os dados do usuário
  const [user, setUser] = useState<UserProps>();

  /* criando o isAuthenticated
   !! = converte a variável para boolean
   se existir algo dentro de "user" é true, se naõ falso
   */
  const isAuthenticated = !!user;

  useEffect(()=>{
    // tentar pegar algo no cookie

    const {'@dymanager.token': token} = parseCookies();

    if(token){
      api.get('/me').then(response => {
        const {id, name, email} = response.data;

        setUser({
          id,
          name,
          email
        })

      })
      .catch(() =>  {
        // se deu errado vamos deslogar o usuario
        signOut();
      })
    }
  }, [])

  // signIn recebe os dados de email e senha
  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, token } = response.data;

      setCookie(undefined, '@dymanager.token', token, {
        maxAge: 60 * 60 * 24, //expirar em um dia
        path: '/' // quais caminhos terão acesso ao cookie
      });

      setUser({
        id,
        name,
        email
      })

      // passar para as proximas requisições o token
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      toast.success('Bem vindo!');
      
      // redirecionar o usuario para a pagina inicial
      Router.push('/dashboard');

      //console.log(response.data);
    } catch (err) {
      toast.error('Usuário/Senha inválido.')
      console.log('Erro ao acessar', err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}