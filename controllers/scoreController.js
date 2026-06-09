export default class ScoreController {
  constructor(teste) {
    this.teste = teste;
  }

  calcularPontosRound1() {
    const riasec = {
      R: 0,
      I: 0,
      A: 0,
      S: 0,
      E: 0,
      C: 0,
    };

    this.teste.perguntasRound1.forEach((pergunta, indice) => {
      const resposta = this.teste.respostasRound1[indice];
      if (resposta !== null) {
        riasec[pergunta.perfil] += resposta;
      }
    });
    return riasec;
  }

  obterTop2Perfis() {
    const ranking = Object.entries(this.calcularPontosRound1()).sort(
      (a, b) => b[1] - a[1],
    );
    return [ranking[0][0], ranking[1][0]];
  }

  calcularPontosRound2() {
    const resultado = {};
    this.teste.perguntasAtuais.forEach((pergunta, indice) => {
      const resposta = this.teste.respostasRound2[indice];
      if (!resultado[pergunta.perfil]) {
        resultado[pergunta.perfil] = 0;
      }
      resultado[pergunta.perfil] += resposta || 0;
    });
    return resultado;
  }

  obterPerfilFinal() {
    const ranking = Object.entries(this.calcularPontosRound2()).sort(
      (a, b) => b[1] - a[1],
    );
    return ranking[0][0];
  }

  obterDadosPerfilFinal() {
    const perfil = this.obterPerfilFinal();
    return this.teste.areas[perfil];
  }

  verificaRespostas1Round1() {
    return this.teste.respostasRound1.every((resposta) => resposta === 1);
  }

  obterRankingRound1() {
    return Object.entries(this.calcularPontosRound1()).sort(
      (a, b) => b[1] - a[1],
    );
  }
}
