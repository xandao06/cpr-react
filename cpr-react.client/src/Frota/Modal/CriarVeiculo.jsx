import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CriarVeiculo({ show, handleClose, onAddVeiculo }) {

    const [newVeiculo, setNewVeiculo] = useState({
        marca: '',
        modelo: '',
        placa: '',
    });

    useEffect(() => {
        if (show) {

            setNewVeiculo({
                marca: '',
                modelo: '',
                placa: '',
            });
        }
    }, [show]);

    const formatCurrency = (value) => {
        const number = value.replace(/\D/g, '');
        const formattedValue = (parseInt(number, 10) / 100).toFixed(2);
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(formattedValue);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setNewVeiculo((prevState) => ({
            ...prevState,
            [name]: name === 'precoAbastecimento' ? formatCurrency(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enviarVeiculo = {
            ...newVeiculo,
            precoAbastecimento: newVeiculo.precoAbastecimento
                ? parseFloat(newVeiculo.precoAbastecimento.replace(/[^0-9,-]+/g, "").replace(",", "."))
                : null,
        };
        onAddVeiculo(enviarVeiculo);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Criar Veículo</Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal_criar_veiculo">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Marca:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="marca"
                            value={newVeiculo.marca}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Modelo:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="modelo"
                            value={newVeiculo.modelo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Placa:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="placa"
                            value={newVeiculo.placa}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit">Criar veículo</button>
                </form>
            </Modal.Body>
        </Modal >
    );
}

export default CriarVeiculo;