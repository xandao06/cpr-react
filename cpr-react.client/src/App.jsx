import { useEffect, useState } from 'react';
import './App.css';
import  ChamadoIndex  from './Chamado/View/ChamadoIndex';
import CriarChamado from './Chamado/Modal/CriarChamado';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

    const [chamados, getChamados] = useState([]);
    async function GetAllChamadoData() {
        const response = await fetch('https://localhost:7042/api/Chamado');
        const data = await response.json();
        getChamados(data); // Atualiza o estado com os dados recebidos
    }

    async function AddChamadoData(newChamado) {
        const response = await fetch('https://localhost:7042/api/Chamado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newChamado),
        });

        if (response.ok) {
            const data = await response.json();
            getChamados(prevChamados => [...prevChamados, data]); // Atualizar a lista com o novo chamado
        } else {
            console.error('Erro ao adicionar chamado:', response.statusText);
        }
    }

    useEffect(() => {
        GetAllChamadoData();
    }, []);



        return (
            <div>
                <h1 id="tableLabel">Chamados</h1>
                <p>Lista de chamados</p>
                <CriarChamado onSubmit={AddChamadoData} />
                {chamados.length === 0 ? (
                    <p><em>Nenhum chamado encontrado.</em></p>
                ) : (
                        <ChamadoIndex chamados={chamados} />  // Usando o componente da tabela
                )}
            </div>
        );
    }




    export default App;

