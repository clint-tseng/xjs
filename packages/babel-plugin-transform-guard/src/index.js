import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-guard",

    visitor: {
      GuardStatement(path) {
        const { node } = path;
        const replacement = [];

        const tests =
          (node.declaration == null) ? [ node.test ] :
          t.isObjectPattern(node.declaration.declarations[0].id)
            ? node.declaration.declarations[0].id.properties.map(prop => prop.key) :
          node.declaration.declarations.map(node => node.id);

        const test = tests.reduce(((rest, it) => (rest == null)
          ? t.binaryExpression('==', it, t.nullLiteral())
          : t.logicalExpression('||', rest, t.binaryExpression('==', it, t.nullLiteral()))),
          null);

        if (node.declaration != null) { replacement.push(node.declaration); }

        if (node.alternate == null) {
          replacement.push(t.ifStatement(test, t.returnStatement()));
        } else {
          if (t.isReturnStatement(node.alternate) ||
              t.isThrowStatement(node.alternate) ||
              t.isBreakStatement(node.alternate) ||
              t.isContinueStatement(node.alternate)) {
            replacement.push(t.ifStatement(test, node.alternate));
          } else {
            replacement.push(t.ifStatement(test, t.blockStatement([ node.alternate, t.returnStatement() ])));
          }
        }

        path.replaceWithMultiple(replacement);
      },
    },
  };
});

