import test from 'tape';
import parse from './evaluate';

test('parse', tape => {
  const subject = parse;

  tape.test('left to right evaluation', t => {
    const result = subject('1 - 4 - 3');

    t.equal(result, -6);
    t.end();
  });

  tape.test('operator precedence', t => {
    const result = subject('2 * 3 * 1.5 - 1 + 5 * 4 / 2');

    t.equal(result, 18);
    t.end();
  });

  tape.test('negative number', t => {
    const result = subject('-2 * 5');

    t.equal(result, -10);
    t.end();
  });

  tape.end();
});
