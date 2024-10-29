import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ConcluirConsignado({ show, handleClose, equipamento, onConcluirConsignado }) {

    const [status, setStatus] = useState('Concluído');

    useEffect(() => {
        if (equipamento) {
            setStatus('Concluído');
        }
    }, [equipamento]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (equipamento) {
            await onConcluirConsignado({ ...equipamento, status });
            handleClose();
        }
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Concluir Consignado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <p>Tem certeza que deseja concluir o consignado para o cliente <strong>{equipamento?.cliente}</strong>?</p>
                    <button type="submit">
                        Concluir Consignado
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default ConcluirConsignado;