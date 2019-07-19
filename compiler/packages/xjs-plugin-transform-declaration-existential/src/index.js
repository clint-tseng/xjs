import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-declaration-existential",

    visitor: {
      VariableDeclaration(path) {
        const { node } = path;
        if (node.consequent == null) return;

        // TODO: mostly copypasta from guard
        const tests =
          t.isObjectPattern(node.declarations[0].id)
            ? node.declarations[0].id.properties.map(prop => prop.key) :
          node.declarations.map(node => node.id);

        const test = tests.reduce(((rest, it) => (rest == null)
          ? t.binaryExpression('!=', it, t.nullLiteral())
          : t.logicalExpression('&&', rest, t.binaryExpression('!=', it, t.nullLiteral()))),
          null);

        path.insertAfter(t.ifStatement(test, node.consequent));
      },
    },
  };
});

