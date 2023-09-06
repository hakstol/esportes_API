import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';
import { getToken } from '../functions/generateToken.js';
import { config } from '../config.env.js';
import 'notyf/notyf.min.css';

export default function Login() {

    const navigate = useNavigate();
    const notyf = new Notyf();

    const [values, setValues] = useState({
        nome: '',
        senha: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Login</h1>
                    </div>
                    <form className="lg:w-1/2 md:w-2/3 mx-auto" onSubmit={async (event) => {
                        event.preventDefault();

                        try {
                            
                            const token = await getToken(
                                values.nome, values.senha
                            );

                            if (token && values.nome === config.USERNAME && values.senha === config.PASSWORD) {
                                localStorage.setItem('token', token)
                                navigate("/home");
                            } else {
                                notyf.error({
                                    message: 'Usuário ou senha inválidos.',
                                    duration: 2000,
                                    position: {
                                        x: 'center',
                                        y: 'bottom',
                                    }
                                });
                            }
                        } catch (error) {
                            console.error('Erro ao obter o token:', error);
                        }
                    }}>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full flex flex-col text-center">
                                <div className='relative'>
                                    <input onChange={handleChange} placeholder="Nome" type='text' value={values.nome} name='nome' className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full flex flex-col text-center">
                                <div className="relative">
                                    <input onChange={handleChange} placeholder="Senha" type='password' value={values.senha} name='senha' className="w-1/2 bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Entrar</button>
                            </div>
                            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
