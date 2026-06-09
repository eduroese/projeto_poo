export default class QuestionController {
    constructor(teste, renderController) {
        this.teste = teste;
        this.renderController = renderController;
        this.opcoesContainer = document.getElementById("opcoes-container");
        this.avisoSelecao = document.getElementById("aviso-selecao");
    }

    selecionarOpcao(valor) {
        this.teste.respostas[this.teste.indiceAtual] = Number(valor);
        this.opcoesContainer
            .querySelectorAll(".opcao-label")
            .forEach((label) => label.classList.remove("selecionada"));
        const radio = this.opcoesContainer.querySelector(`input[value="${valor}"]`);
        if (radio) {
            radio.parentElement.classList.add("selecionada");
        }
        this.avisoSelecao.classList.remove("visivel");
    }

    avancarPergunta() {
        if (this.teste.respostas[this.teste.indiceAtual] === null) {
            this.avisoSelecao.classList.add("visivel");

            return;
        }
        if (this.teste.indiceAtual === this.teste.perguntas.length - 1) {
            this.renderController.exibirResultado();
            return;
        }
        this.teste.indiceAtual++;
        this.renderController.renderizarPergunta();
    }

    voltarPergunta() {
        if (this.teste.indiceAtual <= 0) {
            return;
        }
        this.teste.indiceAtual--;
        this.renderController.renderizarPergunta();
    }

    iniciarTeste() {
        this.teste.indiceAtual = 0;
        this.teste.respostas = new Array(this.teste.perguntas.length).fill(null);
        this.renderController.renderizarPergunta();
        this.renderController.mostrarTela(this.renderController.telaPerguntas);
    }

    reiniciarTeste() {
        this.teste.indiceAtual = 0;
        this.teste.respostas = new Array(this.teste.perguntas.length).fill(null);
        this.renderController.mostrarTela(this.renderController.telaInicial);
    }
}
