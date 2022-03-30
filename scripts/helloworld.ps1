# Remove-Item -Recurse -Force helloworld_tryout

# npx superplate-cli -d -p refine-react helloworld_tryout

pushd helloworld_tryout
  yarn add @pankod/refine-react-router
  yarn add @pankod/refine-antd
  yarn dev
popd
