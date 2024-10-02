import React, { useState, useEffect } from 'react';
import ChamadoIndex from '../View/ChamadoIndex';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

function CriarChamado({ show, handleClose, onAddChamado }) {

    const [newChamado, setNewChamado] = useState({
        data: '',
        hora: '',
        cliente: '',
        descricao: '',
        contrato: '',
        urgencia: '',
        status: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewChamado(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        if (show) { // Apenas preenche quando o modal está visível
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().split('T')[0]; // yyyy-MM-dd
            const formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:mm

            setNewChamado({ // Limpa o formulário
                data: formattedDate,
                hora: formattedTime,
                cliente: '',
                descricao: '',
                contrato: '',
                urgencia: '',
                status: ''
            });
        }
    }, [show]); // Dependência para atualizar quando o modal é exibido

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddChamado(newChamado); // Chama a função para adicionar o chamado
        handleClose(); // Fecha o modal após o envio
    };

return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Criar Chamado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Data:</label>
                    <input
                        className="form-control mb-2"
                        type="date"
                        name="data"
                        value={newChamado.data}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Hora:</label>
                    <input
                        className="form-control mb-2"
                        type="time"
                        name="hora"
                        value={newChamado.hora}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Cliente:</label>
                    <input
                        className="form-control mb-2"
                        type="text"
                        name="cliente"
                        value={newChamado.cliente}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Descrição:</label>
                    <input
                        className="form-control mb-2"
                        type="text"
                        name="descricao"
                        value={newChamado.descricao}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Contrato:</label>
                    <input
                        className="form-control mb-2"
                        type="text"
                        name="contrato"
                        value={newChamado.contrato}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Urgência:</label>
                    <input
                        className="form-control mb-2"
                        type="text"
                        name="urgencia"
                        value={newChamado.urgencia}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Status:</label>
                    <input
                        className="form-control mb-2"
                        type="text"
                        name="status"
                        value={newChamado.status}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Criar chamado</button>
            </form>
        </Modal.Body>
    </Modal >
    );
}

export default CriarChamado;