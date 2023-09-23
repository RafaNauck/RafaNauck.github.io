import React, { Component } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

class Principal extends Component {
  constructor(props) {
    super(props);
    this.state = {
          email: "",
          password: "",
          nome: "",
          sobrenome: "",
          dataNascimento:""
        };
  }
  render() {
    return (
      <div>
        Nome do Usuário:{this.state.nome}
        <br />
        Sobrenome:{this.state.sobrenome}
        <br />
        Data de Nascimento:{this.state.dataNascimento}
      </div>
    );
  }
  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (usuario) => {
      if (usuario) {
        var uid = usuario.uid;

        await firebase
          .firestore()
          .collection("usuario")
          .doc(uid)
          .get()
          .then((retorno) => {
            this.setState({
              nome: retorno.data().nome,
              sobrenome: retorno.data().sobrenome,
              dataNascimento: retorno.data().dataNascimento,
            });
          });
      }
    });
  }
}

export default Principal;
