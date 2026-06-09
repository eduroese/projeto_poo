import TesteVocacional from "./models/TesteVocacional.js";
import DataService from "./services/DataService.js";
import RenderController from "./controllers/RenderController.js";
import ScoreController from "./controllers/ScoreController.js";
import QuestionController from "./controllers/QuestionController.js";

async function iniciar() {
  try {
    const perguntas = await DataService.carregarPerguntas();
    const areas = await DataService.carregarAreas();
    const opcoes = await DataService.carregarOpcoes();
    const teste = new TesteVocacional(perguntas, opcoes, areas);
    const scoreController = new ScoreController(teste);
    const renderController = new RenderController(teste, scoreController);
    const questionController = new QuestionController(teste, renderController);
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
  } catch (erro) {
    console.error("Erro ao iniciar aplicação:", erro);

    alert("Erro ao carregar os dados do teste.");
  }
}

iniciar();
