import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

function EditarConsignado({ show, handleClose, equipamento, onEditarConsignado }) {

    const [updatedEquipamento, setUpdatedEquipamento] = useState({
        id: '',
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
        if (equipamento) {
            const formattedDate = format(new Date(equipamento.data), 'yyyy-MM-dd');
            setUpdatedEquipamento({
                ...equipamento,
                data: formattedDate,
                hora: equipamento.hora,
                contrato: equipamento.contrato,
            });
        }
    }, [equipamento]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEquipamento({ ...updatedEquipamento, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updatedEquipamento) {
            await onEditarConsignado(updatedEquipamento);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Editar Consignado</Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal_editar_consignado">
                <Form onSubmit={handleSubmit}>
                    <div>
                        <label>Data:</label>
                        <input
                            className="form-control mb-2"
                            type="date"
                            name="data"
                            value={updatedEquipamento?.data || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Hora:</label>
                        <input
                            className="form-control mb-2"
                            type="time"
                            name="hora"
                            value={updatedEquipamento?.hora || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Cliente:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="cliente"
                            value={updatedEquipamento?.cliente || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Contrato:</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="contrato"
                            value={updatedEquipamento.contrato, "Sim"}
                            onChange={handleChange}
                            id="sim"
                        />
                        <label id="contrato_label">Sim</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="contrato"
                            value={updatedEquipamento.contrato, "Não"}
                            onChange={handleChange}
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
                            value={updatedEquipamento?.numeroSerie || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Tipo:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="tipo"
                            value={updatedEquipamento?.tipo || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Marca:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="marca"
                            value={updatedEquipamento?.marca || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Modelo:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="modelo"
                            value={updatedEquipamento?.modelo || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Quantidade:</label>
                        <input
                            className="form-control mb-2"
                            type="number"
                            name="quantidade"
                            value={updatedEquipamento?.quantidade || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Preço:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="preco"
                            value={updatedEquipamento?.preco || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="descricao"
                            value={updatedEquipamento?.descricao || ''}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Editar Consignado</button>
                </Form>
            </Modal.Body>
        </Modal >
    );
}

export default EditarConsignado;