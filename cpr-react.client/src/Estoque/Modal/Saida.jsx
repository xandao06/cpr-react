import React, { useState, useEffect } from 'react';
import ChamadoIndex from '../../Chamado/View/ChamadoIndex';
import EstoqueIndex from '../View/EstoqueIndex';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

function Saida({ show, handleClose, onSaida, produtos }) {
    const [produto, setProduto] = useState({
        codigosistema: '',
        nome: '',
        marca: '',
        modelo: '',
        quantidade: '',
        precocusto: '',
        precovenda: '',
        descricao: '',
    });

    useEffect(() => {
        if (show) {
            setProduto({
                codigosistema: '',
                nome: '',
                marca: '',
                modelo: '',
                quantidade: '',
                precocusto: '',
                precovenda: '',
                descricao: '',
            });
        }
    }, [show]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduto({ ...produto, [name]: value });

        if (name === 'nome') {
            // Busca o produto pelo nome
            const produtoEncontrado = produtos.find(prod => prod.nome.toLowerCase() === value.toLowerCase());
            if (produtoEncontrado) {
                setProduto(produtoEncontrado); // Atualiza o estado com o produto encontrado
            } else {
                // Se não encontrado, reseta os campos adicionais
                setProduto(prevState => ({
                    ...prevState,
                    marca: '',
                    modelo: '',
                    quantidade: '',
                    precocusto: '',
                    precovenda: '',
                    descricao: '',
                }));
            }
        }
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        onSaida(produto); // Chama a função de entrada/saída passando o produto atualizado
        handleClose();
    };

    //const handleEntradaSaida = (novoProduto) => {
    //    // Lógica para manipular a entrada ou saída
    //    console.log('Produto adicionado/atualizado:', novoProduto);

    //    // Atualiza a lista de produtos, dependendo se é novo ou existente
    //    setProduto(prevProdutos => {
    //        const exists = prevProdutos.find(prod => prod.nome === novoProduto.nome);
    //        if (exists) {
    //            return prevProdutos.map(prod => prod.nome === novoProduto.nome ? novoProduto : prod);
    //        }
    //        return [...prevProdutos, novoProduto];
    //    });
    //    handleClose(); // Fecha o modal após a ação
    //};

 

        return (
            <Modal show={show} onHide={handleClose} >
                <Modal.Header id="modal_entradasaida" closeButton>
                    <Modal.Title>Entrada ou Saida</Modal.Title>
                </Modal.Header>
                <Modal.Body id="modal_entradasaida">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Código no Sistema:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="codigoSistema"
                                value={produto.codigosistema}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Nome:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="nome"
                                value={produto.nome}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Marca:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="marca"
                                value={produto.marca}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Modelo:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="modelo"
                                value={produto.modelo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Quantidade:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="quantidade"
                                value={produto.quantidade}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Preço de custo:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="precoCusto"
                                value={produto.precocusto}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Preço de venda:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="precovenda"
                                value={produto.precovenda}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Descrição:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="descricao"
                                value={produto.descricao}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/*<div>*/}
                        {/*    <label>Entrada:</label>*/}
                        {/*    <input*/}
                        {/*        className="form-check-input"*/}
                        {/*        type="radio"*/}
                        {/*        name="entradaSaida"*/}
                        {/*        value={produto.entradaousaida, "Entrada"}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        id="entrada"*/}
                        {/*    />*/}
                        {/*    <label>Saída:</label>*/}
                        {/*    <input*/}
                        {/*        className="form-check-input"*/}
                        {/*        type="radio"*/}
                        {/*        name="entradaSaida"*/}
                        {/*        value={produto.entradaousaida, "Saída"}*/}
                        {/*        onChange={handleInputChange}*/}
                        {/*        id="saida"*/}
                        {/*    /> */}
                        {/*</div>*/}

                        <button type="submit">Salvar</button>
                    </form>
                </Modal.Body>
            </Modal >
        );
    }
export default Saida;