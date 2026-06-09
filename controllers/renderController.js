export default class RenderController {
  constructor(teste, scoreController) {
    this.teste = teste;
    this.scoreController = scoreController;
    this.questionController = null;
    this.telaInicial = document.getElementById("tela-inicial");
    this.telaPerguntas = document.getElementById("tela-perguntas");
    this.telaResultado = document.getElementById("tela-resultado");
    this.numeroPergunta = document.getElementById("numero-pergunta");
    this.totalPerguntas = document.getElementById("total-perguntas");
    this.textoPergunta = document.getElementById("texto-pergunta");
    this.opcoesContainer = document.getElementById("opcoes-container");
    this.avisoSelecao = document.getElementById("aviso-selecao");
    this.botaoAnterior = document.getElementById("botao-anterior");
    this.botaoProximo = document.getElementById("botao-proximo");
    this.barraProgresso = document.getElementById("barra-progresso");
  }

  setQuestionController(questionController) {
    this.questionController = questionController;
  }

  mostrarTela(tela) {
    [this.telaInicial, this.telaPerguntas, this.telaResultado].forEach((t) =>
      t.classList.remove("ativa"),
    );
    tela.classList.add("ativa");
  }

  atualizarBarraProgresso() {
    if (!this.barraProgresso) {
      return;
    }
    const percentual =
      ((this.teste.indiceAtual + 1) / this.teste.perguntas.length) * 100;
    this.barraProgresso.style.width = `${percentual}%`;
  }

  renderizarPergunta() {
    const pergunta = this.teste.perguntas[this.teste.indiceAtual];
    this.numeroPergunta.textContent = `Pergunta ${this.teste.indiceAtual + 1}`;
    this.totalPerguntas.textContent = `de ${this.teste.perguntas.length}`;
    this.textoPergunta.textContent = pergunta.texto;
    this.opcoesContainer.innerHTML = "";
    this.avisoSelecao.classList.remove("visivel");
    this.teste.opcoes.forEach((opcao) => {
      const label = document.createElement("label");
      label.classList.add("opcao-label");
      if (this.teste.respostas[this.teste.indiceAtual] === opcao.value) {
        label.classList.add("selecionada");
      }
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "resposta";
      radio.value = opcao.value;
      radio.checked =
        this.teste.respostas[this.teste.indiceAtual] === opcao.value;
      radio.addEventListener("change", () =>
        this.questionController.selecionarOpcao(opcao.value),
      );
      const span = document.createElement("span");
      span.textContent = opcao.texto;
      label.appendChild(radio);
      label.appendChild(span);
      this.opcoesContainer.appendChild(label);
    });
    this.botaoAnterior.disabled = this.teste.indiceAtual === 0;
    this.botaoProximo.textContent =
      this.teste.indiceAtual === this.teste.perguntas.length - 1
        ? "Ver Resultado"
        : "Próxima";
    this.atualizarBarraProgresso();
  }

  exibirResultado() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    if (this.scoreController.verificaRespostas1()) {
      resultado.innerHTML = `
                <p>
                    Parece que você não se identificou
                    com as atividades apresentadas.
                    <br>
                    Talvez você ainda esteja descobrindo
                    seus interesses.
                </p>
            `;
      this.mostrarTela(this.telaResultado);
      return;
    }
    if (this.scoreController.verificaRespostasParecidas()) {
      resultado.innerHTML = `
                <p>
                    Suas respostas ficaram bastante
                    equilibradas entre os perfis.
                    Isso indica interesses variados
                    dentro da tecnologia.
                </p>
            `;
      this.mostrarTela(this.telaResultado);
      return;
    }
    const perfis = this.scoreController.obterPerfis();
    perfis.forEach((perfil) => {
      resultado.innerHTML += `
                    <div class="area-card">
                        <h3>
                            ${this.teste.areas[perfil].nome}
                        </h3>

                        <p>
                            ${this.teste.areas[perfil].descricao}
                        </p>
                    </div>
                `;
    });
    this.mostrarTela(this.telaResultado);
  }
}