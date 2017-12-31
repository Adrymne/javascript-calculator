import { NUM } from './types';

const operators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b
};

const parse = ({ type, value }) => (type === NUM ? parseFloat(value) : value);

export default tokens => {
  const [a, op, b] = tokens.map(parse);
  return operators[op] ? operators[op](a, b) : a;
};
