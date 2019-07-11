import { declare } from "@babel/helper-plugin-utils";
import pipeline from "@babel/plugin-proposal-pipeline-operator";
import guard from "@xjs/plugin-transform-guard";
import accessAsFunction from "@xjs/plugin-transform-access-as-function";

export default declare(
  (api) => {
    api.assertVersion(7);

    return { overrides: [{ plugins: [
      [ pipeline, { "proposal": "fsharp" } ],
      [ guard ],
      [ accessAsFunction ],
    ] }] };
  },
);
