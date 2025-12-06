import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarDays, 
  FolderOpen, 
  PlusCircle, 
  Dog, 
  MessageCircle, 
  History 
} from 'lucide-react'; 
import './Dashboard.css';

const Dashboard = () => {
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    setRole(savedRole || 'cliente');
  }, []);
  const renderMedicoView = () => (
    <div className="actions-grid">
      <Link to="/feed" className="action-card">
        <div className="icon-dash"><FolderOpen size={40} /></div>
        <h3>Pacientes</h3>
        <p>Aceder prontuários e fichas.</p>
      </Link>

      <Link to="/consultas-medico" className="action-card">
        <div className="icon-dash"><CalendarDays size={40} /></div>
        <h3>Agenda</h3>
        <p>Consultas marcadas do mês.</p>
      </Link>

      <div className="action-card">
        <div className="icon-dash"><PlusCircle size={40} /></div>
        <h3>Novo Cadastro</h3>
        <p>Adicionar paciente ao sistema.</p>
      </div>
    </div>
  );

  const renderClienteView = () => (
    <div className="actions-grid">
      <div className="action-card">
        <div className="icon-dash"><Dog size={40} /></div>
        <h3>Meus Pets</h3>
        <p>Perfil de {role === 'cliente' ? 'Rex e Mimi' : 'seus animais'}.</p>
      </div>

      <Link to="/agendar" className="action-card">
        <div className="icon-dash"><CalendarDays size={40} /></div>
        <h3>Agendar</h3>
        <p>Marcar nova consulta ou vacina.</p>
      </Link>

      <div className="action-card">
        <div className="icon-dash"><MessageCircle size={40} /></div>
        <h3>Chat</h3>
        <p>Fale com a recepção.</p>
      </div>
      
       <div className="action-card">
        <div className="icon-dash"><History size={40} /></div>
        <h3>Histórico</h3>
        <p>Consultas e exames passados.</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="dashboard-content">
        <div className="dashboard-welcome">
            <h1>Olá, {role === 'cliente' ? 'Tutor' : 'Dr(a).'} 👋</h1>
            <p>O que deseja fazer hoje?</p>
        </div>
        
        {role === 'cliente' ? renderClienteView() : renderMedicoView()}
      </div>
    </>
  );
};

export default Dashboard;