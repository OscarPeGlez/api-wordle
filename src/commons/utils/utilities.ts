import { ResultAttempInterface } from '../interfaces/resultAttemp.interface';

export default class Utilities {
  static getResultAttemp(userWord: string, currentWord: string): Array<ResultAttempInterface> {
    const response: ResultAttempInterface[] = [];

    // Recorrer la palabra del usuario
    for (let i = 0; i < userWord.length; i += 1) {
      // Valida si la letra coincide en la misma posicion de la solución
      if (userWord[i] === currentWord[i]) {
        response.push({
          letter: userWord[i],
          value: 1,
        });
      }

      // Valida si la letra esta parcialmente en la solución
      if (userWord[i] !== currentWord[i] && currentWord.includes(userWord[i])) {
        response.push({
          letter: userWord[i],
          value: 2,
        });
      }

      // valida que la letra existe en la solucion
      if (!currentWord.includes(userWord[i])) {
        response.push({
          letter: userWord[i],
          value: 3,
        });
      }
    }
    return response;
  }
}
