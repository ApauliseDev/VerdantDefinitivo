import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    usuario: null, // Objeto con datos del usuario logeado
  };
  

  const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
      guardarUsuario: (state, action) => {
        state.usuario = action.payload;
      },
      limpiarUsuario: (state) => {
        state.usuario = null;
      },
    },
  });

 export const { guardarUsuario, limpiarUsuario } = usuarioSlice.actions;

 export  const store = configureStore({
    reducer: usuarioSlice.reducer,
  });
  