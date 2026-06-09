export default class RenderController {
  constructor(teste, scoreController) {
    this.teste = teste;
    this.scoreController = scoreController;
    this.questionController = null;
    this.telaInicial = document.getElementById("tela-inicial");
    this.telaPerguntas = document.getElementById("tela-perguntas");
    this.telaRound2 = document.getElementById("tela-round2");
    this.telaResultado = document.getElementById("tela-resultado");
    this.numeroPergunta = document.getElementById("numero-pergunta");
    this.totalPerguntas = document.getElementById("total-perguntas");
    this.textoPergunta = document.getElementById("texto-pergunta");
    this.opcoesContainer = document.getElementById("opcoes-container");
    this.avisoSelecao = document.getElementById("aviso-selecao");
    this.botaoAnterior = document.getElementById("botao-anterior");
    this.botaoProximo = document.getElementById("botao-proximo");
    this.barraProgresso = document.getElementById("barra-progresso");
    this.configurarModal()
  }

  setQuestionController(questionController) {
    this.questionController = questionController;
  }

  mostrarTela(tela) {
    [
      this.telaInicial,
      this.telaPerguntas,
      this.telaRound2,
      this.telaResultado,
    ].forEach((item) => item.classList.remove("ativa"));
    tela.classList.add("ativa");
  }

  atualizarBarraProgresso() {
    if (!this.barraProgresso) {
      return;
    }

    const percentual =
      ((this.teste.indiceAtual + 1) / this.teste.perguntas.length) * 100;
    this.barraProgresso.value = percentual;
  }

  renderizarPergunta() {
    const pergunta = this.teste.perguntas[this.teste.indiceAtual];
    this.numeroPergunta.textContent = `Pergunta ${this.teste.indiceAtual + 1}`;
    this.totalPerguntas.textContent = `de ${this.teste.perguntas.length}`;
    this.textoPergunta.textContent = pergunta.texto;
    this.opcoesContainer.innerHTML = "";
    this.avisoSelecao.classList.remove("visivel");
    const respostas =
      this.teste.fase === 1
        ? this.teste.respostasRound1
        : this.teste.respostasRound2;
    this.teste.opcoes.forEach((opcao) => {
      const label = document.createElement("label");
      label.classList.add("opcao-label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "resposta";
      radio.value = opcao.value;
      radio.checked = respostas[this.teste.indiceAtual] === opcao.value;
      radio.addEventListener("change", () =>
        this.questionController.selecionarOpcao(opcao.value),
      );
      if (radio.checked) {
        label.classList.add("selecionada");
      }
      const span = document.createElement("span");
      span.textContent = opcao.texto;
      label.appendChild(radio);
      label.appendChild(span);
      this.opcoesContainer.appendChild(label);
    });
    this.botaoAnterior.disabled = this.teste.indiceAtual === 0;
    this.botaoProximo.textContent =
      this.teste.indiceAtual === this.teste.perguntas.length - 1
        ? this.teste.fase === 1
          ? "Ver Perfis"
          : "Ver Resultado"
        : "Próxima";
    this.atualizarBarraProgresso();
  }

  exibirResultadoParcial() {
    const container = document.getElementById("resultado-round1");
    container.innerHTML = "";
    const perfis = this.scoreController.obterTop2Perfis();
    perfis.forEach((perfil) => {
      const area = this.teste.areas[perfil];
      container.innerHTML += `
                    <div class="area-card">

                        <h3>
                            ${area.perfil}
                        </h3>

                        <p>
                            ${area.descricao}
                        </p>

                    </div>
                    `;
    });
    this.mostrarTela(this.telaRound2);
  }

  exibirResultadoFinal() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
    const perfil = this.scoreController.obterPerfilFinal();
    const area = this.teste.areas[perfil];
    resultado.innerHTML = `
        <div class="area-card">

            <h2>
                ${area.nome}
            </h2>

            <p>
                ${area.descricao}
            </p>

            <button
                id="btn-mais-informacoes"
                class="botao-primario">

                Mais informações sobre a área

            </button>

        </div>
    `;
    const botaoMaisInfo = document.getElementById("btn-mais-informacoes");
    botaoMaisInfo.addEventListener("click", () => this.abrirModalArea(area));
    this.mostrarTela(this.telaResultado);
  }

  abrirModalArea(area) {
    const modal = document.getElementById("modal-area");
    const conteudo = document.getElementById("modal-area-conteudo");
    conteudo.innerHTML = `
        <h2>
            ${area.nome}
        </h2>

        <p>
            ${area.descricao}
        </p>

        <h3>
            Faixa salarial
        </h3>

        <p>
            ${area.salario}
        </p>

        <h3>
            Possíveis cargos
        </h3>

        <ul>
            ${area.cargos.map((cargo) => `<li>${cargo}</li>`).join("")}
        </ul>

        <h3>
            O que estudar
        </h3>

        <ul>
            ${area.formacao.map((item) => `<li>${item}</li>`).join("")}
        </ul>
    `;
    modal.classList.add("ativo");
  }

  configurarModal() {
    const modal = document.getElementById("modal-area");
    const fechar = document.getElementById("fechar-modal");
    if (!modal || !fechar) {
      return;
    }
    fechar.addEventListener("click", () => modal.classList.remove("ativo"));
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("ativo");
      }
    });
  }
}