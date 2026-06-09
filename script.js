import TesteVocacional from "./models/testeVocacional.js";
import DataService from "./services/dataService.js";
import RenderController from "./controllers/renderController.js";
import ScoreController from "./controllers/scoreController.js";
import QuestionController from "./controllers/questionController.js";

async function iniciar() {
  try {
    const perguntasRound1 = await DataService.carregarPerguntasRound1();

    const perguntasRound2 = await DataService.carregarPerguntasRound2();

    const areas = await DataService.carregarAreas();

    const opcoes = await DataService.carregarOpcoes();

    const teste = new TesteVocacional(
      perguntasRound1,
      perguntasRound2,
      opcoes,
      areas,
    );

    const scoreController = new ScoreController(teste);

    const renderController = new RenderController(teste, scoreController);

    const questionController = new QuestionController(
      teste,
      renderController,
      scoreController,
    );

    renderController.setQuestionController(questionController);

    document
      .getElementById("botao-comecar")
      .addEventListener("click", () => questionController.iniciarTeste());

    document
      .getElementById("botao-proximo")
      .addEventListener("click", () => questionController.avancarPergunta());

    document
      .getElementById("botao-anterior")
      .addEventListener("click", () => questionController.voltarPergunta());

    document
      .getElementById("botao-refazer")
      .addEventListener("click", () => questionController.reiniciarTeste());

    document
      .getElementById("botao-continuar-round2")
      ?.addEventListener("click", () => questionController.iniciarRound2());
  } catch (erro) {
    console.error(erro);

    alert("Erro ao carregar os dados.");
  }
}

iniciar();
