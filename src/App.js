// import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import * as React from "react";
import Footer from "./componentes/Footer";
import "./estilos/App.css";

import IndexUno from "./componentes/LayaoutIndex/IndexUno";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutCatalogo from './componentes/LayoutCatalogo'
import LogIn from "./componentes/LogIn";
import LayoutPeliculas from "./componentes/LayoutPeliculas/LayoutPeliculas"
import "bootstrap/dist/css/bootstrap.min.css";
import { register } from 'swiper/element/bundle';
import PelisGrid from './componentes/PelisGrid';
import Favoritos from './componentes/Favoritos'
import PelisGeneros from './componentes/PelisGeneros'
import MyAccount from "./componentes/MyAccount";
import PersonasDetails from "./componentes/PersonasDetails";
import {DataProvider} from './componentes/DataContext'

// register Swiper custom elements
register();


function App() {
  return (
<DataProvider> 
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<IndexUno />}/>
          <Route path="/LogIn" element={<LogIn />}/>
          <Route path="/LayoutCatalogo" element= {<LayoutCatalogo/>}/>
          <Route path="/LayoutPeliculas" element={<LayoutPeliculas/>}/> 
          <Route path="/PelisGrid" element= {<PelisGrid/>}/>
          <Route path="/LayoutPeliculas/:name" element = {<LayoutPeliculas/>}> </Route>
          <Route path="/Favoritos" element = <Favoritos/> > </Route>
          <Route path="/PelisGeneros" element ={<PelisGeneros/>}></Route>
          <Route path="/MyAccount" element ={<MyAccount/>}></Route>
          <Route path="/PersonDetails/:name" element={<PersonasDetails />} />
        </Routes>                                                                     
      </div>
      <Footer />
    </BrowserRouter>
    </DataProvider>
  );
}

export default App;
