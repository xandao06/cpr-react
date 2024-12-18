﻿import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeletarConsignado({ show, handleClose, equipamento, onDeletarConsignado }) {

    const [deletarConsignado, setDeletarConsignado] = useState({
        ...equipamento
    });

    useEffect(() => {
        if (equipamento) {
            setDeletarConsignado({ ...equipamento });
        }
    }, [equipamento]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (deletarConsignado) {
            await onDeletarConsignado(deletarConsignado);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Deletar Consignado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="id"
                        value={deletarConsignado?.id || ''}
                    />
                    <p>Tem certeza que deseja deletar o Consignado do cliente <strong>{equipamento?.cliente}</strong>?</p>
                    <button type="submit">
                        Deletar Consignado
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DeletarConsignado;