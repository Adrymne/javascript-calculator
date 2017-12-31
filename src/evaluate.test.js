import test from 'tape';
import evaluate from './evaluate';
import { NUM, OP } from './store';

test('evaluate', t => {
  const subject = evaluate;
  const tokens = [
    { type: NUM, value: '25' },
    { type: OP, value: '/' },
    { type: NUM, value: '2' }
  ];

  const result = subject(tokens);

  t.equal(result, 12.5);
  t.end();
});
