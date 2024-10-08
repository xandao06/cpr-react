import { useEffect, useState } from 'react';
import '../CSS/ChamadoIndex.css';
import CriarChamado from '../Modal/CriarChamado';
import HistoricoIndex from '../View/HistoricoIndex';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConcluirChamado from '../Modal/ConcluirChamado';
import EditarChamado from '../Modal/EditarChamado';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';



{/* REFERENCIAS */ }

function ChamadoIndex() {


    const [selectedChamado, setSelectedChamado] = useState(null); // GERAL

    const [chamados, setChamados] = useState([]);  // CRIAR
    const [showCriarModal, setShowCriarModal] = useState(false);  // CRIAR
    const handleCloseCriar = () => setShowCriarModal(false); // CRIAR
    const handleShowCriar = () => setShowCriarModal(true); // CRIAR

    const [showConcluirModal, setShowConcluirModal] = useState(false); // CONCLUIR
    const handleCloseConcluir = () => setShowConcluirModal(false); // CONCLUIR
    const handleShowConcluir = (chamado) => { // CONCLUIR
        setSelectedChamado(chamado); // CONCLUIR
        setShowConcluirModal(true);  // CONCLUIR
    };

    const [showEditarModal, setShowEditarModal] = useState(false); // EDITAR
    const handleCloseEditar = () => setShowEditarModal(false); // EDITAR
    const handleShowEditar = (chamado) => { // EDITAR
        setSelectedChamado(chamado); // EDITAR
        setShowEditarModal(true); // EDITAR
    };

    {/* ///// */ }



    {/* ///ABERTURA DA VIEW HISTORICO// */ }

    const navigate = useNavigate(); // Hook para navegação

    const goToHistorico = () => {
        navigate('/historico');
    }

    {/* ///// */ }



    {/* //MEOTODO ADICIONAR CHAMADO/// */ }

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

    {/* ///// */ }



    {/* ///METODO CONCLUIR CHAMADO// */ }

    const onConcluirChamado = async (chamado) => {
        const updatedChamado = { ...chamado, status: 'Concluído' };

        console.log("Chamado ID:", chamado.id);

        const response = await fetch(`https://localhost:7042/api/Chamado/${chamado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedChamado),

        });

        if (response.ok) {
            // Atualiza a lista removendo o chamado concluído
            setChamados(chamados.filter(c => c.id !== chamado.id));
            handleCloseConcluir(); // Fecha o modal de conclusão
        }
    }

    {/* ///METODO EDITAR CHAMADO// */ }

    const onEditarChamado = async (updatedChamado) => {

        console.log("Chamado ID:", updatedChamado.id);

        const response = await fetch(`https://localhost:7042/api/Chamado/${updatedChamado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedChamado),

        });

        if (response.ok) {
            // Atualiza a lista removendo o chamado concluído
            setChamados(chamados.map(c => (c.id === updatedChamado.id ? updatedChamado : c)));
            handleCloseEditar(); // Fecha o modal de conclusão
        }
    }

    {/* ///// */ }


    {/* //BUSCA DE CHAMADOS// */ }

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




    {/* TABELA */ }

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
                                    <a variant="success" onClick={() => handleShowConcluir(chamado)}>
                                        <i id="icon" className="fa-regular fa-square-check"></i>
                                    </a>
                                    <a variant="success" onClick={() => handleShowEditar(chamado)}>
                                        <i id="icon" className="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <a variant="success" onClick={() => handleShowConcluir(chamado)}>
                                        <i id="icon" className="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            {/* //// */}


            {/* REFERENCIA DOS MODAIS */}

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

            <EditarChamado
                show={showEditarModal}
                handleClose={handleCloseEditar}
                chamado={selectedChamado}
                onEditarChamado={onEditarChamado}
            />

            {/* //// */}


        </div>
    );
}
export default ChamadoIndex;
