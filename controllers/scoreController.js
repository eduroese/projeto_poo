export default class ScoreController {
  constructor(teste) {
    this.teste = teste;
  }

  calcularPontos() {
    const riasec = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };

    this.teste.perguntas.forEach((pergunta, indice) => {
      const resposta = this.teste.respostas[indice];
      if (resposta !== null) {
        riasec[pergunta.perfil] += resposta;
      }
    });
    return riasec;
  }

  obterPerfis() {
    const resultado = this.calcularPontos();
    const ordem = Object.entries(resultado).sort((a, b) => b[1] - a[1]);
    return [ordem[0][0], ordem[1][0]];
  }

  verificaRespostas1() {
    return this.teste.respostas.every((resposta) => resposta === 1);
  }

  verificaRespostasParecidas() {
    const resultado = this.calcularPontos();
    const valores = Object.values(resultado);
    const maior = Math.max(...valores);
    const menor = Math.min(...valores);
    return maior - menor <= 3;
  }

  obterRankingCompleto() {
    return Object.entries(this.calcularPontos()).sort((a, b) => b[1] - a[1]);
  }
}
