import test from 'tape';
import { mutations as sut, NUM, OP } from './store';

test('pushOperator', t => {
  const subject = sut.pushOperator;
  const store = {
    expression: [],
    current: '28.1'
  };

  subject(store, '*');

  t.deepEqual(store, {
    expression: [{ type: NUM, value: 28.1 }, { type: OP, value: '*' }],
    current: ''
  });
  t.end();
});
