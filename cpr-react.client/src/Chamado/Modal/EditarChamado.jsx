import React, { useState, useEffect } from 'react';
import ChamadoIndex from '../View/ChamadoIndex';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

function EditarChamado({ show, handleClose, chamado, onEditarChamado }) {

    const [updatedChamado, setUpdatedChamado] = useState({
        id: '',
        data: '',
        hora: '',
        cliente: '',
        descricao: '',
        contrato: 'false',
        urgencia: 'false',
    });

    useEffect(() => {
        if (chamado) {
            const formattedDate = format(new Date(chamado.data), 'yyyy-MM-dd');
            setUpdatedChamado({
                ...chamado,
                data: formattedDate,
                hora: chamado.hora,
                contrato: chamado.contrato,
                urgencia: chamado.urgencia 
            });
        }
    }, [chamado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedChamado({ ...updatedChamado, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updatedChamado) {
            await onEditarChamado(updatedChamado);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header id="modal_editar_chamado" closeButton>
                <Modal.Title>Editar Chamado</Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal_criar_chamado">
                <Form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="hidden"
                            name="id"
                            value={updatedChamado?.id}
                            onChange={handleChange}
                        />
                        <label>Data:</label>
                        <input
                            className="form-control mb-2"
                            type="date"
                            name="data"
                            value={updatedChamado?.data || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Hora:</label>
                        <input
                            className="form-control mb-2"
                            type="time"
                            name="hora"
                            value={updatedChamado?.hora || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Cliente:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="cliente"
                            value={updatedChamado?.cliente || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Descrição:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="descricao"
                            value={updatedChamado?.descricao || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Contrato:</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="contrato"
                            value="Sim"
                            checked={updatedChamado.contrato === "Sim"}
                            onChange={handleChange}
                            id="sim"
                        />
                        <label id="contrato_label">Sim</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="contrato"
                            value="Não"
                            checked={updatedChamado.contrato === 'Não'}
                            onChange={handleChange}
                            id="não"
                        />
                        <label id="contrato_label">Não:</label>
                    </div>
                    <div>
                        <label>Urgência:</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="urgencia"
                            value="Baixa"
                            checked={updatedChamado.urgencia === 'Baixa'}
                            onChange={handleChange}
                            id="baixa"
                        />
                        <label id="urgencia_label">Baixa:</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="urgencia"
                            value="Média"
                            checked={updatedChamado.urgencia === 'Média'}
                            onChange={handleChange}
                            id="media"
                        />
                        <label id="urgencia_label">Média:</label>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="urgencia"
                            value="Alta"
                            checked={updatedChamado.urgencia === 'Alta'}
                            onChange={handleChange}
                            id="alta"
                        />
                        <label id="urgencia_label">Alta:</label>
                    </div>

                    <button type="submit">Editar chamado</button>
                </Form>
            </Modal.Body>
        </Modal >
    );
}

export default EditarChamado;