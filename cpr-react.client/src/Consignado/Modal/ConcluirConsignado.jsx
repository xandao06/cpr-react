import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ConcluirConsignado({ show, handleClose, equipamento, onConcluirConsignado }) {
    const [updatedEquipamento, setUpdatedEquipamento] = useState({
        ...equipamento,
        status: 'Concluído'
    });

    useEffect(() => {
        if (equipamento) {
            setUpdatedEquipamento({ ...equipamento, status: 'Concluído' });
        }
    }, [equipamento]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (equipamento) {
            await onConcluirConsignado(updatedEquipamento);
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
                    <input
                        type="hidden"
                        name="id"
                        value={updatedEquipamento?.id || ''}
                    />
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