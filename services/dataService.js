export default class DataService {
    static async carregarPerguntas() {
        const response = await fetch("./data/perguntas.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar perguntas");
        }

        return await response.json();
    }

    static async carregarAreas() {
        const response = await fetch("./data/areas.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar áreas");
        }

        return await response.json();
    }

    static async carregarOpcoes() {
        const response = await fetch("./data/opcoes.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar opções");
        }

        return await response.json();
    }
}
