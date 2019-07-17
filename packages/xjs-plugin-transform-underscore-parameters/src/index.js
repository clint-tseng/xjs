import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

const dumpUnderscores = (path) => {
  for (const param of path.get('params')) {
    if (t.isIdentifier(param.node) && (param.node.name === '_')) {
      param.replaceWith(param.scope.generateUidIdentifierBasedOnNode(param));
    } else if (t.isAssignmentExpression(param.node)) {
      const left = param.get('left');
      if (left.node.name === '_') {
        left.replaceWith(left.scope.generateUidIdentifierBasedOnNode(left));
      }
    }
  }
};

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-underscore-parameters",

    visitor: {
      ArrowFunctionExpression: dumpUnderscores,
      FunctionExpression: dumpUnderscores,
      FunctionDeclaration: dumpUnderscores,
      ObjectMethod: dumpUnderscores,
    },
  };
});

