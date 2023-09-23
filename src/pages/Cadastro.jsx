import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';

class Cadastro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: "",
        nome: "",
        sobrenome: "",
        dataNascimento:""
      },
      showStatus: false
    };
    this.gravar = this.gravar.bind(this)
  }
   async gravar(){
    await firebase.auth().createUserWithEmailAndPassword(this.state.formData.email, this.state.formData.password).then(async(retorno)=>{
      await firebase.firestore().collection('usuario').doc(retorno.user.uid).set(
        {
          nome: this.state.formData.nome,
          sobrenome: this.state.formData.sobrenome,
          dataNascimento: this.state.formData.dataNascimento
        }
     )
     this.setState({ showStatus: true })
    }).catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
    });
  }

  handleInputChange(fieldName, value) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [fieldName]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
this.gravar();
    console.log(this.state.formData);
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h1>Cadastre-se</h1>
        <div className="container">
         <label htmlFor="email">E-mail</label>
          <input
          id="email"
          placeholder="Informe um e-mail"
            type="email"
            value={this.state.formData.email || ""}
            onChange={(e) => this.handleInputChange("email", e.target.value)}
          />
                <label htmlFor="senha">Senha</label>
          <input
          id="senha"
          placeholder="Digite a senha desejada"
            type="password"
            value={this.state.formData.password || ""}
            onChange={(e) => this.handleInputChange("password", e.target.value)}
          />
           <label htmlFor="nome">Nome</label>
          <input
          id="nome"
          placeholder="Digite o seu primeiro nome"
            type="text"
            value={this.state.formData.nome || ""}
            onChange={(e) => this.handleInputChange("nome", e.target.value)}
          />
           <label htmlFor="sobrenome">Sobrenome</label>
          <input
          id="sobrenome"
          placeholder="Digite o seu sobrenome"
            type="text"
            value={this.state.formData.sobrenome || ""}
            onChange={(e) => this.handleInputChange("sobrenome", e.target.value)}
          />
           <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
          id="dataNascimento"
            type="date"
            value={this.state.formData.dataNascimento || ""}
            onChange={(e) => this.handleInputChange("dataNascimento", e.target.value)}
          />
        </div>
        <button className={!this.state.showStatus === true ? "show" : "hide"}type="submit">Cadastrar usuário</button>
        <Link to="/">Login</Link>
        <div className={this.state.showStatus === true ? "show" : "hide"}> 
            <p>Usuário cadastrado com sucesso! Clique em login.</p>
        </div>
      </form>
      
    );
  }
}

export default Cadastro;