import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

// returns [ init, for ]
const rewriteLoop = (path, idx, push) => {
  const node = path.node.loops[idx];

  if (node.operator !== 'in') throw new Error('NYI');

  const indexIdentifier = node.lidx
    || path.scope.generateUidIdentifierBasedOnNode(push, 'i');

  const [ innerDecl, loopExec ] = (idx === 0)
    ? [ null, push ]
    : rewriteLoop(path, idx - 1, push);

  const loopDecls = [
    t.variableDeclarator(
      node.lval,
      t.memberExpression(node.right, indexIdentifier, true),
    ),
  ];
  if (innerDecl != null) loopDecls.push(innerDecl);
  const loopDecl = t.variableDeclaration('const', loopDecls);

  const loopMaybeExec = (node.test == null)
    ? loopExec
    : t.ifStatement(node.test, loopExec);

  const lenIdentifier = path.scope.generateUidIdentifierBasedOnNode(push, 'l');
  const lenDecl = t.variableDeclarator(
    lenIdentifier, t.memberExpression(node.right, t.identifier('length')));

  return [
    lenDecl,
    t.forStatement(
      t.variableDeclaration('let', [
        t.variableDeclarator(indexIdentifier, t.numericLiteral(0))
      ]),
      t.binaryExpression('<', indexIdentifier, lenIdentifier),
      t.updateExpression('++', indexIdentifier),
      t.blockStatement([ loopDecl, loopMaybeExec ]),
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
                  decl,
                ]),
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

