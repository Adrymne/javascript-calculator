import test from 'tape';
import { mutations as sut, Value } from './store';

test('inputNum', tape => {
  const subject = sut.inputNum;
  tape.test('current :: None', t => {
    const store = { current: Value.None };

    subject(store, '2');

    t.deepEqual(store, { current: Value.Input('2') });
    t.end();
  });

  tape.test('current :: Result', t => {
    const store = { current: Value.Result(3) };

    subject(store, '4');

    t.deepEqual(store, { current: Value.Input('4') });
    t.end();
  });

  tape.test('current :: Input', t => {
    const store = { current: Value.Input('28.1') };

    subject(store, '2');

    t.deepEqual(store, { current: Value.Input('28.12') });
    t.end();
  });

  tape.test('only allow 1 decimal dot', t => {
    const store = { current: Value.Input('28.1') };

    subject(store, '.');

    t.deepEqual(store, { current: Value.Input('28.1') });
    t.end();
  });

  tape.end();
});

test('pushOperator', tape => {
  const subject = sut.pushOperator;

  tape.test('curent :: None', t => {
    const store = { expression: [], current: Value.None };

    subject(store, '-');

    t.deepEqual(store, { expression: ['0', '-'], current: Value.None });
    t.end();
  });

  tape.test('current :: Result', t => {
    const store = {
      expression: [],
      current: Value.Result(3)
    };

    subject(store, '*');

    t.deepEqual(store, {
      expression: ['3', '*'],
      current: Value.None
    });
    t.end();
  });

  tape.test('current :: Input', t => {
    const store = {
      expression: [],
      current: Value.Input('28.1')
    };

    subject(store, '+');

    t.deepEqual(store, {
      expression: ['28.1', '+'],
      current: Value.None
    });
    t.end();
  });

  tape.test('non-empty expression', t => {
    const store = {
      expression: ['28.1', '*'],
      current: Value.Input('3')
    };

    subject(store, '+');

    t.deepEqual(store, {
      expression: ['28.1', '*', '3', '+'],
      current: Value.None
    });
    t.end();
  });

  tape.end();
});

test('clearAll', t => {
  const subject = sut.clearAll;
  const store = {
    expression: ['25', '+'],
    current: Value.Input('33')
  };

  subject(store);

  t.deepEqual(store, {
    expression: [],
    current: Value.None
  });
  t.end();
});

test('clearEntry', tape => {
  const subject = sut.clearEntry;

  tape.test('current :: None', t => {
    const store = {
      expression: ['25', '+'],
      current: Value.None
    };

    subject(store);

    t.deepEqual(store, {
      expression: ['25', '+'],
      current: Value.None
    });
    t.end();
  });

  tape.test('current :: Input', t => {
    const store = {
      expression: ['25', '+'],
      current: Value.Input('32')
    };

    subject(store);

    t.deepEqual(store, {
      expression: ['25', '+'],
      current: Value.None
    });
    t.end();
  });

  tape.end();
});

test('evaluate', tape => {
  const subject = sut.evaluate;

  tape.test('current :: None', t => {
    const store = {
      expression: ['5', '*'],
      current: Value.None
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: Value.Result(25)
    });
    t.end();
  });

  tape.test('current :: None, no expression', t => {
    const store = {
      expression: [],
      current: Value.None
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: Value.Result(0)
    });
    t.end();
  });

  tape.test('current :: Result', t => {
    const store = {
      expression: ['3', '+'],
      current: Value.Result(2)
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: Value.Result(5)
    });
    t.end();
  });

  tape.test('current :: Input', t => {
    const store = {
      expression: ['25', '*'],
      current: Value.Input('3')
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: Value.Result(75)
    });
    t.end();
  });

  tape.test('no expression', t => {
    const store = {
      expression: [],
      current: Value.Result(71)
    };

    subject(store);

    t.deepEqual(store, {
      expression: [],
      current: Value.Result(71)
    });
    t.end();
  });

  tape.end();
});
