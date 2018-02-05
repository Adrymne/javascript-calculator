import test from 'tape';
import { mutations as sut } from './store';

test('inputNum', tape => {
  const subject = sut.inputNum;

  tape.test('input num', t => {
    const store = { current: '28.1' };

    subject(store, '2');

    t.deepEqual(store, { current: '28.12' });
    t.end();
  });

  tape.test('only allow 1 decimal dot', t => {
    const store = {
      current: '28.1'
    };

    subject(store, '.');

    t.deepEqual(store, {
      current: '28.1'
    });
    t.end();
  });

  tape.end();
});

test('pushOperator', tape => {
  const subject = sut.pushOperator;

  tape.test('empty current, empty result', t => {
    const store = {
      expression: [],
      current: '',
      result: ''
    };

    subject(store, '-');

    t.deepEqual(store, {
      expression: ['0', '-'],
      current: '',
      result: ''
    });
    t.end();
  });

  tape.test('empty expression, current exists', t => {
    const store = {
      expression: [],
      current: '28.1',
      result: ''
    };

    subject(store, '*');

    t.deepEqual(store, {
      expression: ['28.1', '*'],
      current: '',
      result: ''
    });
    t.end();
  });

  tape.test('empty expression, current empty, result exists', t => {
    const store = {
      expression: [],
      current: '',
      result: '3'
    };

    subject(store, '+');

    t.deepEqual(store, {
      expression: ['3', '+'],
      current: '',
      result: ''
    });
    t.end();
  });

  tape.test('non-empty expression', t => {
    const store = {
      expression: ['28.1', '*'],
      current: '3',
      result: '1'
    };

    subject(store, '+');

    t.deepEqual(store, {
      expression: ['28.1', '*', '3', '+'],
      current: '',
      result: ''
    });
    t.end();
  });

  tape.end();
});

test('clearAll', t => {
  const subject = sut.clearAll;
  const store = {
    expression: ['25', '+'],
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
      expression: ['25', '+'],
      current: '32'
    };

    subject(store);

    t.deepEqual(store, {
      expression: ['25', '+'],
      current: ''
    });
    t.end();
  });

  tape.test('expression exists, no current', t => {
    const store = {
      expression: ['25', '+'],
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

test('evaluate', tape => {
  const subject = sut.evaluate;

  tape.test('expression exists', t => {
    const store = {
      expression: ['25', '*'],
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

  tape.test('no current (assume 0)', t => {
    const store = {
      expression: ['5', '*'],
      current: ''
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: '0'
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
