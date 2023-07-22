'use client';
import PaperManageComponent from "@components/PaperManageComponent"
import withAuth from "@components/PrivateRoute";

const ManageForms = () => {
    return (
      <div>
        <p className="desc text-center">
          Bem vindo ao Gerenciamento da Página, O que 
          deseja realizar hoje?
        </p>
        <PaperManageComponent />
      </div>
    )
  }
  
  export default withAuth(ManageForms)