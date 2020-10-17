import React,{Fragment, useState} from 'react';
import routes from "./routes";
import {Route,Switch,Link} from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Editdelete from "./Pages/Editdelete";
import EditPage from "./Pages/EditPage";

function App() {

  
  return (
    <>
    <Header></Header>
      <Switch>
      <Route  exact path={routes.home}>
      <Home/>
      </Route>
      <Route exact path={routes.editdelete}>
        <Editdelete/>
      </Route>
      <Route exact path={routes.editdeleteid}>
      <EditPage/>
      </Route>
      </Switch>
    </>
  );
}

export default App;
