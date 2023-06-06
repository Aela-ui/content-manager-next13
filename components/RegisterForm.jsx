"use client";

import React, { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [permissao, setPermissao] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-9">
      <div className="row d-flex justify-content-center">
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="text-center text-3xl font-extrabold text-gray-900">
              Registrar
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
              <input
                type="text"
                id="name_field"
                className="form-control mx-3 mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}

              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="email_field">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control mx-3 mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="password_field">
                Senha
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control mx-3 mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" for="password_field">
                Permissão
              </label>
              <select
                type="select"
                id="permissao_field"
                className="form-control mx-3 mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={(e) => setPermissao(e.target.value)}
              >
                <option value="{permissao}">admin</option>
              </select>
            </div>
          </form>
          <div>
            <button type="submit" class="mt-9 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Registrar
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;