import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "../estilos/logIn.css";
import { BiSolidUser } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "../estilos/footer.css";
import { ImOpt } from "react-icons/im";
import LayoutCatalogo from './LayoutCatalogo';
import { useDispatch } from 'react-redux';
import { guardarUsuario } from './store';
import { DataContext } from './DataContext';
import { MyAccount } from "./MyAccount";

function LogIn(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [activeForm, setActiveForm] = useState('login'); // Estado para controlar qué formulario está activo
  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext); // Usar el contexto

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email no es válido";
    }
    if (!password) {
      errors.password = "Contraseña es requerida";
    } else if (password.length < 8) {
      errors.password = "Contraseña debe tener al menos 8 caracteres";
    }
    if (activeForm === 'signup' && !username) {
      errors.username = "Username es requerido";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (activeForm === 'signup') {
      try {
        const response = await fetch('http://localhost:3001/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
          throw new Error('Error al registrar usuario');
        }

        const data = await response.json();
        console.log('Usuario registrado:', data);
        setEmail('');
        setPassword('');
        setFieldErrors({});
        setActiveForm('login'); // Cambiar al formulario de login después del registro exitoso
      } catch (error) {
        console.error('Error durante el registro:', error);
        setError('Error al registrar usuario');
      }
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error al iniciar sesión');
      }

      const data = await response.json();
      console.log('Login exitoso:', data);
      localStorage.setItem('account', JSON.stringify(data));
      setAccount(data.user);
      localStorage.setItem('token', data.token);
      setError('');
      navigate('/LayoutCatalogo'); // Redireccionar al usuario luego del login exitoso
    } catch (error) {
      console.error('Error durante el login:', error);
      setError('Credenciales incorrectas');
    }
  };

  const handleToggleForm = () => {
    setActiveForm(activeForm === 'login' ? 'signup' : 'login'); // Alternar entre 'login' y 'signup'
    setError('');
    setUsername('');
    setEmail('');
    setPassword('');
    setFieldErrors({});
  };

  return (
    <div className="login">
      <div className="titulo-contenedor">
        <h1 className="titulo"> VerdanT </h1>
      </div>

      <div className="contenedorLogin">
        <div className="header-login">
          <div className="text">{activeForm === 'login' ? 'Login' : 'Sign Up'}</div>
          <div className="underline"> </div>
        </div>
        <div className="inputs">
          {activeForm === 'login' ? (
            <div />
          ) : (
            <div className="input">
              <BiSolidUser className="iconos" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ borderColor: fieldErrors.username ? 'red' : '' }}
              />
              {fieldErrors.username && <span style={ {color: "Red", fontWeight: 600  }}>{fieldErrors.username}</span>}
            </div>
          )}
          <div className="input">
            <MdEmail className="iconos" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: fieldErrors.email ? 'red' : '' }}
            />
            {fieldErrors.email && <span style={ {color: "Red", fontWeight: 600  }}>{fieldErrors.email}</span>}
          </div>
          <div className="input">
            <RiLockPasswordFill className="iconos" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderColor: fieldErrors.password ? 'red' : '' }}
            />
            {fieldErrors.password && <span style={ {color: "Red", fontWeight: 600  }}>{fieldErrors.password}</span>}
          </div>

          {activeForm === 'login' && <p style={{ color: 'red' }}> {error}</p>}
        </div>
        {activeForm === 'login' ? (
          <div className="forgot-password">
            Lost password? <span> Click Here!</span>{' '}
          </div>
        ) : null}
        <div className="submit-container">
          <div
            className={activeForm === 'login' ? 'submit gray' : 'submit'}
            onClick={activeForm === 'login' ? handleToggleForm : handleSubmit}
          >
            {' '}
            Sign Up{' '}
          </div>
          <div
            className={activeForm === 'signup' ? 'submit gray' : 'submit'}
            onClick={activeForm === 'signup' ? handleToggleForm : handleSubmit}
          >
            {' '}
            Log in{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
