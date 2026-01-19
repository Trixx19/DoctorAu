import { useState } from "react";
import { PlusCircle, PawPrint } from "lucide-react";
import "./MeusPets.css";

interface Pet {
  id: number;
  nome: string;
  especie: string;
  idade: number;
}

const MeusPets = () => {
  const [pets] = useState<Pet[]>([
    { id: 1, nome: "Rex", especie: "Cachorro", idade: 4 },
    { id: 2, nome: "Mimi", especie: "Gato", idade: 2 },
  ]);

  return (
    <div className="pets-container">
      {/* Cabeçalho */}
      <div className="pets-header">
        <h1>Meus Pets</h1>
        <button className="add-pet">
          <PlusCircle size={20} />
          Novo Pet
        </button>
      </div>

      {/* Lista */}
      <div className="pets-grid">
        {pets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <div className="pet-icon">
              <PawPrint size={36} />
            </div>

            <h3>{pet.nome}</h3>
            <p>{pet.especie}</p>
            <span>{pet.idade} anos</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeusPets;
