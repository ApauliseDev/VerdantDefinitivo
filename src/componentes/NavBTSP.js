import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'
import {Boton} from './LayaoutIndex/Botones'
import '../estilos/NavBTSP.css'
import CustomizedMenus from './CustomizedMenus';
import  {useLocation} from 'react-router-dom'
import  { useSelector } from 'react-redux';
import AccountMenu from './AccountMenu';

function Navegador(props) {
  const location = useLocation()
  const usuario = useSelector((state)=> state.usuario)



  return (
    <Navbar data-bs-theme="dark" collapseOnSelect expand="lg" fixed="top" className="fondoNav justify-content-between">
      <Container style={{paddingTop: "15px"}}>
      <h1 className="nombre-web">VerdanT</h1>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{color: "#53a13b", borderColor: "#53a13b"}} />
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="justify-content-center" style={{width:"100%"}}>
            {props.items.map((item,index) =>(
              <Link className="link" to={item.url}> {item.texto }</Link>

            ))}
           
          </Nav>
         
          {location.pathname === '/'?<Boton className="boton-regist"  title="Register" />:  <AccountMenu/>}
     
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegador;