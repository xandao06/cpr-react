//import { useEffect, useState } from 'react';
//import CriarChamado from '../Chamado/Modal/CriarChamado';
//import ConcluirChamado from '../Chamado/Modal/ConcluirChamado';
//import DeletarChamado from '../Chamado/Modal/DeletarChamado';
//import EditarChamado from '../Chamado/Modal/EditarChamado';
//import { Button } from 'react-bootstrap';
//import Table from 'react-bootstrap/Table';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import ChamadoIndex from '../Chamado/View/ChamadoIndex';
//import HistoricoIndex from '../Chamado/View/HistoricoIndex';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//{/* //MEOTODO ADICIONAR CHAMADO/// */ }

//const onAddChamado = async (newChamado) => {
//    const response = await fetch('https://192.168.10.230:7042/api/Chamado', {
//        method: 'POST',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//        body: JSON.stringify(newChamado),

//    });

//    const responseText = await response.text();
//    const data = responseText ? JSON.parse(responseText) : null;

//    if (data) {
//        setChamados([...chamados, data]); // Atualiza a lista de chamados
//        handleCloseCriar(); // Fecha o modal de criação
//        console.log("Chamado adicionado:", data);
//    }

//}

//{/* ///// */ }



//{/* ///METODO CONCLUIR CHAMADO// */ }

//const onConcluirChamado = async (chamado) => {
//    const updatedChamado = { ...chamado, status: 'Concluído' };

//    console.log("Chamado ID:", chamado.id);

//    const response = await fetch(`https://192.168.10.230:7042/api/Chamado/${chamado.id}`, {
//        method: 'PUT',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//        body: JSON.stringify(updatedChamado),

//    });

//    if (response.ok) {
//        // Atualiza a lista removendo o chamado concluído
//        setChamados(chamados.filter(c => c.id !== chamado.id));
//        handleCloseConcluir(); // Fecha o modal de conclusão
//    }
//}

//{/* ///METODO EDITAR CHAMADO// */ }

//const onEditarChamado = async (updatedChamado) => {

//    console.log("Chamado ID:", updatedChamado.id);

//    const response = await fetch(`https://192.168.10.230:7042/api/Chamado/${updatedChamado.id}`, {
//        method: 'PUT',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//        body: JSON.stringify(updatedChamado),

//    });

//    if (response.ok) {
//        // Atualiza a lista removendo o chamado concluído
//        setChamados(chamados.map(c => (c.id === updatedChamado.id ? updatedChamado : c)));
//        handleCloseEditar(); // Fecha o modal de conclusão
//    }
//}

//{/* ///// */ }



//{/* ///METODO DELETAR CHAMADO// */ }

//const onDeletarChamado = async (deletarChamado) => {

//    console.log("Chamado ID:", deletarChamado.id);

//    const response = await fetch(`https://192.168.10.230:7042/api/Chamado/${deletarChamado.id}`, {
//        method: 'DELETE',
//        headers: {
//            'Content-Type': 'application/json',
//        },
//        body: JSON.stringify(deletarChamado),

//    });

//    if (response.ok) {
//        // Atualiza a lista removendo o chamado concluído
//        setChamados(chamados.filter(c => c.id !== deletarChamado.id));
//        handleCloseDeletar(); // Fecha o modal de conclusão
//    }
//}

//{/* ///// */ }







//export default ChamadoService