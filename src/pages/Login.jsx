import React, { Component } from "react";
import firebase from "firebase/compat/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "firebase/compat/firestore";
import { Link, redirect } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        email: "",
        password: "",
      },
      validationEmail: false,
      validationPassword: false,
      showStatus: false,
    };
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
    this.validarUsuario();
  }

  async validarUsuario() {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, this.state.formData.email, this.state.formData.password).then((userCredential)=>{
      const user = userCredential.user
      console.log(user,'Login com sucesso')
      this.setState({ showStatus: false })
      window.location.href = '/Principal';

    }).catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
      this.setState({ showStatus: true })
    });
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <h1>Tela de Login</h1>
        <div className="container">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite o e-mail cadastrado"
            value={this.state.formData.email || ""}
            onChange={(e) => this.handleInputChange("email", e.target.value)}
          />
          <label htmlFor="senha">E-mail</label>
          <input
            id="senha"
            type="password"
            placeholder="Digite a senha cadastrada"
            value={this.state.formData.password || ""}
            onChange={(e) => this.handleInputChange("password", e.target.value)}
          />
        </div>
        <button type="submit">Acessar</button>
         <Link to="Cadastro">Cadastrar</Link>

        <div className={this.state.showStatus === true ? "show" : "hide"}>
          {this.state.validationEmail === true &&
          this.state.validationPassword === true ? (
            <p>Acessado com sucesso!</p>
          ) : (
            <p>Usuário ou senha incorretos</p>
          )}
        </div>
      </form>
    );
  }
}

export default Login;
