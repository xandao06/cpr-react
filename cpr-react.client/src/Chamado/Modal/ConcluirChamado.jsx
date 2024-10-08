import React, { useState, useEffect } from 'react';
import ChamadoIndex from '../View/ChamadoIndex';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

function ConcluirChamado({ show, handleClose, chamado, onConcluirChamado }) {
    const [updatedChamado, setUpdatedChamado] = useState({
        ...chamado,
        status: 'Concluído'
    });

    useEffect(() => {
        if (chamado) {
            setUpdatedChamado({ ...chamado, status: 'Concluído' });
        }
    }, [chamado]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (chamado) {
            await onConcluirChamado(updatedChamado);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Concluir Chamado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="id"
                        value={updatedChamado?.id || ''}
                    />
                    <p>Tem certeza que deseja concluir o chamado para o cliente <strong>{chamado?.cliente}</strong>?</p>
                    <button type="submit">
                        Concluir Chamado
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ConcluirChamado;