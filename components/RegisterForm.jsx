"use client";

import React, { useContext, useEffect, useState } from "react";
import MultipleSelect from "./MultipleSelect";
import { TextField } from "@mui/material";
import { AuthContext } from "@app/contexts/authContext";
import { findAllCategories } from "@app/api/ApiCategory";
import { useRouter } from "next/navigation";
import { createUser } from "@app/api/ApiUser";

const RegisterForm = () => {
  const router = useRouter();
  const { authState, isUserAuthenticated } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [permissao, setPermissao] = useState("");
  const [ categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if(!isUserAuthenticated()) router.push('/')
  }, [])

  useEffect(() => {
    const callApiFindAllCategories = async () => {
      const body = await findAllCategories(authState);

      setCategories(body);
    }

    try {
      callApiFindAllCategories();
    } catch (error) {
      console.log(error);
    }
  }, [authState]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await createUser(authState, name, email, password, selectedCategories);

    if(response?.status === 201) {
      console.log("usuário criado");
    } else {
      console.log(response.message);
    }
  };

  return (
    <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-9">
      <div className="row d-flex justify-content-center">
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="text-center text-3xl font-extrabold text-gray-900">
              Criar usuário
            </h2>
          </div>

          <div class="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-9">
          <form
            class="space-y-4"
            onSubmit={submitHandler}
          >
            <div className="form-outline mb-4">
              <label className="form-label" for="name_field">
                Nome
              </label>
              <TextField id="outlined-basic" onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="email_field">
                Email
              </label>
              <TextField id="outlined-basic" onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="password_field">
                Senha
              </label>
              <TextField id="outlined-basic" onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="password_field">
                Categorias
              </label>
              <MultipleSelect data={categories} setData={setSelectedCategories} />
            </div>
          <div>
            <button type="submit" class="mt-9 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Registrar
            </button>
          </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;