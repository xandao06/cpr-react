//import React, { useState, useEffect } from 'react';
//import ChamadoIndex from '../View/ChamadoIndex';
//import EstoqueIndex from '../View/EstoqueIndex';
//import { Modal, Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import { format } from 'date-fns';

//function EntradaSaida({ show, handleClose, onEntradaSaida, produtos }) {
//    const [produto, setProduto] = useState({
//        codigosistema: '',
//        nome: '',
//        marca: '',
//        modelo: '',
//        quantidade: '',
//        precocusto: '',
//        precovenda: '',
//        descricao: '',
//    });

//    const fetchProduto = (nome) => {
//        const produtoEncontrado = produtos.find(prod => prod.nome.toLowerCase() === nome.toLowerCase());
//        if (produtoEncontrado) {
//            setProduto(produtoEncontrado); // Atualiza o estado com as características do produto encontrado
//        } else {
//            setProduto({ ...produto, nome }); // Mantém o nome digitado, mas limpa o resto
//        }
//    };

//    const handleInputChange = (event) => {
//        const { name, value } = event.target;
//        setProduto({ ...produto, [name]: value });

//        if (name === 'nome') {
//            buscarProduto(value); // Chama a função de busca quando o nome é alterado
//        }
//    };

//    const handleSubmit = (event) => {
//        event.preventDefault();
//        onEntradaSaida(produto); // Chama a função para criar o produto
//        handleClose(); // Fecha o modal após criar o produto
//    };

//    return (
//        <Modal show={show} onHide={handleClose} >
//            <Modal.Header id="modal_entradasaida" closeButton>
//                <Modal.Title>Entrada ou Saida</Modal.Title>
//            </Modal.Header>
//            <Modal.Body id="modal_entradasaida">
//                <form onSubmit={handleSubmit}>
//                    <div>
//                        <label>Código no Sistema:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="codigoSistema"
//                            value={produto.codigosistema}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Nome:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="nome"
//                            value={produto.nome}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Marca:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="marca"
//                            value={produto.marca}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Modelo:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="modelo"
//                            value={produto.modelo}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Quantidade:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="quantidade"
//                            value={produto.quantidade}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                        <div>
//                        <label>Preço de custo:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="precoCusto"
//                            value={produto.precocusto}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                        <div>
//                        <label>Preço de venda:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="precovenda"
//                            value={produto.precovenda}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Descrição:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="descricao"
//                            value={produto.descricao}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    {/*<div>*/}
//                    {/*    <label>Entrada:</label>*/}
//                    {/*    <input*/}
//                    {/*        className="form-check-input"*/}
//                    {/*        type="radio"*/}
//                    {/*        name="entradaSaida"*/}
//                    {/*        value={produto.entradaousaida, "Entrada"}*/}
//                    {/*        onChange={handleInputChange}*/}
//                    {/*        id="entrada"*/}
//                    {/*    />*/}
//                    {/*    <label>Saída:</label>*/}
//                    {/*    <input*/}
//                    {/*        className="form-check-input"*/}
//                    {/*        type="radio"*/}
//                    {/*        name="entradaSaida"*/}
//                    {/*        value={produto.entradaousaida, "Saída"}*/}
//                    {/*        onChange={handleInputChange}*/}
//                    {/*        id="saida"*/}
//                    {/*    /> */}
//                    {/*</div>*/}

//                    <button type="submit">Criar chamado</button>
//                </form>
//            </Modal.Body>
//        </Modal >
//    );
//}

//export default EntradaSaida;