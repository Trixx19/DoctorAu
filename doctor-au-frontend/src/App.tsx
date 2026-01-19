import { BrowserRouter } from 'react-router-dom';

// Componentes globais
import Header from './components/Header/Header';

// Rotas
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
