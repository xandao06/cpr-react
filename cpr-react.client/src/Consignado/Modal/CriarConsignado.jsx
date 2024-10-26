//import React, { useState, useEffect } from 'react';
//import { Modal } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

//function CriarChamado({ show, handleClose, onAddChamado }) {

//    const [newChamado, setNewChamado] = useState({
//        data: '',
//        hora: '',
//        cliente: '',
//        descricao: '',
//        contrato: '',
//        urgencia: '',
//        status: 'Pendente'
//    });

//    const handleInputChange = (e) => {
//        const { name, value } = e.target;
//        setNewChamado(prevState => ({
//            ...prevState,
//            [name]: value
//        }));
//    };

//    useEffect(() => {
//        if (show) { // Apenas preenche quando o modal está visível
//            const currentDate = new Date();
//            const formattedDate = currentDate.toISOString().split('T')[0]; // yyyy-MM-dd
//            const formattedTime = currentDate.toTimeString().split(' ')[0].substring(0, 5); // HH:mm
//            status: 'Pendente'

//            setNewChamado({ // Limpa o formulário
//                data: formattedDate,
//                hora: formattedTime,
//                cliente: '',
//                descricao: '',
//                contrato: '',
//                urgencia: '',
//                status: 'Pendente'
//            });
//        }
//    }, [show]); // Dependência para atualizar quando o modal é exibido

//    const handleSubmit = (e) => {
//        e.preventDefault();
//        onAddChamado(newChamado); // Chama a função para adicionar o chamado
//        handleClose(); // Fecha o modal após o envio
//    };

//    return (
//        <Modal show={show} onHide={handleClose} >
//            <Modal.Header id="modal_criarchamado" closeButton>
//                <Modal.Title>Criar Chamado</Modal.Title>
//            </Modal.Header>
//            <Modal.Body id="modal_criarchamado">
//                <form onSubmit={handleSubmit}>
//                    <div>
//                        <label>Data:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="date"
//                            name="data"
//                            value={newChamado.data}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Hora:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="time"
//                            name="hora"
//                            value={newChamado.hora}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Cliente:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="cliente"
//                            value={newChamado.cliente}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Descrição:</label>
//                        <input
//                            className="form-control mb-2"
//                            type="text"
//                            name="descricao"
//                            value={newChamado.descricao}
//                            onChange={handleInputChange}
//                        />
//                    </div>
//                    <div>
//                        <label>Contrato:</label>
//                        <input
//                            className="form-check-input"
//                            type="radio"
//                            name="contrato"
//                            value={newChamado.contrato, "Sim"}
//                            onChange={handleInputChange}
//                            id="sim"
//                        />
//                        <label id="contrato_label">Sim</label>
//                        <input
//                            className="form-check-input"
//                            type="radio"
//                            name="contrato"
//                            value={newChamado.contrato, "Não"}
//                            onChange={handleInputChange}
//                            id="não"
//                        />
//                        <label id="contrato_label">Não:</label>
//                    </div>
//                    <div>
//                        <label>Urgência:</label>
//                        <input
//                            className="form-check-input"
//                            type="radio"
//                            name="urgencia"
//                            value={newChamado.urgencia, "Baixa"}
//                            onChange={handleInputChange}
//                            id="baixa"
//                        />
//                        <label id="urgencia_label">Baixa:</label>
//                        <input
//                            className="form-check-input"
//                            type="radio"
//                            name="urgencia"
//                            value={newChamado.urgencia, "Média"}
//                            onChange={handleInputChange}
//                            id="media"
//                        />
//                        <label id="urgencia_label">Média:</label>
//                        <input
//                            className="form-check-input"
//                            type="radio"
//                            name="urgencia"
//                            value={newChamado.urgencia, "Alta"}
//                            onChange={handleInputChange}
//                            id="alta"
//                        />
//                        <label id="urgencia_label">Alta:</label>
//                    </div>

//                    <button type="submit">Criar chamado</button>
//                </form>
//            </Modal.Body>
//        </Modal >
//    );
//}

//export default CriarChamado;