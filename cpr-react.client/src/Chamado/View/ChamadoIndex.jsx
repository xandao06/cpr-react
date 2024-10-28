import { useEffect, useState } from 'react';
import '../CSS/Chamado.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import CriarChamado from '../Modal/CriarChamado';
import ConcluirChamado from '../Modal/ConcluirChamado';
import EditarChamado from '../Modal/EditarChamado';
import DeletarChamado from '../Modal/DeletarChamado';
import {
    fetchChamados,
    addChamado,
    concluirChamado,
    editarChamado,
    deletarChamado
} from '../../Components/ChamadoComponent';

function ChamadoIndex() {

{/* REFERENCIAS */ }

    const [selectedChamado, setSelectedChamado] = useState(null); // GERAL
    const [chamados, setChamados] = useState([]);  // GERAL
    const [conn, setConn] = useState([]);

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

    const [showDeletarModal, setShowDeletarModal] = useState(false); // DELETAR
    const handleCloseDeletar = () => setShowDeletarModal(false); // DELETAR
    const handleShowDeletar = (chamado) => { // DELETAR
        setSelectedChamado(chamado); // DELETAR
        setShowDeletarModal(true); // DELETAR
    };

    //const iniciarConexao = async () => {
    //    const conexao = new HubConnectionBuilder()
    //        .withUrl('https://192.168.10.230:7042/chamado')
    //        .configureLogging(LogLevel.Information)
    //        .build();

    //    conexao.on("ReceiveMessage", (chamado) => {
    //        setChamados(chamados => [...chamados, chamado]);
    //    });
    //    await conexao.start();
    //    setConn(conexao);
    //}




    {/* ///// */ }



    {/* BUSCA OS CHAMADOS */ }

    useEffect(() => {
        const loadChamados = async () => {
            const data = await fetchChamados();
            setChamados(data);
        };
        loadChamados();
    }, []);

    {/* ADICIONA CHAMADO */ }

    const onAddChamado = async (newChamado) => {
        const data = await addChamado(newChamado);
        if (data) setChamados([...chamados, data]);
        setShowCriarModal(false);
    };

    {/* CONCLUI CHAMADO */ }

    const onConcluirChamado = async (chamado) => {
        const success = await concluirChamado(chamado);
        if (success) setChamados(chamados.filter(c => c.id !== chamado.id));
        setShowConcluirModal(false);
    };

    {/* EDITA CHAMADO */ }

    const onEditarChamado = async (updatedChamado) => {
        const success = await editarChamado(updatedChamado);
        if (success) {
            setChamados(chamados.map(c => c.id === updatedChamado.id ? updatedChamado : c));
            setShowEditarModal(false);
        }
    };

    {/* DELETA CHAMADO */ }

    const onDeletarChamado = async (chamado) => {
        const success = await deletarChamado(chamado);
        if (success) setChamados(chamados.filter(c => c.id !== chamado.id));
        setShowDeletarModal(false);
    };


    

    {/* TABELA */ }

    return (

        <div className="container">
            <button hidden={!!conn} onClick={() => { iniciarConexao(); }}>Teste</button>
            <h2>Chamados</h2>
            <button id="new_chamado_btn" onClick={handleShowCriar}>
                <img id="adicionar_chamado_img" src="./src/img/adicionar_chamado.PNG"></img>
            </button>
            <Table className="chamados_table" striped bordered hover aria-labelledby="tableLabel">
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
                        .sort((a, b) => {
                            const prioridade = ["Alta", "Média", "Baixa"]; // Se necessário
                            const dataA = new Date(a.data);
                            const dataB = new Date(b.data);

                            if (dataA > dataB) return -1;
                            if (dataA < dataB) return 1;
                            return prioridade.indexOf(a.urgencia) - prioridade.indexOf(b.urgencia);
                        })
                        .map((chamado, index) => (

                    <tr key={index}>
                        <td>{new Date(chamado.data).toLocaleDateString()}</td>
                        <td>{chamado.hora}</td>
                        <td>{chamado.cliente}</td>
                        <td>{chamado.descricao}</td>
                        <td className={
                            chamado.contrato === "Sim" ? "text-primary" : chamado.contrato}
                        >{chamado.contrato}</td>
                        <td className={
                            chamado.urgencia === "Alta" ? "text-danger" :
                                chamado.urgencia === "Média" ? "text-warning" :
                                    chamado.urgencia === "Baixa" ? "text-success" : chamado.urgencia}
                        >{chamado.urgencia}
                        </td>
                        <td>{chamado.status}</td>
                        <td>
                            <a variant="success" onClick={() => handleShowConcluir(chamado)}>
                                <i id="icon_opcoes" className="fa-regular fa-square-check"></i>
                            </a>
                            <a variant="success" onClick={() => handleShowEditar(chamado)}>
                                <i id="icon_opcoes" className="fa-regular fa-pen-to-square"></i>
                            </a>
                            <a variant="success" onClick={() => handleShowDeletar(chamado)}>
                                <i id="icon_opcoes" className="fa-solid fa-trash"></i>
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

            <DeletarChamado
                show={showDeletarModal}
                handleClose={handleCloseDeletar}
                chamado={selectedChamado}
                onDeletarChamado={onDeletarChamado}
            />

            {/* //// */}


        </div>
    );
}
export default ChamadoIndex;
