'use client';

import Feed from "@components/Feed";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/authContext";
import withAuth from "@components/PrivateRoute";

const Home = () => {
  const { isUserAuthenticated } = useContext(AuthContext);
  const [ logged, setLogged ] = useState(false);

  useEffect(() => {
    setLogged(isUserAuthenticated());
  }, []);

  return (
    <div>
      {logged ? User(): Guest()}
    </div>   
  );
}

//guest
function Guest(){
  return(
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text_center">
          Selecione & Adicione
          <br className="max-md:hidden"/>
          <span className="indigo_gradient 
          text-center">Conteúdos ao seu Robô</span>
      </h1>
      <p className="desc text-center">
          A Qiron criou essa ferramenta para facilitar a sua interação
          com o seu robô, ao selecionar de forma prática o que deseja 
          que seu amigo aprenda para te auxiliar da melhor maneira possível
      </p>

      <div className="indigo_btn mt-16">
        <Link href={"/login"}>
          Acessar Conta
        </Link>
      </div>
    </section>
  )
}

//authorize user

function User(){
  return(
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text_center">
          Selecione & Adicione
          <br className="max-md:hidden"/>
          <span className="indigo_gradient 
          text-center">Conteúdos ao seu Robô</span>
      </h1>
      <p className="desc text-center">
          A Qiron criou essa ferramenta para facilitar a sua interação
          com o seu robô, ao selecionar de forma prática o que deseja 
          que seu amigo aprenda para te auxiliar da melhor maneira possível
      </p>

      <Feed />
    </section>
  )
}

export default withAuth(Home)