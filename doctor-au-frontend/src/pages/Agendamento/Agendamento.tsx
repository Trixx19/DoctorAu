import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Agendamento.css';

const Agendamento = () => {
  const navigate = useNavigate();
 
  const [pet, setPet] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  
  const handleAgendar = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Consulta agendada com sucesso para ${pet} no dia ${data} às ${hora}!`);
    navigate('/dashboard');
  };

  return (
    <>

      <div className="agendamento-container">
        <div className="agendamento-card">
          <h2>Marcar Consulta 📅</h2>
          <p>Selecione o melhor horário para o seu amigo.</p>

          <form onSubmit={handleAgendar}>
            <div className="form-group">
              <label>Qual Pet será atendido?</label>
              <select 
                value={pet} 
                onChange={(e) => setPet(e.target.value)}
                required
                className="input-padrao"
              >
                <option value="">Selecione...</option>
                <option value="Rex">Rex (Cão)</option>
                <option value="Mimi">Mimi (Gato)</option>
                <option value="Outro">Outro (Cadastrar novo)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Data</label>
              <input 
                type="date" 
                value={data}
                onChange={(e) => setData(e.target.value)}
                required 
                className="input-padrao"
              />
            </div>

            <div className="form-group">
              <label>Horário</label>
              <input 
                type="time" 
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required 
                className="input-padrao"
              />
            </div>

            <button type="submit" className="btn-agendar">Confirmar Agendamento</button>
            <Link to="/dashboard" className="btn-cancelar">Cancelar</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Agendamento;