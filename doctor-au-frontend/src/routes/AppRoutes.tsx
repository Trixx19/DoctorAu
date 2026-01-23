import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Header from "../components/Header/Header";

// Páginas públicas
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";

// Páginas privadas
import PainelAdministrativo from "../pages/PainelAdministrativo/PainelAdministrativo";
import GerenciarUsuarios from "../pages/GerenciarUsuarios/GerenciarUsuarios";
import Feed from "../pages/Feed/Feed";
import Detalhe from "../pages/Detalhe/Detalhe";
import Dashboard from "../pages/Dashboard/Dashboard";
import Agendamento from "../pages/Agendamento/Agendamento";
import ConsultasMedico from "../pages/ConsultasMedico/ConsultasMedico";
import Perfil from "../pages/Perfil/Perfil";
import MeusPets from "../pages/MeusPets/MeusPets";
import MinhasConsultas from "../pages/MinhasConsultas/MinhasConsultas";
import NovoCadastro from "../pages/NovoCadastro/NovoCadastro";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const rotasSemHeader = ["/", "/login", "/cadastro"];
  
  const mostrarHeader = !rotasSemHeader.includes(location.pathname);

  return (
    <>
      {mostrarHeader && <Header />}
      {children}
    </>
  );
};

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas Privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route
          path="/meus-pets"
          element={
            <PrivateRoute>
              <MeusPets />
            </PrivateRoute>
          }
        />

        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />

        <Route
          path="/consultas-medico"
          element={
            <PrivateRoute>
              <ConsultasMedico />
            </PrivateRoute>
          }
        />

        <Route
          path="/detalhe/:id"
          element={
            <PrivateRoute>
              <Detalhe />
            </PrivateRoute>
          }
        />

        <Route
          path="/agendar"
          element={
            <PrivateRoute>
              <Agendamento />
            </PrivateRoute>
          }
        />

        <Route
          path="/minhas-consultas"
          element={
            <PrivateRoute>
              <MinhasConsultas />
            </PrivateRoute>
          }
        />

        <Route
          path="/novo-cadastro"
          element={
            <PrivateRoute>
              <NovoCadastro />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <PainelAdministrativo />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <PrivateRoute>
              <GerenciarUsuarios />
            </PrivateRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;