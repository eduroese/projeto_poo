export default class TesteVocacional {
    constructor(perguntas, opcoes, areas) {
        this.perguntas = perguntas;
        this.opcoes = opcoes;
        this.areas = areas;
        this.indiceAtual = 0;
        this.respostas = new Array(perguntas.length).fill(null);
    }
}
