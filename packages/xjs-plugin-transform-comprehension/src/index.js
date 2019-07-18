import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

const isUnderscore = (node) => t.isIdentifier(node) && (node.name === '_');

// called from the end to the front so the call recursion approaches the
// innermost loop and the actual push.
//
// returns [ preinits, for ]
const rewriteLoop = (path, idx, push) => {
  const node = path.node.loops[idx];
  const isArray = (node.operator === 'in');

  // generate our own pre-loop inits that will go up one level after return.
  const lenIdentifier = path.scope.generateUidIdentifierBasedOnNode(push, 'l');
  let keysIdentifier; // := Object.keys(node.right);  // only used for objs
  let preinits;
  if (isArray) {
    preinits = [
      t.variableDeclarator(
        lenIdentifier, t.memberExpression(node.right, t.identifier('length')))
    ];
  } else { // is object:
    keysIdentifier = path.scope.generateUidIdentifierBasedOnNode(push, 'ks');
    preinits = [
      t.variableDeclarator(
        keysIdentifier, t.callExpression(
          t.memberExpression(t.identifier('Object'), t.identifier('keys')),
          [ node.right ]
        )
      ),
      t.variableDeclarator(
        lenIdentifier, t.memberExpression(keysIdentifier, t.identifier('length'))
      ),
    ];
  }

  // we have all our aboveloop stuff set up so now we focus on inner loop concerns,
  // where we will generate the bindings that are used either by the inner loop
  // or by the final calc/push expr.
  let indexIdentifier;
  let loopinits;
  if (isArray) {                        // v, k in []
    indexIdentifier = node.ikey
      || path.scope.generateUidIdentifierBasedOnNode(push, 'i');
    loopinits = [
      t.variableDeclarator( // v = arr[k]
        node.ival,
        t.memberExpression(node.right, indexIdentifier, true),
      ),
    ];
  } else {                              // is obj
    indexIdentifier = path.scope.generateUidIdentifierBasedOnNode(push, 'i');

    if (isUnderscore(node.ival)) {      // _, k of {}
      if ((node.ikey == null) || isUnderscore(node.ikey))
        this.raise('invalid for parameters');

      loopinits = [
        t.variableDeclarator( // k = ks[i]
          node.ikey, t.memberExpression(keysIdentifier, indexIdentifier, true)),
      ];
    } else if ((node.ikey == null) || isUnderscore(node.ikey)) {
      loopinits = [                     // v of {}
        t.variableDeclarator( // v = obj[ks[k]]
          node.ival, t.memberExpression(node.right,
            t.memberExpression(keysIdentifier, indexIdentifier, true), true)),
      ];
    } else {                            // k, v of {}
      loopinits = [
        t.variableDeclarator( // k = ks[i]
          node.ikey, t.memberExpression(keysIdentifier, indexIdentifier, true)),
        t.variableDeclarator( // v = obj[k]
          node.ival, t.memberExpression(node.right, node.ikey, true)),
      ];
    }
  }

  // recurse to figure out what our inner loop wants for its on pre-loop inits.
  const [ innerPreinits, loopExec ] = (idx === 0)
    ? [ [], push ]
    : rewriteLoop(path, idx - 1, push);

  // we got our loop body earlier but now we maybe wrap it with a maybe.
  const loopMaybeExec = (node.test == null)
    ? loopExec
    : t.ifStatement(node.test, loopExec);

  return [
    preinits,
    t.forStatement(
      t.variableDeclaration('let', [
        t.variableDeclarator(indexIdentifier, t.numericLiteral(0))
      ]),
      t.binaryExpression('<', indexIdentifier, lenIdentifier),
      t.updateExpression('++', indexIdentifier),
      t.blockStatement([
        t.variableDeclaration('const', loopinits.concat(innerPreinits)),
        loopMaybeExec
      ]),
    ),
  ];
};

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-comprehension",

    visitor: {
      ArrayComprehensionExpression: {
        exit(path) {
          const { node } = path;
          const calc = (node.body.length === 1)
            ? node.body[0]
            : t.SequenceExpression(node.body);

          const resultIdentifier = path.scope.generateUidIdentifierBasedOnNode(calc, 'r');

          const push = t.expressionStatement(t.callExpression(
            t.memberExpression(resultIdentifier, t.identifier('push')),
            [ calc ]
          ));

          const [ decl, loop ] = rewriteLoop(path, path.node.loops.length - 1, push);

          path.replaceWith(t.callExpression(
            t.arrowFunctionExpression(
              [],
              t.blockStatement([
                t.variableDeclaration('const', [
                  t.variableDeclarator(resultIdentifier, t.arrayExpression()),
                ].concat(decl)),
                loop,
                t.returnStatement(resultIdentifier),
              ]),
            ),
            [],
          ));
        },
      },
    },
  };
});

