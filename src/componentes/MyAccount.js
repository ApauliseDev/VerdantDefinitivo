import React from 'react'
import "../estilos/MyAccount.css";
import Navegador from './NavBTSP'
import CustomizedMenus from './CustomizedMenus';
import {DataContext} from './DataContext'
import { useContext } from 'react';

export function MyAccount() {
    const {account,setAccount} = useContext(DataContext)


    const elementosMenu2 = [
        {url:'/LayoutCatalogo',texto:'Home' },
        {url:'/PelisGrid',texto: 'Movies' },
        {url:'/Favoritos', texto: 'Lists' },
      ]



  return (
    <> 
    <Navegador items= {elementosMenu2}    />
    <div className='container-MyAccount'>
        <h1 className='titulo-Account'>Account Settings</h1>
        <div className='esqueleto'>
            <span className='contenerdor-spanUno'>
                <h2>First name</h2>
                <p className='parrafo-span'> {account.username} </p>
            </span>
            <span className='contenerdor-spanUno'>
                <h2>Last name</h2>
                <p className='parrafo-span'> {account.username}</p>
            </span>
        </div>
        <div className='esqueleto'>
            <span className='contenerdor-spanUno'>
                <h2>Email</h2>
                <p className='parrafo-span'> {account.email }</p>
            </span>
            <span className='contenerdor-spanUno'>
                <h2>Phone number</h2>
                <p className='parrafo-span'> {account.email}</p>
            </span>
        </div>
    </div>
    </>
  )
}

export default MyAccount
