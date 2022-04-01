import React, { FC } from "react";
import { Button } from "antd";

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList, PostShow, PostEdit, PostCreate } from "pages/posts";
import { Layout } from "components/Layout";

import "./App.less";

export const App: React.FC = () => {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[
        {
          name: "posts",
          // icon: PostIcon,
          list: PostList,
          show: PostShow,
          edit: PostEdit,
          create: PostCreate,
        },
      ]}
      Layout={Layout}
    />
  );
};

export default App;
