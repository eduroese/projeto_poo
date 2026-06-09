export default class TesteVocacional {
    constructor(perguntasRound1, perguntasRound2, opcoes, areas) {
        this.perguntasRound1 = perguntasRound1;

        this.perguntasRound2 = perguntasRound2;

        this.opcoes = opcoes;

        this.areas = areas;

        this.fase = 1;

        this.indiceAtual = 0;

        this.perfisSelecionados = [];

        this.perguntasAtuais = [...perguntasRound1];

        this.respostasRound1 = new Array(perguntasRound1.length).fill(null);

        this.respostasRound2 = [];

        this.resultadoFinal = null;
    }

    get respostas() {
        return this.fase === 1 ? this.respostasRound1 : this.respostasRound2;
    }

    get perguntas() {
        return this.perguntasAtuais;
    }

    iniciarRound2(perfisSelecionados) {
        this.fase = 2;

        this.perfisSelecionados = perfisSelecionados;

        this.perguntasAtuais = this.perguntasRound2.filter((pergunta) =>
            perfisSelecionados.includes(pergunta.perfil),
        );

        this.indiceAtual = 0;

        this.respostasRound2 = new Array(this.perguntasAtuais.length).fill(null);
    }

    reiniciar() {
        this.fase = 1;

        this.indiceAtual = 0;

        this.perfisSelecionados = [];

        this.perguntasAtuais = [...this.perguntasRound1];

        this.respostasRound1 = new Array(this.perguntasRound1.length).fill(null);

        this.respostasRound2 = [];

        this.resultadoFinal = null;
    }
}
