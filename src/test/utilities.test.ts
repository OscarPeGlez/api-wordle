import { ResultAttempInterface } from '../commons/interfaces/resultAttemp.interface';
import Utilities from '../commons/utils/utilities';

const CURRENT_WORD: string = 'abito';

const WORD_TEST_WIN: string = 'abito';
const WORD_TEST_CASE_1: string = 'abaco';
const WORD_TEST_CASE_2: string = 'ahora';
const WORD_TEST_CASE_3: string = 'otros';

const RESPONSE_WIN: ResultAttempInterface[] = [
  {
    letter: 'a',
    value: 1,
  },
  {
    letter: 'b',
    value: 1,
  },
  {
    letter: 'i',
    value: 1,
  },
  {
    letter: 't',
    value: 1,
  },
  {
    letter: 'o',
    value: 1,
  },
];

const RESPONSE_CASE_1: ResultAttempInterface[] = [
  {
    letter: 'a',
    value: 1,
  },
  {
    letter: 'b',
    value: 1,
  },
  {
    letter: 'a',
    value: 2,
  },
  {
    letter: 'c',
    value: 3,
  },
  {
    letter: 'o',
    value: 1,
  },
];

const RESPONSE_CASE_2: ResultAttempInterface[] = [
  {
    letter: 'a',
    value: 1,
  },
  {
    letter: 'h',
    value: 3,
  },
  {
    letter: 'o',
    value: 2,
  },
  {
    letter: 'r',
    value: 3,
  },
  {
    letter: 'a',
    value: 2,
  },
];

const RESPONSE_CASE_3: ResultAttempInterface[] = [
  {
    letter: 'o',
    value: 2,
  },
  {
    letter: 't',
    value: 2,
  },
  {
    letter: 'r',
    value: 3,
  },
  {
    letter: 'o',
    value: 2,
  },
  {
    letter: 's',
    value: 3,
  },
];

describe('Test Utilities', () => {
  test('Test Function getResultAttemp (case 1)', () => {
    const res: ResultAttempInterface[] = Utilities.getResultAttemp(WORD_TEST_CASE_1, CURRENT_WORD);

    expect(res).toEqual(RESPONSE_CASE_1);
  });

  test('Test Function getResultAttemp (case 2)', () => {
    const res: ResultAttempInterface[] = Utilities.getResultAttemp(WORD_TEST_CASE_2, CURRENT_WORD);

    expect(res).toEqual(RESPONSE_CASE_2);
  });

  test('Test Function getResultAttemp (case 3)', () => {
    const res: ResultAttempInterface[] = Utilities.getResultAttemp(WORD_TEST_CASE_3, CURRENT_WORD);

    expect(res).toEqual(RESPONSE_CASE_3);
  });

  test('Test Function getResultAttemp (case win)', () => {
    const res: ResultAttempInterface[] = Utilities.getResultAttemp(WORD_TEST_WIN, CURRENT_WORD);

    expect(res).toEqual(RESPONSE_WIN);
  });
});
