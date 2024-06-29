import { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import "../../estilos/headerPeliculas.css";

function TabsMui() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const contenidoPlantaSimios = {
    Elenco: [
      "Andy Serkis",
      "James Franco ",
      "Freida Pinto",
      "Terry Notary ",
      "Tom Felton "
    ],
    Producción: [
      "Dirigida por Rupert Wyatt",
      "Guion Rick Jaffa, Amanda Silver"
    ],
    Detalles: [
      "Fecha de estreno: 28 de marzo de 2024 ",
      "Director: Adam Wingard",
      "Recaudación: $522 503 756",
      "Presupuesto: $135 000 000"
        ],
    Genero:[
      "Accion",
      "Drama",
      "Guerra"
    ]
  };

  function TabPanelContent({ tabName }) {
    // Verifica si el nombre de la pestaña existe en el objeto contenidoPlantaSimios
    if (!(tabName in contenidoPlantaSimios)) {
      return <p>No hay contenido para esta pestaña.</p>;
    }
  
    // Obtiene todos los valores correspondientes a la pestaña 'tabName'
    const contenido = contenidoPlantaSimios[tabName];
  
    return (
      <ul id ="contenido-tab">
        {/* Mapea cada elemento del array contenido y crea un elemento li para cada uno */}
        {contenido.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
  

  return (

    <Box sx={{ width: "100%", color: "#fff"}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 3, borderColor: "divider" }}>
          <TabList
            centered
            onChange={handleChange}
            textColor="#5bd635"
            TabIndicatorProps={{ sx: { backgroundColor: "#5bd635" } }}
            sx={{
              "& button": {
                borderRadius: 2,
                color: "#fff",
                underline: "#5bd635",
              },
              "& button:hover": { backgroundColor: "#5bd63565", color: "#fff" },
            }}
          >
            <Tab label="Elenco" value="1" />
            <Tab label="Produccion" value="2" />
            <Tab label="Detalles" value="3" />
            <Tab label="Genero" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TabPanelContent tabName="Elenco" />
        </TabPanel>
        <TabPanel value="2">
          <TabPanelContent tabName="Producción" /> 
        </TabPanel>
        <TabPanel value="3">
          <TabPanelContent tabName="Detalles" />
        </TabPanel>
        <TabPanel value="4"> 
          <TabPanelContent tabName="Genero" />
        </TabPanel>
      </TabContext>
    </Box>

  );
}

export default TabsMui;
