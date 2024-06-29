import React from 'react'
import {useState,createContext,useEffect} from 'react'


export const DataContext = createContext()



export const  DataProvider = (props) =>{

  const [porver, setPorver] = useState(localStorage.getItem('porver')? JSON.parse(localStorage.getItem('porver')) : [])
  const [vistas, setVistas] = useState(localStorage.getItem('porver')? JSON.parse(localStorage.getItem('porver')) : [])

  //Log In

  const [account, setAccount] = useState(localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')) : {});


const logOut = () => {
  setAccount(null)
}


useEffect(()=> {
  localStorage.setItem("account",JSON.stringify(account))

}, [account])

useEffect(()=>{
  localStorage.setItem("porver",JSON.stringify(porver))
} ,[porver] )

useEffect(()=>{
  localStorage.setItem("vistas",JSON.stringify(vistas))
} ,[vistas] )

const addToWatched = (movie) => {
  const check =  vistas.every(item => {
    return item.id !== movie.id
  })
  if(check) {
    const updater = [...porver]
    updater.forEach((item,index)=>{
      if(item.id === movie.id){
        updater.splice(index,1)
      }
      setPorver(updater)
    })
    setVistas([...vistas,movie ] )
    
    
  }else{
    alert("you already added this movie to Watched List")
  }

}


const removeFromVistas = (movie) =>{
  const updater = [...vistas]
  updater.forEach((item,index)=>{
    if(item.id === movie.id){
      updater.splice(index,1)
    }
    setVistas(updater)
  })

}


  return (
    <div>
    <DataContext.Provider value={{porver,setPorver,vistas,setVistas,addToWatched,account,setAccount,logOut,removeFromVistas}}>
    {props.children}
    
     </DataContext.Provider>
      
    </div>
  )
}
