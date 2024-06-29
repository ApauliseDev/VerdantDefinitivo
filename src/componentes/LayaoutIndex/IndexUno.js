import React from "react";
import "../../estilos/IndexUno.css"; // Importa el archivo CSS para estilos
import {Boton} from './Botones'
import Main from './Main'
import Navegador from '../NavBTSP'
import Acordion from './Acordion'
import {Link} from 'react-router-dom'



function IndexUno() {
  const elementosMenu = [
    {url:'/',texto: '' },
    

  ]
  return (
    <>
    <div className="imagen-fondo">
    {/* <NavBar/> */}
    <Navegador items= {elementosMenu} />
      <div className="encabezado">
        <h1 className="title" >
        EXPLORE A WORLD OF ENTERTAINMENT
        </h1> 
        <h1 className = "title"style={{ color: "#2DB11B" }}>WITHOUT LIMITS!</h1>
        <p className="texto">Join our community of movie lovers today!</p>
        <p className="texto"> Sign up now to rate, review, access exclusive content and more. Do not wait more!</p>
        <div className="Botones-index">
          <Link id="boton-link" to = "/LogIn"><Boton title='Join Now' /> </Link> 
          <Link id="boton-link" to = "/LogIn"><Boton title='Already have verdant' /> </Link> 
        </div>

      </div>
    </div>
       <Main/> 
       <Acordion/>
      </>
  );
}

export default IndexUno;