import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Stethoscope, ArrowRight } from 'lucide-react';
import './Home.css';
import heroImg from '../../assets/img/homedoctor.png'; 

const Home = () => {
  return (
    <>      
      <div className="hero-wrapper">
        <div className="hero-container">
          <div className="hero-text">
            <span className="badge-new">🐾 Cuidado 24h</span>
            <h1>A saúde do seu pet em boas mãos.</h1>
            <p>
              Medicina veterinária de excelência, tecnologia de ponta e uma equipa que ama o que faz.
              Agende hoje mesmo uma consulta.
            </p>
            <div className="hero-buttons">
              <Link to="/login" className="btn-primary">
                Agendar Consulta <ArrowRight size={20} />
              </Link>
              <a href="#sobre" className="btn-secondary">Saiba mais</a>
            </div>
          </div>
          
          <div className="hero-image">
            {/* CORREÇÃO 2: Usamos a variável importada aqui entre chaves {} */}
            <img 
              src={heroImg} 
              alt="Veterinário examinando um cão" 
            />
          </div>
        </div>
      </div>

      <div id="sobre" className="features-section">
        <div className="section-header">
          <h2>Por que a DoctorAu?</h2>
          <p>Oferecemos o melhor tratamento com a tecnologia mais avançada.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-box"><Stethoscope size={32} /></div>
            <h3>Infraestrutura</h3>
            <p>Laboratório próprio e salas cirúrgicas equipadas para qualquer emergência.</p>
          </div>

          <div className="feature-card">
            <div className="icon-box"><ShieldCheck size={32} /></div>
            <h3>Especialistas</h3>
            <p>Corpo clínico formado por especialistas em diversas áreas da veterinária.</p>
          </div>

          <div className="feature-card">
            <div className="icon-box"><Heart size={32} /></div>
            <h3>Amor aos Animais</h3>
            <p>Tratamento humanizado, focando no bem-estar e conforto do seu amigo.</p>
          </div>
        </div>
      </div>
      
      <footer className="footer-pro">
        <p>© 2025 DoctorAu Clínica Veterinária. Todos os direitos reservados.</p>
      </footer>
    </>
  );
};

export default Home;