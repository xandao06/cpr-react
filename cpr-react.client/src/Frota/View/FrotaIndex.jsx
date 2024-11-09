import { useEffect, useState } from 'react';
import '../CSS/Frota.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import CriarVeiculo from '../Modal/CriarVeiculo';
import CriarRegistro from '../Modal/CriarRegistro';
import EditarVeiculo from '../Modal/EditarVeiculo';
import DeletarVeiculo from '../Modal/DeletarVeiculo';
import {
    fetchVeiculos,
    addVeiculo,
    addRegistro,
    editarVeiculo,
    deletarVeiculo,
    formatarPreco,
    fetchRegistros
} from '../../Components/FrotaComponent';

function FrotaIndex() {

    {/* REFERENCIAS */ }

    const [selectedVeiculo, setSelectedVeiculo] = useState(null); // GERAL
    const [veiculos, setVeiculos] = useState([]);  // GERAL

    const [selectedRegistro, setSelectedRegistro] = useState(null); // GERAL
    const [registros, setRegistros] = useState([]);  // GERAL

    const [showCriarVeiculoModal, setShowCriarVeiculoModal] = useState(false);  // CRIAR VEICULO
    const handleCloseCriarVeiculo = () => setShowCriarVeiculoModal(false); // CRIAR VEICULO
    const handleShowCriarVeiculo = () => setShowCriarVeiculoModal(true); // CRIAR VEICULO

    const [showCriarRegistroModal, setShowCriarRegistroModal] = useState(false);  // CRIAR REGISTRO
    const handleCloseCriarRegistro = () => setShowCriarRegistroModal(false); // CRIAR REGISTRO
    const handleShowCriarRegistro = () => setShowCriarRegistroModal(true); // CRIAR REGISTRO

    const [showEditarModal, setShowEditarModal] = useState(false); // EDITAR
    const handleCloseEditar = () => setShowEditarModal(false); // EDITAR
    const handleShowEditar = (veiculo) => { // EDITAR
        setSelectedVeiculo(veiculo); // EDITAR
        setShowEditarModal(true); // EDITAR
    };

    const [showDeletarModal, setShowDeletarModal] = useState(false); // DELETAR
    const handleCloseDeletar = () => setShowDeletarModal(false); // DELETAR
    const handleShowDeletar = (veiculo) => { // DELETAR
        setSelectedVeiculo(veiculo); // DELETAR
        setShowDeletarModal(true); // DELETAR
    };

    const [showDetalhes, setShowDetalhes] = useState(false);
    const [veiculoDetalhado, setVeiculoDetalhado] = useState(null);
    const handleShowDetalhes = (veiculo) => {
        setVeiculoDetalhado(veiculo);
    };

    {/* ///// */ }


    {/* BUSCA OS VEICULOS */ }

    useEffect(() => {
        const loadVeiculos = async () => {
            const data = await fetchVeiculos();
            setVeiculos(data);
        };
        loadVeiculos();
    }, []);


    {/* BUSCA OS REGISTROS */ }

    useEffect(() => {
        const loadRegistros = async () => {
            const data = await fetchRegistros();
            setRegistros(data);
        };
        loadRegistros();
    }, []);

    {/* ADICIONA VEICULO */ }

    const onAddVeiculo = async (newVeiculo) => {
        const data = await addVeiculo(newVeiculo);
        if (data) setVeiculos([...veiculos, data]);
        setShowCriarVeiculoModal(false);
    };

    {/* ADICIONA REGISTRO */ }

    const onAddRegistro = async (newRegistro) => {
        const data = await addRegistro(newRegistro);
        if (data) setRegistros([...registros, data]);
        setShowCriarRegistroModal(false);
    };

    {/* EDITA VEICULO */ }

    const onEditarVeiculo = async (updatedVeiculo) => {
        const success = await editarVeiculo(updatedVeiculo);
        if (success) {
            setVeiculos(veiculos.map(c => c.id === updatedVeiculo.id ? updatedVeiculo : c));
            setShowEditarModal(false);
        }
    };

    {/* DELETA VEICULO */ }

    const onDeletarVeiculo = async (veiculo) => {
        const success = await deletarVeiculo(veiculo);
        if (success) setVeiculos(veiculos.filter(c => c.id !== veiculo.id));
        setShowDeletarModal(false);
    };


    {/* TABELA */ }


    const renderDetalhesVeiculo = () => (
        <div className="detalhes-veiculo">
            <h3>Detalhes do Veículo</h3>
            <div id="detalhes_btn">
                <button onClick={handleShowCriarRegistro}> Adicionar Registro </button>
                <button onClick={() => setShowDetalhes(false)}>Voltar</button>
            </div>
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>Última revisão</th>
                        <th>Último abastecimento</th>
                        <th>Preço do abastecimento</th>
                        <th>Quilometragem</th>
                        <th>Troca do óleo</th>
                        <th>Último balanceamento</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Placa</th>
                        <th>Para Consertar</th>
                        <th>Observação</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody className="table-light">
                    {registros

                        .map((registro, index) => (

                            <tr key={index}>
                                <td>{new Date(registro.dataRevisao).toLocaleDateString()}</td>
                                <td>{new Date(registro.dataAbastecimento).toLocaleDateString()}</td>
                                <td>{formatarPreco(registro.precoAbastecimento)}</td>
                                <td>{registro.quilometragem}</td>
                                <td>{new Date(registro.dataOleo).toLocaleDateString()}</td>
                                <td>{new Date(registro.dataBalanceamento).toLocaleDateString()}</td>
                                <td>{registro.marca}</td>
                                <td>{registro.modelo}</td>
                                <td>{registro.placa}</td>
                                <td>{registro.paraConsertar}</td>
                                <td>{registro.observacao}</td>
                                <td>
                                    <a variant="success" onClick={() => handleShowEditar(registro)}>
                                        <i id="icon_opcoes" className="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <a variant="success" onClick={() => handleShowDeletar(registro)}>
                                        <i id="icon_opcoes" className="fa-solid fa-trash"></i>
                                    </a>
                                    
                                </td>
                            </tr>
                        ))}
                </tbody>

            </Table>
            
        </div>
    );

{/* //// */}

    const renderListaVeiculos = () => (
        <div>
            <h2>Frota</h2>
            <button id="new_veiculo_btn" onClick={handleShowCriarVeiculo}> Adicionar Veículo </button>
            <Table id="veiculos_table" striped bordered hover aria-labelledby="tableLabel">
                <thead className="table-dark">
                    <tr>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Placa</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody className="table-light">
                    {veiculos
                        .map((veiculo, index) => (
                            <tr key={index}>
                                <td><a onClick={() => { setSelectedVeiculo(veiculo); setShowDetalhes(true); }}>{veiculo.marca}</a></td>
                                <td><a onClick={() => { setSelectedVeiculo(veiculo); setShowDetalhes(true); }}>{veiculo.modelo}</a></td>
                                <td><a onClick={() => { setSelectedVeiculo(veiculo); setShowDetalhes(true); }}>{veiculo.placa}</a></td>
                                <td>
                                    <a variant="success" onClick={() => handleShowEditar(veiculo)}>
                                        <i id="icon_opcoes" className="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <a variant="success" onClick={() => handleShowDeletar(veiculo)}>
                                        <i id="icon_opcoes" className="fa-solid fa-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );

    return (
        <div className="container">
            {showDetalhes && selectedVeiculo ? renderDetalhesVeiculo(selectedVeiculo) : renderListaVeiculos()}

            {/* REFERENCIA DOS MODAIS */}

            <CriarVeiculo
                show={showCriarVeiculoModal}
                handleClose={handleCloseCriarVeiculo}
                onAddVeiculo={onAddVeiculo}
            />

            <CriarRegistro
                show={showCriarRegistroModal}
                handleClose={handleCloseCriarRegistro}
                onAddRegistro={onAddRegistro}
            />

            <EditarVeiculo
                show={showEditarModal}
                handleClose={handleCloseEditar}
                veiculo={selectedVeiculo}
                onEditarVeiculo={onEditarVeiculo}
            />

            <DeletarVeiculo
                show={showDeletarModal}
                handleClose={handleCloseDeletar}
                veiculo={selectedVeiculo}
                onDeletarVeiculo={onDeletarVeiculo}
            />

            {/* //// */}


        </div>
    );
}
export default FrotaIndex;
