import { useEffect, useState } from 'react';
import '../CSS/HistoricoIndex.css';
import CriarChamado from '../Modal/ConcluirChamado';
import DeletarChamado from '../Modal/DeletarChamado';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChamadoIndex from '../View/ChamadoIndex';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function HistoricoIndex() {

    const [historicoChamados, setHistoricoChamados] = useState([]);


    const [selectedChamado, setSelectedChamado] = useState(null); // GERAL
    const [chamados, setChamados] = useState([]);  // GERAL

    const [showDeletarModal, setShowDeletarModal] = useState(false); // DELETAR
    const handleCloseDeletar = () => setShowDeletarModal(false); // DELETAR
    const handleShowDeletar = (chamado) => { // DELETAR
        setSelectedChamado(chamado); // DELETAR
        setShowDeletarModal(true); // DELETAR
    };


    {/* ///METODO DELETAR CHAMADO// */ }

    const onDeletarChamado = async (deletarChamado) => {

        console.log("Chamado ID:", deletarChamado.id);

        const response = await fetch(`https://192.168.10.230:7042/api/Chamado/${deletarChamado.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(deletarChamado),

        });

        if (response.ok) {
            // Atualiza a lista removendo o chamado concluído
            setHistoricoChamados(historicoChamados.filter(c => c.id !== deletarChamado.id));
            handleCloseDeletar(); // Fecha o modal de conclusão
        }
    }

    {/* ///// */ }


    useEffect(() => {
        // Fetch inicial dos chamados (somente pendentes)
        const fetchHistoricoChamados = async () => {
            const response = await fetch('https://192.168.10.230:7042/api/Chamado');
                const data = await response.json();
                setHistoricoChamados(data.filter(chamado => chamado.status === "Concluído")); // Filtra apenas chamados pendentes
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
                            <td>
                                <a variant="success" onClick={() => handleShowDeletar(chamado)}>
                                    <i id="icon" className="fa-solid fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <DeletarChamado
                show={showDeletarModal}
                handleClose={handleCloseDeletar}
                chamado={selectedChamado}
                onDeletarChamado={onDeletarChamado}
            />


        </div>
    );
}

export default HistoricoIndex;