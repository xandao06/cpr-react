import { useEffect, useState } from 'react';
import '../CSS/HistoricoIndex.css';
import CriarChamado from '../Modal/ConcluirChamado';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChamadoIndex from './ChamadoIndex';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function HistoricoIndex({ chamados }) {

    const [historicoChamados, setHistoricoChamados] = useState([]);

    useEffect(() => {
        const fetchHistoricoChamados = async () => {
            
                const response = await fetch('https://localhost:7042/api/Chamado');
                const data = await response.json();
                setHistoricoChamados(data.filter(chamado => chamado.status === 'Concluído'));
        };

        fetchHistoricoChamados();
    }, []);

    return (


        <div className="container">

            <h2>Histórico de Chamados</h2>
            <Table id="historico_table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Descrição</th>
                        <th>Contrato</th>
                        <th>Urgência</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {historicoChamados.map((chamado, index) => (
                            <tr key={index}>
                                <td>{new Date(chamado.data).toLocaleDateString()}</td>
                                <td>{chamado.hora}</td>
                                <td>{chamado.cliente}</td>
                                <td>{chamado.descricao}</td>
                                <td>{chamado.contrato}</td>
                                <td>{chamado.urgencia}</td>
                                <td>{chamado.status}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
}

export default HistoricoIndex;