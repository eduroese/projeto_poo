export default class QuestionController {
    constructor(teste, renderController, scoreController) {
        this.teste = teste;
        this.renderController = renderController;
        this.scoreController = scoreController;
        this.opcoesContainer = document.getElementById("opcoes-container");
        this.avisoSelecao = document.getElementById("aviso-selecao");
    }

    selecionarOpcao(valor) {
        if (this.teste.fase === 1) {
            this.teste.respostasRound1[this.teste.indiceAtual] = Number(valor);
        } else {
            this.teste.respostasRound2[this.teste.indiceAtual] = Number(valor);
        }
        this.opcoesContainer
            .querySelectorAll(".opcao-label")
            .forEach((label) => label.classList.remove("selecionada"));
        const radio = this.opcoesContainer.querySelector(`input[value="${valor}"]`);
        if (radio) {
            radio.parentElement.classList.add("selecionada");
        }
        this.avisoSelecao.classList.remove("visivel");
    }

    obterRespostaAtual() {
        return this.teste.fase === 1
            ? this.teste.respostasRound1[this.teste.indiceAtual]
            : this.teste.respostasRound2[this.teste.indiceAtual];
    }

    avancarPergunta() {
        if (this.obterRespostaAtual() === null) {
            this.avisoSelecao.classList.add("visivel");
            return;
        }
        const ultimaPergunta =
            this.teste.indiceAtual === this.teste.perguntas.length - 1;
        if (ultimaPergunta && this.teste.fase === 1) {
            this.renderController.exibirResultadoParcial();
            return;
        }
        if (ultimaPergunta && this.teste.fase === 2) {
            this.renderController.exibirResultadoFinal();

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
        this.teste.reiniciar();
        this.renderController.mostrarTela(this.renderController.telaPerguntas);
        this.renderController.renderizarPergunta();
    }

    iniciarRound2() {
        const perfis = this.scoreController.obterTop2Perfis();
        this.teste.iniciarRound2(perfis);
        this.renderController.mostrarTela(this.renderController.telaPerguntas);
        this.renderController.renderizarPergunta();
    }

    reiniciarTeste() {
        this.teste.reiniciar();
        this.renderController.mostrarTela(this.renderController.telaInicial);
    }
}
