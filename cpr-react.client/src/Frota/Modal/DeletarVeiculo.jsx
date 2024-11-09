import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function DeletarVeiculo({ show, handleClose, veiculo, onDeletarVeiculo }) {

    const [deletarVeiculo, setDeletarVeiculo] = useState({
        ...veiculo
    });

    useEffect(() => {
        if (veiculo) {
            setDeletarVeiculo({ ...veiculo });
        }
    }, [veiculo]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (deletarVeiculo) {
            await onDeletarVeiculo(deletarVeiculo);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Deletar Veículo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="id"
                        value={deletarVeiculo?.id || ''}
                    />
                    <p>Tem certeza que deseja deletar o veículo <strong>{veiculo?.modelo}</strong>?</p>
                    <button type="submit">
                        Deletar Veículo
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DeletarVeiculo;