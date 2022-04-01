import React, { FC } from "react";
import { Button } from "antd";

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList, PostShow, PostEdit, PostCreate } from "pages/posts";
import { Layout } from "components/Layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

// import "./App.less";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

const Main: React.FC = () => {
  return <>Main</>;
};

export const App: React.FC = () => {
  return (
    <>
      <Button>helloworld</Button>
      <div className="App">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
