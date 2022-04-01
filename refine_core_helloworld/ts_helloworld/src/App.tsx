import React, { FC } from "react";
import { Button } from "antd";

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList, PostShow, PostEdit, PostCreate } from "pages/posts";
import { Layout } from "components/Layout";

import "./App.less";

const Main: React.FC = () => {
  return <>Main</>;
};

export const App: React.FC = () => {
  return (
    <>
      <Button>helloworld</Button>
      <div className="App">
        <Main />
      </div>
    </>
  );
};

export default App;
