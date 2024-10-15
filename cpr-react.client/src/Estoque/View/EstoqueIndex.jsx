//import { useEffect, useState } from 'react';
//import '../CSS/Estoque.css';
//import { Button } from 'react-bootstrap';
//import Table from 'react-bootstrap/Table';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { useNavigate } from 'react-router-dom';
//import ChamadoIndex from '../../Chamado/View/ChamadoIndex';
//import EntradaSaida from '../Modal/EntradaSaida';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//function EstoqueIndex() {

//    const [selectedProduto, setSelectedProduto] = useState(null); // GERAL
//    const [produtos, setProdutos] = useState([]);  // GERAL

//    const [showModal, setShowModal] = useState(false); // ENTRADA/SAIDA


//    const navigate = useNavigate();

//    const goToEstoque = () => {
//        navigate('/estoque');
//    }

//    const handleShow = () => setShowModal(true); // Função para abrir o modal
//    const handleClose = () => setShowModal(false); // Função para fechar o modal

//    const handleEntradaSaida = (novoProduto) => {
//        // Aqui você pode adicionar a lógica para manipular a entrada ou saída
//        console.log('Produto adicionado/atualizado:', novoProduto);
//        // Atualize a lista de produtos ou faça outra ação necessária
//        setProdutos(prevProdutos => [...prevProdutos, novoProduto]);
//        handleClose(); // Fecha o modal após a ação
//    };



//    {/* //BUSCA DE CHAMADOS// */ }

//    useEffect(() => {
//        const fetchProdutos = async () => {
//            try {
//                const response = await fetch('https://192.168.10.230:7042/api/Estoque');
//                const data = await response.json();

//                setProdutos(data); // Filtra apenas chamados pendentes
//            } catch (error) {
//                console.error("Erro ao buscar produtos:", error);
//            }
//        };

//        fetchProdutos();
//    }, []);

//    {/* //// */ }


//        return (


//            <div className="container">

//                <h2>Estoque de produtos</h2>
//                <button variant="primary" onClick={handleShow}>Adicionar Produto</button> 
//                <Table id="produto_table" striped bordered hover>
//                    <thead>
//                        <tr>
//                            <th>Código no sistema</th>
//                            <th>Nome</th>
//                            <th>Marca</th>
//                            <th>Modelo</th>
//                            <th>Quantidade</th>
//                            <th>Preço de custo</th>
//                            <th>Preço de venda</th>
//                            <th>Descrição</th>
//                        </tr>
//                    </thead>
//                    <tbody>
//                        {produtos.map((produto, index) => (
//                            <tr key={index}>
//                                <td>{produto.codigosistema}</td>
//                                <td>{produto.nome}</td>
//                                <td>{produto.marca}</td>
//                                <td>{produto.modelo}</td>
//                                <td>{produto.quantidade}</td>
//                                <td>{produto.precocusto}</td>
//                                <td>{produto.precovenda}</td>
//                                <td>{produto.descricao}</td>
//                                <td>
//                                    <a variant="success" onClick={() => handleShowDeletar(estoque)}>
//                                        <i id="icon" className="fa-solid fa-trash"></i>
//                                    </a>
//                                </td>
//                            </tr>
//                        ))}
//                    </tbody>
//                </Table>

//                {/* ///REFERENCIA DOS MODAIS/// */}

//                <EntradaSaida
//                    show={showModal}
//                    handleClose={handleClose}
//                    onEntradaSaida={handleEntradaSaida}
//                    produtos={produtos} // Passa a lista de produtos para o modal
//                />


//            </div>
//        );
//    }

//export default EstoqueIndex;