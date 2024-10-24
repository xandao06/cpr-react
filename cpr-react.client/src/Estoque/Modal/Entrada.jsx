import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Entrada({ show, handleClose, onEntrada, produtos }) {
    const [produto, setProduto] = useState({
        codigosistema: '',
        nome: '',
        marca: '',
        modelo: '',
        quantidade: '',
        precoCusto: '',
        precoVenda: '',
        descricao: '',
    });

    {/* //BUSCA DE PRODUTOS// */ }

    useEffect(() => {
        if (show) {
            setProduto({
                codigosistema: '',
                nome: '',
                marca: '',
                modelo: '',
                quantidade: '',
                precoCusto: '',
                precoVenda: '',
                descricao: '',
            });
        }
    }, [show]);


    {/* //METODO QUE PUXA O PRODUTO PELO NOME// */ }

    const formatCurrency = (value) => {
        const number = value.replace(/\D/g, '');
        const formattedValue = (parseInt(number, 10) / 100).toFixed(2);
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(formattedValue);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'precoCusto' || name === 'precoVenda') {
            // Formata o valor como moeda
            setProduto({ ...produto, [name]: formatCurrency(value) });
        } else {
            setProduto({ ...produto, [name]: value });
        }

        if (name === 'nome') {
            const produtoEncontrado = produtos.find(prod => prod.nome.toLowerCase() === value.toLowerCase());
            if (produtoEncontrado) {
                setProduto({
                    ...produtoEncontrado,
                    precoCusto: formatCurrency(produtoEncontrado.precoCusto.toString()), // formata para exibição
                    precoVenda: formatCurrency(produtoEncontrado.precoVenda.toString()), // formata para exibição
                });
            } else {
                setProduto(prevState => ({
                    ...prevState,
                    codigoSistema: '',
                    marca: '',
                    modelo: '',
                    quantidade: '',
                    precoCusto: '',
                    precoVenda: '',
                    descricao: '',
                }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Remove o formato antes de enviar
        const produtoParaEnviar = {
            ...produto,
            precoCusto: produto.precoCusto
                ? parseFloat(produto.precoCusto.replace(/[^0-9,-]+/g, "").replace(",", "."))
                : null, // ou 0, dependendo do que você prefere
            precoVenda: produto.precoVenda
                ? parseFloat(produto.precoVenda.replace(/[^0-9,-]+/g, "").replace(",", "."))
                : null, // ou 0
        };
        onEntrada(produtoParaEnviar);
        handleClose();
    };

    {/* //// */ }



    {/* //MODAL// */}

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
                                value={produto?.codigoSistema || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Nome:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="nome"
                                value={produto?.nome || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Marca:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="marca"
                                value={produto?.marca || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Modelo:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="modelo"
                                value={produto?.modelo || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Quantidade:</label>
                            <input
                                className="form-control mb-2"
                                type="number"
                                name="quantidade"
                                value={produto?.quantidade || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Preço de custo:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="precoCusto"
                                value={produto?.precoCusto || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Preço de venda:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="precoVenda"
                                value={produto?.precoVenda || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Descrição:</label>
                            <input
                                className="form-control mb-2"
                                type="text"
                                name="descricao"
                                value={produto?.descricao || ''}
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
export default Entrada;