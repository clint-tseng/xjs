import { declare } from "@babel/helper-plugin-utils";
import transformGuard from "@xjs/plugin-transform-guard";

export default declare(
  (api) => {
    api.assertVersion(7);

    return { overrides: [{ plugins: [[transformGuard]] }] };
  },
);
