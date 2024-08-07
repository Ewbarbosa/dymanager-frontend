import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

// Função para páginas que só podem ser acessadas por usuários logados
export function canSSRAuth<P extends { [key: string]: any }>(fn: GetServerSideProps<P>): GetServerSideProps<P> {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);
    const token = cookies['@dymanager.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, '@dymanager.token');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }

      // Adicione um retorno padrão em caso de outros erros
      return {
        notFound: true,
      };
    }
  };
}
