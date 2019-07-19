import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-guard",

    visitor: {
      ArrowFunctionExpression(path) {
        const { node } = path;

        if ((node.operator === '->') && t.isExpression(node.body)) {
          node.body = t.blockStatement([ t.expressionStatement(node.body) ]);
        }
      },
    },
  };
});

