import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { redirect } from "next/dist/server/api-utils";
import { parseCookies, destroyCookie } from "nookies";
import { AuthTokenError } from "../services/errors/AuthTokenError";

// funcao apenas para usuarios logados

export function canSSRAuth<P>(fn: GetServerSideProps<P>) {

  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);

    const token = cookies['@dymanager.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
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
          }
        }

      }
    }
  }
}