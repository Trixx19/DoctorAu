import { useState } from "react";
import "./NovoCadastro.css";

const NovoCadastro = () => {
  const [nomePet, setNomePet] = useState("");
  const [especie, setEspecie] = useState("");
  const [idade, setIdade] = useState("");
  const [tutor, setTutor] = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagem("");

    if (!nomePet || !especie || !idade || !tutor) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    // Simulação de cadastro
    setTimeout(() => {
      setMensagem("Paciente cadastrado com sucesso!");
      setNomePet("");
      setEspecie("");
      setIdade("");
      setTutor("");
    }, 500);
  }

  return (
    <div className="cadastro-container">
      <h1>Novo Cadastro</h1>

      <form className="cadastro-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nome do Pet</label>
          <input
            type="text"
            value={nomePet}
            onChange={(e) => setNomePet(e.target.value)}
            placeholder="Ex: Rex"
          />
        </div>

        <div className="input-group">
          <label>Espécie</label>
          <input
            type="text"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            placeholder="Cachorro, Gato..."
          />
        </div>

        <div className="input-group">
          <label>Idade</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Idade em anos"
          />
        </div>

        <div className="input-group">
          <label>Nome do Tutor</label>
          <input
            type="text"
            value={tutor}
            onChange={(e) => setTutor(e.target.value)}
            placeholder="Nome do responsável"
          />
        </div>

        <button type="submit">Cadastrar</button>

        {mensagem && <p className="form-message">{mensagem}</p>}
      </form>
    </div>
  );
};

export default NovoCadastro;
