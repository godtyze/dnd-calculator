import {operations} from '../constants';
import {division, multiply, subtraction, sum} from './index';
import {OperationType} from '../models';

export const calculate = (a: number, b: number, operation: OperationType): number => {
  let result = 0;

  switch (operation) {
    case operations.sum:
      result = sum(a, b);
      break;
    case operations.subtraction:
      result = subtraction(a, b);
      break;
    case operations.multiply:
      result = multiply(a, b);
      break;
    case operations.division:
      result = division(a, b);
      break;
  }

  return result;
};