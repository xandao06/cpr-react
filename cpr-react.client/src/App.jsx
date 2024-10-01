import { useEffect, useState } from 'react';
import './App.css';
import ChamadoIndex from './Chamado/ChamadoIndex';

function App() {
    const [chamados, getChamados] = useState();
    async function GetAllChamadoData() {
        const response = await fetch('https://localhost:7042/api/Chamado');
        const data = await response.json();
        getChamados(data); // Atualiza o estado com os dados recebidos
    }

    

        useEffect(() => {
            GetAllChamadoData();
        }, []);


        return (
            <div>
                <h1 id="tableLabel">Chamados</h1>
                <p>Lista de chamados</p>
                {chamados === undefined ? (
                    <p><em>Nenhum chamado encontrado.</em></p>
                ) : (
                        <ChamadoIndex chamados={chamados} />  // Usando o componente da tabela
                )}
            </div>
        );
    }

    export default App;

