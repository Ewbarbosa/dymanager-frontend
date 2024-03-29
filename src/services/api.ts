// lib pra fazer requições na API
import axios, { AxiosError } from 'axios'

// lib pra trabalhar com cookies
import { parseCookies } from 'nookies'

import { AuthTokenError } from './errors/AuthTokenError';

import { signOut } from '../contexts/AuthContext';

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx);

  const api = axios.create({
    //baseURL: 'http://dytech.sytes.net:3333',
    baseURL: 'https://dy-backend.onrender.com',  // server novo
    //baseURL: 'http://127.0.0.1:3333',
    headers: {
      Authorization: `Bearer ${cookies['@dymanager.token']}`
    }
  })

  api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => {
    if (error.response.status === 401) {
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
