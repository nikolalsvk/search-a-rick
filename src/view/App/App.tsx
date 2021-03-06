import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Header } from "../components/Header";
import { CharacterPage } from "../Character/CharacterPage";
import { Login } from "../Login/Login";
import { SignUp } from "../SignUp/SignUp";
import { AuthProvider } from "../../context/auth";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />

        <Switch>
          <Route exact path="/" component={CharacterPage} />
          <Route path="/login" component={Login} />
          <Route path="/sign_up" component={SignUp} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
