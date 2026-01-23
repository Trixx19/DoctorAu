import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { getPacientes, type Pet } from '../../services/pacienteService'; 
import './Agendamento.css';

const Agendamento = () => {
  const navigate = useNavigate();
 
  const [pets, setPets] = useState<Pet[]>([]);
  const [petId, setPetId] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(false);

  // Busca os pets do usuário ao carregar a página
  useEffect(() => {
    async function carregarPets() {
      try {
        const listaPets = await getPacientes();
        setPets(listaPets);
      } catch (error) {
        console.error("Erro ao carregar pets:", error);
        alert("Erro ao carregar seus pets. Verifique sua conexão.");
      }
    }
    carregarPets();
  }, []);
  
  const handleAgendar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!petId || !data || !hora) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (petId === 'novo') {
      navigate('/meus-pets');
      return;
    }

    setLoading(true);

    try {
      const dataHorario = `${data}T${hora}:00`;

      // Envia para a API (POST /agendamentos/)
      await api.post('/agendamentos/', {
        pet_id: parseInt(petId), // Converte para número
        data_horario: dataHorario
      });

      alert(`Consulta agendada com sucesso!`);
      navigate('/dashboard');

    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao realizar o agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
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
                value={petId} 
                onChange={(e) => setPetId(e.target.value)}
                required
                className="input-padrao"
                disabled={loading}
              >
                <option value="">Selecione...</option>
                
                {/* Lista os pets */}
                {pets.map((pet) => (
                  <option key={pet.id} value={pet.id}>
                    {pet.nome} ({pet.especie})
                  </option>
                ))}

                <option value="novo">+ Cadastrar novo pet</option>
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn-agendar" disabled={loading}>
              {loading ? "Agendando..." : "Confirmar Agendamento"}
            </button>
            
            <Link to="/dashboard" className="btn-cancelar">Cancelar</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Agendamento;