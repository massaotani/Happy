import React from "react";
import { FiArrowRight } from "react-icons/fi";
//Impede que seja carregado tudo de novo para cada página.
import {Link} from 'react-router-dom';

import "../styles/pages/landing.css";
import logo from "../imgs/Logo.svg";

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logo} alt="Happy" />
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        <div className="location">
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </div>

        <Link to="/map" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Landing;
