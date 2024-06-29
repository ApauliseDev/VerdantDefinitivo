
import '../estilos/Nav.css'
import {Boton} from './LayaoutIndex/Botones'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <header className="navegador">
      {/* Nombre de la web */}
      <h1 className="nombre-web">VerdanT</h1>
      {/* Enlaces */}
        <nav >
          <Link className='link' to="/">Inicio</Link>
       
          <Link className='link' to="/TaskCard">Catálogo</Link>
        
          <Link className='link' to="/Saludar">Ayuda</Link>
        </nav>
      <Boton className="boton-nav" title='Registrarse'/>
    </header>
  );
}
export default Nav;