import { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintConsignado from '../Modal/PrintConsignado';
import '../CSS/Consignado.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import CriarConsignado from '../Modal/CriarConsignado';
import ConcluirConsignado from '../Modal/ConcluirConsignado';
import EditarConsignado from '../Modal/EditarConsignado';
import DeletarConsignado from '../Modal/DeletarConsignado';
import {
    fetchConsignados,
    addConsignado,
    concluirConsignado,
    editarConsignado,
    deletarConsignado
} from '../../Components/ConsignadoComponent';




{/* REFERENCIAS */ }

function ConsignadoIndex() {


    const [selectedEquipamento, setSelectedEquipamento] = useState(null); // GERAL
    const [equipamentos, setEquipamentos] = useState([]);  // GERAL

    const [showPrintModal, setShowPrintModal] = useState(false); //PRINT LAYOUT
    const printRef = useRef(); //PRINT LAYOUT
    const handleShowPrintModal = (equipamento) => { //PRINT LAYOUT
        setSelectedEquipamento(equipamento); //PRINT LAYOUT
        setShowPrintModal(true); //PRINT LAYOUT
    }
    const handleClosePrintModal = () => setShowPrintModal(false); //PRINT LAYOUT
     
    const [showCriarModal, setShowCriarModal] = useState(false);  // CRIAR
    const handleCloseCriar = () => setShowCriarModal(false); // CRIAR
    const handleShowCriar = () => setShowCriarModal(true); // CRIAR

    const [showConcluirModal, setShowConcluirModal] = useState(false); // CONCLUIR
    const handleCloseConcluir = () => setShowConcluirModal(false); // CONCLUIR
    const handleShowConcluir = (equipamento) => { // CONCLUIR
        setSelectedEquipamento(equipamento); // CONCLUIR
        setShowConcluirModal(true);  // CONCLUIR
    };

    const [showEditarModal, setShowEditarModal] = useState(false); // EDITAR
    const handleCloseEditar = () => setShowEditarModal(false); // EDITAR
    const handleShowEditar = (equipamento) => { // EDITAR
        setSelectedEquipamento(equipamento); // EDITAR
        setShowEditarModal(true); // EDITAR
    };

    const [showDeletarModal, setShowDeletarModal] = useState(false); // DELETAR
    const handleCloseDeletar = () => setShowDeletarModal(false); // DELETAR
    const handleShowDeletar = (equipamento) => { // DELETAR
        setSelectedEquipamento(equipamento); // DELETAR
        setShowDeletarModal(true); // DELETAR
    };

    {/* ///// */ }


    {/* //BUSCA DE CHAMADOS// */ }

    useEffect(() => {
        const loadConsignados = async () => {
            const data = await fetchConsignados();
            setEquipamentos(data);
        };
        loadConsignados();
    }, []);

    {/* ADICIONA CHAMADO */ }

    const onAddConsignado = async (newEquipamento) => {
        const data = await addConsignado(newEquipamento);
        if (data) setEquipamentos([...equipamentos, data]);
        setShowCriarModal(false);
    };

    {/* CONCLUI CHAMADO */ }

    const onConcluirConsignado = async (equipamento) => {
        const success = await concluirConsignado(equipamento);
        if (success) setEquipamentos(equipamentos.filter(c => c.id !== equipamento.id));
        setShowConcluirModal(false);
    };

    {/* EDITA CHAMADO */ }

    const onEditarConsignado = async (updatedEquipamento) => {
        const success = await editarConsignado(updatedEquipamento);
        if (success) {
            setEquipamentos(equipamentos.map(c => c.id === updatedEquipamento.id ? updatedEquipamento : c));
            setShowEditarModal(false);
        }
    };

    {/* DELETA CHAMADO */ }

    const onDeletarConsignado = async (equipamento) => {
        const success = await deletarConsignado(equipamento);
        if (success) setEquipamentos(equipamentos.filter(c => c.id !== equipamento.id));
        setShowDeletarModal(false);
    };

    {/* ///// */ }


    {/* TABELA */ }

    return (

        <div className="container">
            <h2>Consignados</h2>
            <button id="new_consignado_btn" onClick={handleShowCriar}>
                <img id="adicionar_consignado_img" src="./src/img/adicionar_consignado.PNG"></img>
            </button>
            <Table className="consignados_table" striped bordered hover aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Contrato</th>
                        <th>Número de Série</th>
                        <th>Tipo</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {equipamentos
                        .sort((a, b) => {
                            const statusConsignado = ["Emprestado", "Concluído"];
                            return statusConsignado.indexOf(a.status) - statusConsignado.indexOf(b.status);
                        })
                        .map((equipamento, index) => (

                            <tr key={index}>
                                <td>{new Date(equipamento.data).toLocaleDateString()}</td>
                                <td>{equipamento.hora}</td>
                                <td className="text-danger">{equipamento.cliente}</td>
                                <td className={
                                    equipamento.contrato === "Sim" ? "text-primary" : equipamento.contrato}
                                >{equipamento.contrato}
                                </td>
                                <td className="text-danger">{equipamento.numeroSerie} </td>
                                <td>{equipamento.tipo}</td>
                                <td>{equipamento.marca}</td>
                                <td>{equipamento.modelo}</td>
                                <td>{equipamento.quantidade}</td>
                                <td>{equipamento.preco}</td>
                                <td className="text-danger">{equipamento.descricao}</td>
                                <td className=
                                    {equipamento.status === "Emprestado" ? "text-warning" :
                                    equipamento.status === "Concluído" ? "text-success" : equipamento.status}
                                    >{equipamento.status}</td>
                                <td>
                                    <a variant="success" onClick={() => handleShowConcluir(equipamento)}>
                                        <i id="icon_opcoes" className="fa-regular fa-square-check"></i>
                                    </a>
                                    <a variant="success" onClick={() => handleShowEditar(equipamento)}>
                                        <i id="icon_opcoes" className="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <a variant="success" onClick={() => handleShowDeletar(equipamento)}>
                                        <i id="icon_opcoes" className="fa-solid fa-trash"></i>
                                    </a>
                                    <a variant="success" onClick={() => handleShowPrintModal(equipamento)}>
                                        Imprimir
                                    </a>
                                </td>
                            </tr>

                        ))}

                </tbody>
            </Table>

            {/* //// */}

            

            {/* REFERENCIA DOS MODAIS */}

            <CriarConsignado
                show={showCriarModal}
                handleClose={handleCloseCriar}
                onAddConsignado={onAddConsignado}
            />

            <ConcluirConsignado
                show={showConcluirModal}
                handleClose={handleCloseConcluir}
                equipamento={selectedEquipamento}
                onConcluirConsignado={onConcluirConsignado}
            />

            <EditarConsignado
                show={showEditarModal}
                handleClose={handleCloseEditar}
                equipamento={selectedEquipamento}
                onEditarConsignado={onEditarConsignado}
            />

            <DeletarConsignado
                show={showDeletarModal}
                handleClose={handleCloseDeletar}
                equipamento={selectedEquipamento}
                onDeletarConsignado={onDeletarConsignado}
            />

            <PrintConsignado
                ref={printRef}
                showPrintModal={showPrintModal}
                handleClosePrintModal={handleClosePrintModal}
                equipamento={selectedEquipamento}
            />

            {/* //// */}


        </div>
    );

}
export default ConsignadoIndex;
