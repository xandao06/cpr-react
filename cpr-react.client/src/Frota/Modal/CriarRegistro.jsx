import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CriarRegistro({ show, handleClose, onAddRegistro }) {

    const [newRegistro, setNewRegistro] = useState({
        dataRevisao: '',
        dataAbastecimento: '',
        dataOleo: '',
        dataBalanceamento: '',
        precoAbastecimento: '',
        quilometragem: '',
        observacao: '',
        paraConsertar: ''
    });

    useEffect(() => {
        if (show) {

            setNewRegistro({
                dataRevisao: '',
                dataAbastecimento: '',
                dataOleo: '',
                dataBalanceamento: '',
                precoAbastecimento: '',
                quilometragem: '',
                observacao: '',
                paraConsertar: ''
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

        setNewRegistro((prevState) => ({
            ...prevState,
            [name]: name === 'precoAbastecimento' ? formatCurrency(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enviarRegistro = {
            ...newRegistro,
            precoAbastecimento: newRegistro.precoAbastecimento
                ? parseFloat(newRegistro.precoAbastecimento.replace(/[^0-9,-]+/g, "").replace(",", "."))
                : null,
        };
        onAddRegistro(enviarRegistro);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Criar Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal_criar_registro">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Ultima Revisão:</label>
                        <input
                            className="form-control mb-2"
                            type="date"
                            name="dataRevisao"
                            value={newRegistro.dataRevisao}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Troca do óleo:</label>
                        <input
                            className="form-control mb-2"
                            type="date"
                            name="dataOleo"
                            value={newRegistro.dataOleo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Ultimo Abastecimento:</label>
                        <input
                            className="form-control mb-2"
                            type="date"
                            name="dataAbastecimento"
                            value={newRegistro.dataAbastecimento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Ultimo Balanceamento:</label>
                        <input
                            className="form-control mb-2"
                            type="date"
                            name="dataBalanceamento"
                            value={newRegistro.dataBalanceamento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Preço do abastecimento:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="precoAbastecimento"
                            value={newRegistro.precoAbastecimento}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Quilometragem:</label>
                        <input
                            className="form-control mb-2"
                            type="number"
                            name="quilometragem"
                            value={newRegistro.quilometragem}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Observação:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="observacao"
                            value={newRegistro.observacao}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Para Consertar:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="paraConsertar"
                            value={newRegistro.paraConsertar}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit">Criar registro</button>
                </form>
            </Modal.Body>
        </Modal >
    );
}

export default CriarRegistro;