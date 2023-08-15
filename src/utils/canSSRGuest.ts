// somente para usuarios não logados
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

// funcao para paginas que só podem ser acessadas por usuario não logados

export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(ctx);

    // se tentar acessar já logado será redirecionado para a dashboard
    if (cookies['@dymanager.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    } 
    return await fn(ctx);
  }
}
