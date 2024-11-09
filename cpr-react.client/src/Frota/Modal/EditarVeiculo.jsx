import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';

function EditarVeiculo({ show, handleClose, veiculo, onEditarVeiculo }) {

    const [updatedVeiculo, setUpdatedVeiculo] = useState({
        //dataRevisao: '',
        //dataAbastecimento: '',
        //dataOleo: '',
        //dataBalanceamento: '',
        marca: '',
        modelo: '',
        //precoAbastecimento: '',
        //quilometragem: '',
        placa: '',
        //observacao: '',
        //paraConsertar: ''
    });

    useEffect(() => {
        if (veiculo) {
            setUpdatedVeiculo({
                ...veiculo,
            });
        }
    }, [veiculo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedVeiculo({ ...updatedVeiculo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (updatedVeiculo) {
            await onEditarVeiculo(updatedVeiculo);
            handleClose();
        }
    };

    return (
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Editar Veículo</Modal.Title>
            </Modal.Header>
            <Modal.Body id="modal_editar_veiculo">
                <Form onSubmit={handleSubmit}>
                    {/*<div>*/}
                    {/*    <label>Ultima Revisão:</label>*/}
                    {/*    <input*/}
                    {/*        className="form-control mb-2"*/}
                    {/*        type="date"*/}
                    {/*        name="dataRevisao"*/}
                    {/*        value={updatedVeiculo.dataRevisao}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>Troca do óleo:</label>*/}
                    {/*    <input*/}
                    {/*        className="form-control mb-2"*/}
                    {/*        type="date"*/}
                    {/*        name="dataOleo"*/}
                    {/*        value={updatedVeiculo.dataOleo}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>Ultimo Abastecimento:</label>*/}
                    {/*    <input*/}
                    {/*        className="form-control mb-2"*/}
                    {/*        type="date"*/}
                    {/*        name="dataAbastecimento"*/}
                    {/*        value={updatedVeiculo.dataAbastecimento}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>Ultimo Balanceamento:</label>*/}
                    {/*    <input*/}
                    {/*        className="form-control mb-2"*/}
                    {/*        type="date"*/}
                    {/*        name="dataBalanceamento"*/}
                    {/*        value={updatedVeiculo.dataBalanceamento}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <label>Marca:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="marca"
                            value={updatedVeiculo.marca}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Modelo:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="modelo"
                            value={updatedVeiculo.modelo}
                            onChange={handleChange}
                        />
                    </div>
                    {/*<div>*/}
                    {/*    <label>Preço do abastecimento:</label>*/}
                    {/*    <input*/}
                    {/*        className="form-control mb-2"*/}
                    {/*        type="text"*/}
                    {/*        name="precoAbastecimento"*/}
                    {/*        value={updatedVeiculo.precoAbastecimento}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>Quilometragem:</label>*/}
                    {/*    <input*/}
                    {/*        className="form-control mb-2"*/}
                    {/*        type="number"*/}
                    {/*        name="quilometragem"*/}
                    {/*        value={updatedVeiculo.quilometragem}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <div>
                        <label>Placa:</label>
                        <input
                            className="form-control mb-2"
                            type="text"
                            name="placa"
                            value={updatedVeiculo.placa}
                            onChange={handleChange}
                        />
                    </div>
                    {/*<div>*/}
                    {/*    <label>Observação:</label>*/}
                    {/*    <input*/}
                    {/*        className="form-control mb-2"*/}
                    {/*        type="text"*/}
                    {/*        name="observacao"*/}
                    {/*        value={updatedVeiculo.observacao}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <label>Para Consertar:</label>*/}
                    {/*    <input*/}
                    {/*        className="form-control mb-2"*/}
                    {/*        type="text"*/}
                    {/*        name="paraConsertar"*/}
                    {/*        value={updatedVeiculo.paraConsertar}*/}
                    {/*        onChange={handleChange}*/}
                    {/*    />*/}
                    {/*</div>*/}

                    <button type="submit">Salvar</button>
                </Form>
            </Modal.Body>
        </Modal >
    );
}

export default EditarVeiculo;