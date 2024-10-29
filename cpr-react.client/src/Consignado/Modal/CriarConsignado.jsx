import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


function CriarConsignado({ show, handleClose, onAddConsignado }) {

    const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:7042/api/Consignado`;

    const [equipamentos, setEquipamentos] = useState([]);
    const [newEquipamento, setNewEquipamento] = useState({
        data: '',
        hora: '',
        cliente: '',
        descricao: '',
        contrato: '',
        status: 'Emprestado',
        numeroSerie: '',
        tipo: '',
        marca: '',
        modelo: '',
        preco: '',
        quantidade: '',
    });


    useEffect(() => {
        const fetchEquipamentos = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}`);
                const data = await response.json();
                setEquipamentos(data);
            } catch (error) {
                console.error("Erro ao buscar lista de equipamentos:", error);
            }
        };
        fetchEquipamentos();
    }, [apiBaseUrl]);

    useEffect(() => {
        if (show) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // yyyy-MM-dd
            const formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:mm

            setNewEquipamento(prevState => ({
                ...prevState,
                data: formattedDate,
                hora: formattedTime,
            }));
        }
    }, [show]);

    useEffect(() => {
        if (!show) {
            setNewEquipamento({
                data: '',
                hora: '',
                cliente: '',
                descricao: '',
                contrato: '',
                status: 'Emprestado',
                numeroSerie: '',
                tipo: '',
                marca: '',
                modelo: '',
                preco: '',
                quantidade: '',
            });
        }
    }, [show]);


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

        if (name === 'preco') {
            // Formata o valor como moeda
            setNewEquipamento({ ...newEquipamento, [name]: formatCurrency(value) });
        } else {
            setNewEquipamento({ ...newEquipamento, [name]: value });
        }

        setNewEquipamento(prevState => ({ ...prevState, [name]: value }));

        if (name === 'numeroSerie') {
            const equipamentoEncontrado = equipamentos.find(equip => equip.numeroSerie.toLowerCase() === value.toLowerCase());
            if (equipamentoEncontrado) {

                setNewEquipamento(prevState => ({
                    ...prevState,
                    tipo: equipamentoEncontrado.tipo,
                    marca: equipamentoEncontrado.marca,
                    modelo: equipamentoEncontrado.modelo,
                    preco: formatCurrency(equipamentoEncontrado.preco.toString()),
                }));
            } else {
                // Se o nome não corresponder a nenhum equipamento, limpe os dados
                setNewEquipamento(prevState => ({
                    ...prevState,
                    tipo: '',
                    marca: '',
                    modelo: '',
                    preco: '',
                }));
            }
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Remove o formato antes de enviar
        const equipamentoParaEnviar = {
            ...newEquipamento,
            preco: newEquipamento.preco
                ? parseFloat(newEquipamento.preco.replace(/[^0-9,-]+/g, "").replace(",", "."))
                : null,
        };
        onAddConsignado(equipamentoParaEnviar);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Criar Consignado</Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal_criar_consignado">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Data:</label>
                        <input
                            className="form-control mb-2"
                            type="date"
                            name="data"
                            value={newEquipamento.data}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Hora:</label>
                        <input
                            className="form-control mb-2"
                            type="time"
                            name="hora"
                            value={newEquipamento.hora}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Cliente:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="cliente"
                            value={newEquipamento?.cliente || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Contrato:</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="contrato"
                            value={newEquipamento.contrato, "Sim"}
                            onChange={handleInputChange}
                            id="sim"
                        />
                        <label htmlFor="sim" id="contrato_label">Sim</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="contrato"
                            value={newEquipamento.contrato, "Não"}
                            onChange={handleInputChange}
                            id="não"
                        />
                        <label htmlFor="não" id="contrato_label">Não:</label>
                    </div>
                    <div>
                        <label>Numero de Série:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="numeroSerie"
                            value={newEquipamento.numeroSerie}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="tipo"
                            value={newEquipamento?.tipo || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Marca:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="marca"
                            value={newEquipamento?.marca || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Modelo:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="modelo"
                            value={newEquipamento?.modelo || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Quantidade:</label>
                        <input
                            className="form-control mb-2"
                            type="number"
                            name="quantidade"
                            value={newEquipamento?.quantidade || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Preço:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="preco"
                            value={newEquipamento?.preco || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="descricao"
                            value={newEquipamento?.descricao || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit">Criar Consignado</button>
                </form>
            </Modal.Body>
        </Modal >
    );
}

export default CriarConsignado;