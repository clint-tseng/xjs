import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-existence",

    visitor: {
      UnaryExpression(path) {
        const { node } = path;
        if (node.operator === '!') {
          if (t.isUnaryExpression(node.argument) && (node.argument.operator === '?')) {
            path.replaceWith(t.binaryExpression('!=', node.argument.argument, t.nullLiteral()));
          }
        } else if (node.operator === '?') {
          path.replaceWith(t.binaryExpression('==', node.argument, t.nullLiteral()));
        }
      },
    },
  };
});

