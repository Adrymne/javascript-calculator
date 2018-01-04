import {
  createLanguage,
  seqMap,
  seq,
  regex,
  optWhitespace,
  eof
} from 'parsimmon';

const ADD_OPS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b
};
const MULT_OPS = {
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
  '%': (a, b) => a % b
};

const evaluate = ops => (a, expr) => {
  if (expr.length === 0) {
    return a;
  }
  const [[op, b], ...rest] = expr;
  return evaluate(ops)(ops[op](a, b), rest);
};

/*
Implemented based on the following simplified arithmetic grammar:
<expr>  ::= <expr> <addop> <term> | <term>
<term>  ::= <term> <multop> <num> | <num>
<num>   ::= <digit> <num> | <digit>
<digit> ::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "."
<addop> ::= "+" | "-"
<multop> ::= "*" | "/" | "%"

Which is then modified to remove left-recursion:
<expr>  ::= <term> <expr'> eoi | <term> eoi
<expr'> ::= <addop> <term> <expr'>
<term>  ::= <num> <term'> | <num>
<term'> ::= <multop> <num> <term'>
(Rest as before)
*/

const arithmetic = createLanguage({
  expr: r => seqMap(r.term, r.eRest, evaluate(ADD_OPS)).skip(eof),
  eRest: r => seq(r.addOp, r.term).many(),
  term: r => seqMap(r.num, r.tRest, evaluate(MULT_OPS)),
  tRest: r => seq(r.multOp, r.num).many(),
  num: () => regex(/[0-9.]+/).map(parseFloat),
  addOp: () => regex(/[+-]/).trim(optWhitespace),
  multOp: () => regex(/[*/%]/).trim(optWhitespace)
});

export default str => arithmetic.expr.tryParse(str);
