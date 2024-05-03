export async function coordinateToAddress(lat, lon) {
	try {
		const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=20&addressdetails=1`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
        }
        
        const data = await response.json();
        if (!data || !data.address) {
            throw new Error('Nenhum endereço encontrado para as coordenadas fornecidas.');
        }

        const address = data.address;
        return address;
    } catch (error) {
        console.error('Erro ao obter endereço:', error);
        return null;
    }
}