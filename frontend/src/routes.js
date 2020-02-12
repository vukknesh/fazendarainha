import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import StyledSpinner from "./utils/StyledSpinner";
const CadastrarAluno = lazy(() => import("./components/CadastrarAluno"));
const GerenciarAulas = lazy(() => import("./components/GerenciarAulas"));
const GerenciarAlunos = lazy(() => import("./components/GerenciarAlunos"));
const AddAulaForm = lazy(() => import("./components/AddAulaForm"));
const AlunosDetail = lazy(() => import("./components/AlunosDetail"));
const Login = lazy(() => import("./screens/Login"));
const Dashboard = lazy(() => import("./screens/Dashboard"));
const BaseRouter = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <StyledSpinner />
        </div>
      }
    >
      <Switch>
        <Route exact path="/" component={Login} />
        <Dashboard>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/cadastrar-aluno"
            component={CadastrarAluno}
          />
          <PrivateRoute
            exact
            path="/gerenciar-aulas"
            component={GerenciarAulas}
          />
          <PrivateRoute
            exact
            path="/gerenciar-alunos"
            component={GerenciarAlunos}
          />
          <PrivateRoute exact path="/add-aulas" component={AddAulaForm} />
          <PrivateRoute exact path="/aluno/:id" component={AlunosDetail} />
        </Dashboard>
      </Switch>
    </Suspense>
  );
};

export default BaseRouter;
