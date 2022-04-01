import React, { FC } from "react";
import { Button } from "antd";

import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";

import { PostList, PostShow, PostEdit, PostCreate } from "pages/posts";
import { Layout } from "components/Layout";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import Home from "./pages/Home";

import Main from "./components/layout/Main";

// import "./App.less";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

export const App: React.FC = () => {
  return (
    <>
      {/* <Button>helloworld</Button> */}
      <div className="App">
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<Main />}>
            <Route path="dashboard" element={<Home />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
