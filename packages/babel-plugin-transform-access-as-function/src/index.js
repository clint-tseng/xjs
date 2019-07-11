import { declare } from "@babel/helper-plugin-utils";
import { types as t } from "@babel/core";

export default declare(api => {
  api.assertVersion(7);

  return {
    name: "transform-access-as-function",

    visitor: {
      AccessFunctionExpression(path) {
        const { scope, node } = path;
        const arg = scope.generateUidIdentifierBasedOnNode(node.expression);

        let found = false;
        path.traverse({
          Identifier(ipath) {
            // stopping traversal doesn't keep siblings from being walked
            // so we have our own extra flag.
            if (found === true) return;
            found = true;

            ipath.stop();
            ipath.replaceWith(t.memberExpression(
              t.cloneNode(arg),
              t.cloneNode(ipath.node),
            ));
          }
        });

        path.replaceWith(t.arrowFunctionExpression(
          [ t.cloneNode(arg) ],
          node.expression,
        ));
      },
    },
  };
});

