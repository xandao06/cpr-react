import { useEffect, useState } from 'react';
import '../CSS/ChamadoIndex.css';
import CriarChamado from '../Modal/CriarChamado';
import HistoricoIndex from '../View/HistoricoIndex';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConcluirChamado from '../Modal/ConcluirChamado';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



{/* Métodos */ }

function ChamadoIndex() {
    const [chamados, setChamados] = useState([]);
    const [showCriarModal, setShowCriarModal] = useState(false);
    const [showConcluirModal, setShowConcluirModal] = useState(false);
    const [selectedChamado, setSelectedChamado] = useState(null);

    const handleCloseCriar = () => setShowCriarModal(false);
    const handleShowCriar = () => setShowCriarModal(true);

    const handleCloseConcluir = () => setShowConcluirModal(false);
    const handleShowConcluir = (chamado) => {
        console.log("Chamado selecionado:", chamado);
        setSelectedChamado(chamado);
        setShowConcluirModal(true);
    };

    const navigate = useNavigate(); // Hook para navegação

    const goToHistorico = () => {
        navigate('/historico');
    }


    const onAddChamado = async (newChamado) => {
        const response = await fetch('https://localhost:7042/api/Chamado', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newChamado),

        });

        const responseText = await response.text();
        const data = responseText ? JSON.parse(responseText) : null;

        if (data) {
            setChamados([...chamados, data]); // Atualiza a lista de chamados
            handleCloseCriar(); // Fecha o modal de criação
            console.log("Chamado adicionado:", data);
        }

    }

    const onConcluirChamado = async (chamado) => {
        const updatedChamado = { ...chamado, status: 'Concluído' };

        console.log("Chamado ID:", chamado.id);

        const response = await fetch('https://localhost:7042/api/Chamado', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedChamado),

        });
    }


        useEffect(() => {
            // Fetch inicial dos chamados (somente pendentes)
            const fetchChamados = async () => {
                try {
                    const response = await fetch('https://localhost:7042/api/Chamado');
                    const data = await response.json();
                    setChamados(data.filter(chamado => chamado.status === "Pendente")); // Filtra apenas chamados pendentes
                } catch (error) {
                    console.error("Erro ao buscar chamados:", error);
                }
            };

            fetchChamados();
        }, []);




        {/* //// */ }


        {/* Tabela */ }

        return (

            <div className="container">
                <h2>Chamados</h2>
                <button id="new_chamado_btn" onClick={handleShowCriar}>
                    Criar chamado
                </button>
                <Table id="chamados_table" striped bordered hover aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Cliente</th>
                            <th>Descrição</th>
                            <th>Contrato</th>
                            <th>Urgência</th>
                            <th>Status</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chamados
                            .filter(chamado => chamado.status === "Pendente")
                            .map((chamado, index) => (
                                <tr key={index}>
                                    <td>{new Date(chamado.data).toLocaleDateString()}</td>
                                    <td>{chamado.hora}</td>
                                    <td>{chamado.cliente}</td>
                                    <td>{chamado.descricao}</td>
                                    <td>{chamado.contrato}</td>
                                    <td>{chamado.urgencia}</td>
                                    <td>{chamado.status}</td>
                                    <td>
                                        <button variant="success" onClick={() => handleShowConcluir(chamado)}>
                                            Concluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>

                {/* //// */}

                {/* Referencia dos modais */}

                <CriarChamado
                    show={showCriarModal}
                    handleClose={handleCloseCriar}
                    onAddChamado={onAddChamado}
                />

                <ConcluirChamado
                    show={showConcluirModal}
                    handleClose={handleCloseConcluir}
                    chamado={selectedChamado}
                    onConcluirChamado={onConcluirChamado}
                />

                {/* //// */}


            </div>
        );
}
export default ChamadoIndex;
