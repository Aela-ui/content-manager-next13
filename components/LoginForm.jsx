'use client';

import { login } from '@app/api/Api';
import { AuthContext } from '@app/contexts/authContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import AlertComponent from './AlertComponent';

export default function LoginForm() {
  const router = useRouter();
  const { setAuthState, isUserAuthenticated } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await login(email, password);
    
    if(response?.token) {
      console.log(response);
      setAuthState(response);
      router.push('/');
    }

    if(response?.message?.status === 401) {
      setOpen(true);
    } 
    
};

  return (
    <>
      {open ? 
        <AlertComponent 
          open={open} 
          setOpen={setOpen}
          message="Email ou senha inválidos. Tente novamente."
          type="error"
        /> 
        :null
      }
      <div class="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-9">
        <div class="max-w-md w-full space-y-8">
          <div>
            <h2 class="text-center text-3xl font-extrabold text-gray-900">
              Login
            </h2>
          </div>
          <div class="rounded bg-white max-w-md rounded overflow-hidden shadow-xl p-9">
            <form onSubmit={handleSubmit} class="space-y-4" action="#" method="POST">
              <input type="hidden" name="remember" value="True"/>
              <div class="rounded-md shadow-sm -space-y-px">
                <div class="grid gap-6">
                  <div class="col-span-12">
                    <label for="first_name" class="block text-sm font-medium text-gray-700">Usuário</label>
                    <input 
                      type="text" 
                      name="first_name" 
                      id="first_name" 
                      onChange={(e) => setEmail(e.target.value)}
                      autocomplete="given-name" 
                      class="mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div class="col-span-12">
                    <label for="email_address" class="block text-sm font-medium text-gray-700">Senha</label>
                    <input 
                      type="password" 
                      name="email_address" 
                      id="email_address" 
                      onChange={(e) => setPassword(e.target.value)}
                      autocomplete="email" 
                      class="mt-1 p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button type="submit" class="mt-9 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Entrar
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  </>
  );
}