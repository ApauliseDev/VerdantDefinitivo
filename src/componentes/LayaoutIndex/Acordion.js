import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";

import "../../estilos/Acordion.css";

export function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      style={{ backgroundColor: "#24451D", color: "#fff", border: "none" }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

/* 
====================
====================
====================
====================
====================
====================

PREGUNTAS FRECUENTES

====================
====================
====================
====================
====================
 ==================*/


function Acordion() {
  return (
    <div id="AcordionContainer">
  
      <Accordion className="accordionWidth" >
      <div id="FAQ">
        <h2 > FAQ</h2>
      </div>
        <Card id="border-c">
          <CustomToggle eventKey="0">
            <Card.Header id="card-head" style={{ backgroundColor: "#24451D", color: "#fff" }}>
            Do I need to register to use Verdant?
            </Card.Header>
          </CustomToggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body id="cuerpo" >
            Yes, to access and enjoy the content available on Verdant,
            as well as to leave reviews and comments on movies and
            series, it is necessary to register on the platform.. 
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card id="border-c">
          <CustomToggle eventKey="1">
            <Card.Header id="card-head" style={{ backgroundColor: "#24451D", color: "#fff" }}>
            How can I search for a specific movie?
            </Card.Header>
          </CustomToggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body id="cuerpo"  >
            To access content from specific movies and series on
            Verdant, you need to log in to your account. 
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card id="border-c">
          <CustomToggle eventKey="3">
            <Card.Header id="card-head" >
              What is the content update frequency?
            </Card.Header>
          </CustomToggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body id="cuerpo"  >
              En Verdant, nos esforzamos por mantener nuestro catálogo
              actualizado con las últimas películas y series para que siempre
              tengas acceso a contenido fresco y emocionante.
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card id="border-c">
          <CustomToggle eventKey="4">
            <Card.Header id="card-head" >
            Are there any specific technical requirements to use Verdant on
            different devices?
            </Card.Header>
          </CustomToggle>
          <Accordion.Collapse eventKey="4">
            <Card.Body id="cuerpo" >
            You can enjoy Verdant from your favorite device, whether
            a desktop computer, laptop, tablet or phone.
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default Acordion;
