# $env:NODE_ENV="production"
# $env:DISABLE_ESLINT_PLUGIN="true"
$env:NODE_OPTIONS="--max_old_space_size=4096"

yarn add --dev typescript @types/node

yarn --dev

# yarn start_win
