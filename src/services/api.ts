// lib pra fazer requições na API
import axios, { AxiosError } from 'axios'

// lib pra trabalhar com cookies
import { parseCookies } from 'nookies'

import { AuthTokenError } from './errors/AuthTokenError';

import { signOut } from '../contexts/AuthContext';
import { GetServerSidePropsContext } from 'next';

type Context = GetServerSidePropsContext | undefined;

export function setupAPIClient(ctx: Context = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({    
    //baseURL: 'https://dymanager-backend.onrender.com',  // server novo
    baseURL: 'https://dymanager-backend.onrender.com',
    headers: {
      Authorization: `Bearer ${cookies['@dymanager.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response?.status === 401) {
      // qualquer erro 401 devemos deslogar o usuario
      signOut();
      if (typeof window !== undefined) {
        // chamar a função para deslogar o usuário
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }

    return Promise.reject(error);
  })

  return api;
}