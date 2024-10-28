import React, { forwardRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function printModal() {
    const modalContent = document.getElementById('modal_print_consignado').innerHTML; // substitua 'modalId' pelo ID do seu modal
    const printWindow = window.open('', '_blank', 'width=800,height=800'); // Ajuste a largura e altura conforme necessário

    // Configura o conteúdo da nova janela
    printWindow.document.write(`
    <html>
            <head>
                <title>Imprimir Modal</title>
                <style>
                    /* Estilos para a impressão */
                    @media print {
                        /* Define o tamanho da página como metade de uma folha A4 */
                        @page {
                            size: A4 portrait; /* Orientação retrato */
                            margin: 1cm; /* Margens, ajuste conforme necessário */
                        }

                        /* Define o estilo do conteúdo para ocupar metade da página */
                        body {
                            display: flex;
                            height: 30vh;
                            margin: 0;
                            padding: 0;
                        }

                        /* Ajuste o modal para metade do tamanho da folha A4 */
                        .print-content {
                            width: 100%;
                            max-width: 21cm; /* Metade de 21cm (largura da A4) */
                            height: 50%;
                            text-align: center;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="print-content">
                    ${modalContent}
                </div>
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
}

const PrintConsignado = forwardRef(({ showPrintModal, handleClosePrintModal, equipamento }, ref) => (
    <Modal id="modal_print_consignado" show={showPrintModal} onHide={handleClosePrintModal}>
        <Modal.Header closeButton>
            <Modal.Title>Imprimir Consignado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div ref={ref} className="print-section">
                <h3>Detalhes do Consignado</h3>
                <p><strong>Data:</strong> {new Date(equipamento?.data).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> {equipamento?.hora}</p>
                <p><strong>Cliente:</strong> {equipamento?.cliente}</p>
                <p><strong>Contrato:</strong> {equipamento?.contrato}</p>
                <p><strong>Número de Série:</strong> {equipamento?.numeroSerie}</p>
                <p><strong>Tipo:</strong> {equipamento?.tipo}</p>
                <p><strong>Marca:</strong> {equipamento?.marca}</p>
                <p><strong>Modelo:</strong> {equipamento?.modelo}</p>
                <p><strong>Quantidade:</strong> {equipamento?.quantidade}</p>
                <p><strong>Preço:</strong> {equipamento?.preco}</p>
                <p><strong>Descrição:</strong> {equipamento?.descricao}</p>
                <p><strong>Status:</strong> {equipamento?.status}</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePrintModal}>Fechar</Button>
            <Button variant="primary" onClick={() => printModal()}>Imprimir</Button>
        </Modal.Footer>
    </Modal>
));




export default PrintConsignado;