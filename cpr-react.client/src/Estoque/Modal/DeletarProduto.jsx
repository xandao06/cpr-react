import React, { useState, useEffect } from 'react';
import EstoqueIndex from '../View/EstoqueIndex';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

function DeletarProduto({ show, handleClose, produto, onDeletarProduto }) {

    const [deletarProduto, setDeletarProduto] = useState({
        ...produto
    });

    useEffect(() => {
        if (produto) {
            setDeletarProduto({ ...produto });
        }
    }, [produto]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (deletarProduto) {
            await onDeletarProduto(deletarProduto);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Deletar Produto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <input
                        type="hidden"
                        name="id"
                        value={deletarProduto?.id || ''}
                    />
                    <p>Tem certeza que deseja deletar o chamado do cliente <strong>{produto?.nome}</strong>?</p>
                    <button type="submit">
                        Deletar Produto
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default DeletarProduto;