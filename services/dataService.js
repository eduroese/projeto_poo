export default class DataService {
    static async carregarPerguntasRound2() {
        const response = await fetch("./data/perguntasRound2.json");

        if (!response.ok) {
            throw new Error("Erro ao carregar perguntas");
        }

        return await response.json();
    }

    static async carregarPerguntasRound1() {
        const response = await fetch("./data/perguntasRound1.json");

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
