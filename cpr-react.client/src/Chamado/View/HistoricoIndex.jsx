import { useEffect, useState } from 'react';
import '../CSS/HistoricoIndex.css';
import CriarChamado from '../Modal/ConcluirChamado';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function HistoricoIndex({ chamados }) {
    return (
        <div className="container">
            <h2>Histórico de Chamados</h2>
            <Table striped bordered hover>
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
                    {chamados
                        .filter((chamado) => chamado.status === 'Concluído') // Somente chamados concluídos
                        .map((chamado, index) => (
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

export default Historico;