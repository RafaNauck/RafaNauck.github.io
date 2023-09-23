import React, { Component } from "react";
import {Route, BrowserRouter, Routes} from "react-router-dom"
import Login from "./Login";
import Cadastro from "./Cadastro";
import Principal from "./Principal"
class Rotas extends Component{
    render() {
        return (<BrowserRouter className="login">
            <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/cadastro' element={<Cadastro />}/>
            <Route path= '/Principal' element={<Principal />}/>
            </Routes>
        </BrowserRouter>)}
}
export default Rotas;
