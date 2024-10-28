const apiBaseUrl = `${window.location.protocol}//${window.location.hostname}:7042/api/Consignado`;

export const fetchConsignados = async () => {
    const response = await fetch(`${apiBaseUrl}`);
    return response.json();
};

export const addConsignado = async (newEquipamento) => {
    const response = await fetch(`${apiBaseUrl}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEquipamento),
    });
    return response.ok ? response.json() : null;
};

export const concluirConsignado = async (equipamento) => {
    const updatedEquipamento = { ...equipamento, status: 'Concluído' };
    const response = await fetch(`${apiBaseUrl}/${equipamento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEquipamento),
    });
    return response.ok;
};

export const editarConsignado = async (updatedEquipamento) => {
    const response = await fetch(`${apiBaseUrl}/${updatedEquipamento.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEquipamento),
    });
    return response.ok;
};

export const deletarConsignado = async (equipamento) => {
    const response = await fetch(`${apiBaseUrl}/${equipamento.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return response.ok;
};