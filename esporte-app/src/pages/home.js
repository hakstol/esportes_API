import React, { useEffect, useState } from 'react';
import { config } from '../config.env';
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [modalidades, setModalidades] = useState([]);
    const [modalidadeSelecionada, setModalidadeSelecionada] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        async function listarModalidades() {
            const token = localStorage.getItem('token');
            const response = await fetch(config.MY_API, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            const res = await response.json();
            const lista = await res.esportes;
            setModalidades(lista);
        }

        async function verificaUsuario() {
            if (localStorage.getItem('token') === false) {
                navigate('/')
            }
        }

        verificaUsuario();
        listarModalidades();
    },);

    function logout() {
        localStorage.removeItem('token');
        navigate('/')
    }

    const handleSelectChange = (e) => {
        const selectedModalidadeId = e.target.value;
        setModalidadeSelecionada(selectedModalidadeId)
    };


    return (
        <div className='w-1/2 mx-auto '>
            <div className='d-grid gap-20 pt-20 mx-auto'>
                <button type='button' className='mx-auto w-1/5 btn bg-success text-white' onClick={logout}>Sair</button>
            </div>
            <div className='d-grid gap-20 py-20'>
                <form className='flex justify-center'>
                    <select className="w-1/2 form-select mx-3" onChange={handleSelectChange}>
                        <option value="">Selecione uma modalidade</option>
                        {
                            modalidades.map((modalidade) => (
                                <option key={modalidade.id} value={modalidade.id}>
                                    {modalidade.nome}
                                </option>
                            ))
                        }
                    </select>
                </form>
                <div className='w-1/2 flex-col items-center container justify-center mx-auto flex'>
                    <table className='table table-bordered'>
                        {
                            modalidadeSelecionada === '' ? (
                                <thead className='text-left'>
                                    <tr className='text-left'>
                                        <th className='bg-success text-white' scope='col'>Modalidades</th>
                                        <th className='bg-success text-white' scope='col'>Tipos</th>
                                        <th className='bg-success text-white' scope='col'>Medalhas</th>
                                    </tr>
                                </thead>
                            ) :
                                (
                                    <thead>
                                        <tr className='text-left'>
                                            <th className='bg-success text-white' scope='col'>Tipos</th>
                                            <th className='bg-success text-white' scope='col'>Medalhas</th>
                                        </tr>
                                    </thead>
                                )
                        }
                        <tbody className='text-left'>
                            {
                                modalidades.map((modalidade) => (
                                    <tr key={modalidade.id}>
                                        {
                                            modalidadeSelecionada === '' && (
                                                <>
                                                    <td>{modalidade.nome}</td>
                                                    <td>{modalidade.medalhas}</td>
                                                    <td>{modalidade.tipo}</td>
                                                </>
                                            )
                                        }
                                        {
                                            modalidadeSelecionada === 'futebol' && modalidade.nome === 'futebol' && (
                                                <>
                                                    <td>{modalidade.medalhas}</td>
                                                    <td>{modalidade.tipo}</td>
                                                </>
                                            )
                                        }
                                        {
                                            modalidadeSelecionada === 'tenis' && modalidade.nome === 'tenis' && (
                                                <>
                                                    <td>{modalidade.medalhas}</td>
                                                    <td>{modalidade.tipo}</td>
                                                </>
                                            )
                                        }
                                        {
                                            modalidadeSelecionada === 'volei' && modalidade.nome === 'volei' && (
                                                <>
                                                    <td>{modalidade.medalhas}</td>
                                                    <td>{modalidade.tipo}</td>
                                                </>
                                            )
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
