import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeletarChamado({ show, handleClose, chamado, onDeletarChamado }) {

    const [deletarChamado, setDeletarChamado] = useState({
        ...chamado
    });

    useEffect(() => {
        if (chamado) {
            setDeletarChamado({ ...chamado });
        }
    }, [chamado]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (deletarChamado) {
            await onDeletarChamado(deletarChamado);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Deletar Chamado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="id"
                        value={deletarChamado?.id || ''}
                    />
                    <p>Tem certeza que deseja deletar o chamado do cliente <strong>{chamado?.cliente}</strong>?</p>
                    <button type="submit">
                        Deletar Chamado
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DeletarChamado;