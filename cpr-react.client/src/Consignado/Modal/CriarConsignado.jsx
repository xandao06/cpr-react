import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CriarConsignado({ show, handleClose, onAddConsignado }) {

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEquipamento(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (show) {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // yyyy-MM-dd
            const formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:mm
            status: 'Emprestado';

            setNewEquipamento({
                data: formattedDate,
                hora: formattedTime,
                cliente: '',
                descricao: '',
                contrato: '',
                status: 'Emprestado',
                numeroSerie: '',
                marca: '',
                modelo: '',
                preco: '',
                quantidade: '',
            });
        }
    }, [show]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddConsignado(newEquipamento); // Chama a função para adicionar o chamado
        handleClose(); // Fecha o modal após o envio
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
                            value={newEquipamento?.data || ''}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Hora:</label>
                        <input
                            className="form-control mb-2"
                            type="time"
                            name="hora"
                            value={newEquipamento?.hora || ''}
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
                        <label id="contrato_label">Sim</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="contrato"
                            value={newEquipamento.contrato, "Não"}
                            onChange={handleInputChange}
                            id="não"
                        />
                        <label id="contrato_label">Não:</label>
                    </div>
                    <div>
                        <label>Numero de Série:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="numeroSerie"
                            value={newEquipamento?.numeroSerie || ''}
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