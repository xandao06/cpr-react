const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:7042/api/Consignado`;


{/* //BUSCA DE CONSIGNADOS// */ }

export const fetchConsignados = async () => {
    const response = await fetch(`${apiBaseUrl}`);
    return response.json();
};

{/* //ADICIONAR CONSIGNADO// */ }

export const addConsignado = async (newEquipamento) => {
    const response = await fetch(`${apiBaseUrl}/AddConsignado`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEquipamento),
    });
    return response.ok ? response.json() : null;
};

{/* //CONCLUIR CONSIGNADO// */ }

export const concluirConsignado = async (equipamento) => {
    const updatedEquipamento = { ...equipamento, status: 'Concluído' };
    const response = await fetch(`${apiBaseUrl}/${equipamento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(equipamento),
    });
    return response.ok;
};

{/* EDITAR CONSIGNADO// */ }

export const editarConsignado = async (updatedEquipamento) => {
    const response = await fetch(`${apiBaseUrl}/${updatedEquipamento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEquipamento),
    });
    return response.ok;
};

{/* DELETAR CONSIGNADO // */ }

export const deletarConsignado = async (equipamento) => {
    const response = await fetch(`${apiBaseUrl}/${equipamento.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
};

{/* //FUNÇÃO QUE FORMATA DECIMAL EM R$// */ }

export const formatarPreco = (valor) => {
    if (valor === null || valor === undefined) return "R$0,00";

    return `R$${valor.toFixed(2).replace(".", ",")}`;
};

{/* ///// */ }


export const gerarPdf = async (id) => {
    try {
        const response = await fetch(`${apiBaseUrl}/gerar-pdf/${id}`, {
            method: "GET",
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `relatorio.pdf`;
        link.click();
    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
    }
};


//export const gerarPdf = async () => {
//    const response = await fetch(`${apiBaseUrl}/gerar-pdf`);
//    const blob = await response.blob();
//    const url = window.URL.createObjectURL(blob);
//    const a = document.createElement('a');
//    a.href = url;
//    a.download = 'relatorio.pdf';
//    document.body.appendChild(a);
//    a.click();
//    a.remove();
//};