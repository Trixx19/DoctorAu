import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importa o Header aqui para ser Global
import Header from './components/Header/Header';

// Paginas
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Cadastro from './pages/Cadastro/Cadastro';
import Feed from './pages/Feed/Feed';
import Detalhe from './pages/Detalhe/Detalhe';
import Dashboard from './pages/Dashboard/Dashboard';
import Agendamento from './pages/Agendamento/Agendamento';
import ConsultasMedico from './pages/ConsultasMedico/ConsultasMedico';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rotas Logadas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/consultas-medico" element={<ConsultasMedico />} />
        <Route path="/detalhe/:id" element={<Detalhe />} />
        <Route path="/agendar" element={<Agendamento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;