// bootstrap.js
const tsConfigPaths = require('tsconfig-paths');
const tsConfig = require('./tsconfig.json');

const cleanup = tsConfigPaths.register({
    baseUrl: tsConfig.compilerOptions.baseUrl,
    paths: tsConfig.compilerOptions.paths
});

// Then, require your entry point
require('./dist/presentation/express/settings/server.js');

// Optionally, you can cleanup the tsconfig-paths registration when your app shuts down
// cleanup();