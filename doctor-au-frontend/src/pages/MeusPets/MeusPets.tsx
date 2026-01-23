import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, PawPrint } from "lucide-react";
import { getPacientes } from "../../services/pacienteService";
import "./MeusPets.css";

interface Pet {
  id: number;
  nome: string;
  especie: string;
  idade: number;
  foto?: string; 
}

const MeusPets = () => {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await getPacientes();
        setPets(data as Pet[]); 
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPets();
  }, []);

  return (
    <div className="pets-container">
      {/* Cabeçalho da Seção */}
      <div className="pets-header">
        <h1>Meus Pets 🐶</h1>
        
        <button className="add-pet" onClick={() => navigate("/novo-cadastro")}>
          <PlusCircle size={20} />
          Novo Pet
        </button>
      </div>

      {/* Loading e Lista */}
      {loading ? (
        <p className="loading-text">Carregando seus pets...</p>
      ) : pets.length === 0 ? (
        <div className="empty-state">
          <p>Você ainda não tem pets cadastrados.</p>
        </div>
      ) : (
        <div className="pets-grid">
          {pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              
              {}
              <div className="pet-icon">
                {pet.foto ? (
                  <img 
                    src={pet.foto} 
                    alt={pet.nome} 
                    style={{
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      borderRadius: '50%'
                    }} 
                  />
                ) : (
                  <PawPrint size={36} />
                )}
              </div>

              <h3>{pet.nome}</h3>
              <p className="pet-specie">{pet.especie}</p>
              
              <span>{pet.idade ? `${pet.idade} anos` : "Idade não inf."}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeusPets;