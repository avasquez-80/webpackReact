import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/global.scss';

//Para poder mostrar dentro de un HTML la aplicación

ReactDOM.render(<App />, document.getElementById("app"));
//Crear en la raiz la carpeta public y dentro de ella la carpeta index.html