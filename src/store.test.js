import test from 'tape';
import { NUM, OP } from './types';
import { mutations as sut } from './store';

test('pushOperator', t => {
  const subject = sut.pushOperator;
  const store = {
    expression: [],
    current: '28.1'
  };

  subject(store, '*');

  t.deepEqual(store, {
    expression: [{ type: NUM, value: '28.1' }, { type: OP, value: '*' }],
    current: ''
  });
  t.end();
});

test('clearAll', t => {
  const subject = sut.clearAll;
  const store = {
    expression: [{ type: NUM, value: '25' }, { type: OP, value: '+' }],
    current: '32'
  };

  subject(store);

  t.deepEqual(store, {
    expression: [],
    current: ''
  });
  t.end();
});

test('clearEntry', tape => {
  const subject = sut.clearEntry;

  tape.test('no expression, current exists', t => {
    const store = {
      expression: [],
      current: '25'
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: ''
    });
    t.end();
  });

  tape.test('expression exists, current exists', t => {
    const store = {
      expression: [{ type: NUM, value: '25' }, { type: OP, value: '+' }],
      current: '32'
    };

    subject(store);

    t.deepEqual(store, {
      expression: [{ type: NUM, value: '25' }, { type: OP, value: '+' }],
      current: ''
    });
    t.end();
  });

  tape.test('expression exists, no current', t => {
    const store = {
      expression: [{ type: NUM, value: '25' }, { type: OP, value: '+' }],
      current: ''
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: '25'
    });
    t.end();
  });

  tape.test('no expression, no current', t => {
    const store = {
      expression: [],
      current: ''
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: ''
    });
    t.end();
  });

  tape.end();
});

test.skip('evaluate', tape => {
  const subject = sut.evaluate;

  tape.test('expression exists', t => {
    const store = {
      expression: [{ type: NUM, value: '25' }, { type: OP, value: '*' }],
      current: '3'
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: '75'
    });
    t.end();
  });

  tape.test('no expression', t => {
    const store = {
      expression: [],
      current: '71'
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: '71'
    });
    t.end();
  });

  tape.end();
});

test('prepareNext', t => {
  const subject = sut.prepareNext;
  const store = {
    expression: [],
    current: '5',
    result: 0
  };

  subject(store);

  t.deepEqual(store, {
    expression: [],
    current: '',
    result: '5'
  });
  t.end();
});
