$env:NODE_ENV="production"
$env:NODE_OPTIONS="--max_old_space_size=4096 PORT=3001"

$env:DISABLE_ESLINT_PLUGIN="true"

yarn add --dev typescript @types/node

yarn --dev

yarn start_win
