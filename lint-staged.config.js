// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('./package.json');

module.exports = {
  '**/*.{js,ts,jsx,tsx}': [packageJson.scripts['typecheck'], packageJson.scripts['lint']],
};
