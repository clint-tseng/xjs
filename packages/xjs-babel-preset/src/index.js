import { declare } from "@babel/helper-plugin-utils";

import pipeline from "@babel/plugin-proposal-pipeline-operator";
import functionBind from "@babel/plugin-proposal-function-bind";
import optionalChaining from "@babel/plugin-proposal-optional-chaining";
import nullishCoalesce from "@babel/plugin-proposal-nullish-coalescing-operator";
import doExpr from "@babel/plugin-proposal-do-expressions";

import guard from "@xjs/plugin-transform-guard";
import accessAsFunction from "@xjs/plugin-transform-access-as-function";

export default declare(
  (api) => {
    api.assertVersion(7);

    return { overrides: [{ plugins: [
      // extant es proposal plugins:
      [ pipeline, { proposal: "fsharp" } ],
      [ functionBind ],
      [ optionalChaining, { loose: true } ],
      [ nullishCoalesce, { loose: true } ],
      [ doExpr ],

      // xjs plugins:
      [ guard ],
      [ accessAsFunction ],
    ] }] };
  },
);
