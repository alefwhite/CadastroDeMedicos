import React, {Component} from 'react';
import './login.css';
import api from '../../services/api';
import toastr from 'toastr';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5500",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

class App extends Component{

    constructor(props) {

      super(props);
      this.state = {
          logar : {
            email : "",
            senha : ""
          }
      }
    }   

  // Após renderizar o componente
  componentDidMount() {
      console.log("Carregado...");      
  }

  // Quando a uma atualização no componente
  componentDidUpdate() {
      console.log("Atualizando...");
  }

  AtualizaEstado = (input) => {
    this.setState({logar : {
      ...this.state.logar, [input.target.name] : input.target.value}
    });
  }  

  RealizarLogin = (event) => {
    event.preventDefault();

    if(this.state.logar.senha !== null && this.state.logar.email !== null && this.state.logar.senha !== "" && this.state.logar.email !== ""){
      
      api.post('/login', this.state.logar)
        .then((response => {        
            console.log("Ok", response);
            
            if(response.status === 200) {
              console.log(response.data.token)
              localStorage.setItem("usuario", response.data.token);
              toastr.success("Login efetuado com sucesso!");

              this.props.history.push('/home');
            } 
    
        }))
        .catch((error) => {
            console.log(error);
        });

    } else {
      toastr.error("Email e senha obrigatórios.", "Atenção");
    }
  }

  render() {

    return (
      <>
        <div className="container">         
          <form className="boxForm" onSubmit={this.RealizarLogin}>
            <h1>Entrar</h1>
            <input type="email" name="email" placeholder="Email" onChange={this.AtualizaEstado}/>
            <input type="password" name="senha" placeholder="Senha" onChange={this.AtualizaEstado}/>
            <input type="submit" value="Entrar"/>
          </form>
        </div>
      </>
    
    
    )

  }

}

export default App;
