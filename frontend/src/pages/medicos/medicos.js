import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Header from '../../assets/components/header/Header';
import {Jumbotron, Table, Container, ToggleButtonGroup, Button, Modal, Form} from 'react-bootstrap';
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

class Medico extends Component{
    constructor(props) {
        super(props);

        this.state = {
            ListaDeMedicos : [],
            ListaDeEspecialidades : [],

            show : false ,
            showEditar : false ,
            showEspecialidade : false,

            cadastrarMedico : {
                nome : "",
                crm : "",
                telefone : "",
                estado : "",
                cidade : ""
            },
            
            editarMedico : {
                nome : "",
                crm : "",
                telefone : "",
                estado : "",
                cidade : ""
            },

            id_medico : "",          
            especialidades : [],            
            adicionarEspecialidade : "Selecionar especialidade"
        };

    }  

    // Após renderizar o componente
    async componentDidMount() {
        console.log("Carregado...");
        await this.ListarMedicos();
        await this.ListarEspecialidades();      
    }

    // Quando a uma atualização no componente
    componentDidUpdate() {
        console.log("Atualizando...");
    }

    async ListarMedicos() {

        await api.get('/medicos')
        .then((response) => {
            console.log("Data: ", response.data.medicos);
            this.setState({ListaDeMedicos : response.data.medicos});
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
    }

    async ListarEspecialidades() {

        await api.get('/especialidades')
        .then((response) => {
            console.log("Especialidades: ", response.data.especialidades);
            this.setState({ListaDeEspecialidades : response.data.especialidades});
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 
    }

    Cadastrar = () => {
        console.log("Cadastrando...")

        // Abrir Modal
        this.handleShow();
    }

    EfetuarCadastro = (event) => {
        event.preventDefault();
        console.log("Efetuar cadastro");       

        api.post('/medicos', this.state.cadastrarMedico)
            .then((response => {        
                console.log("Ok", response);
                
                if(response.status === 201) {                   
                    toastr.success("Usuário cadastrado com sucesso!");
                    this.setState({
                        cadastrarMedico : {
                            nome : "",
                            crm : "",
                            telefone : "",
                            estado : "",
                            cidade : ""
                        }
                    })
                    this.handleClose();
                    this.ListarMedicos();                        
                } 
        
            }))
            .catch((error) => {
                console.log(error);
            });

      
    }

    Editar = (medico) => {
        console.log("Editando Medico...", medico)

        this.setState({
            editarMedico : {
                ...this.state.Medico, 
                nome : medico.nome, 
                crm : medico.crm, 
                telefone : medico.telefone,
                estado : medico.estado,
                cidade : medico.cidade
            }
        });
        
        this.setState({ id_medico :  medico.id_medico });
       
         // Abrir Modal
         this.handleShowEditar();
    }

   async Especialidade(id) {
        console.log("Editando...")

        this.setState({
            id_medico : id
        });

        console.log("Id: ", id);

        await api.get(`/medespecialidade/${id}`)
        .then((response) => {
            console.log("Especialidades: ", response.data.especialidades);
            this.setState({especialidades : response.data.especialidades});
        })
        .catch((error) => {
            console.log("Error: ", error);
        }); 

       
         // Abrir Modal
         this.handleShowEspecialidade();
    }

    AdicionarEspecialidade = () => {
        const NovaEspecialidade = {
            id_medico : this.state.id_medico,
            id_especialidade : this.state.adicionarEspecialidade
        }

        api.post('/medespecialidade', NovaEspecialidade)
            .then((response => {               
                console.log("Teste", response);           
                if(response.status === 200) {
                    toastr.success("Especialidade adicionada com sucesso!"); 
                    
                    this.Especialidade(this.state.id_medico);
                  
                    this.setState({  adicionarEspecialidade : ""});
                    
                    this.handleCloseEspecialidade();
                    
                }    
                
        
            }))
            .catch((error) => {
                console.log(error);
            });

        // Abrir Modal
        setTimeout(() => {
            this.handleShowEspecialidade();
        }, 2000);
    }

    EfetuarEdicao = (event) => {
        event.preventDefault();
        console.log("Efetuar Edição");

        const id = this.state.id_medico;        
    
        api.put(`/medicos/${id}`, this.state.editarMedico)
            .then((response => {        
                console.log("Ok", response);
                
                if(response.status === 200) {                   
                    toastr.info("Usuário alterado com sucesso!");
                    this.setState({ editarMedico : {
                            nome : "",
                            crm : "",
                            telefone : "",
                            estado : "",
                            cidade : ""
                        }
                    })

                    this.handleCloseEditar();
                    this.ListarMedicos();                        
                }         
            }))
            .catch((error) => {
                console.log(error);
            });        
    }

    Deletar = (id) => {
        console.log("Deletando...", id);

        api.delete(`/medicos/${id}`)
        .then((response) => {
            console.log("Del :", response);
            if(response.status === 200) {
                toastr.warning("Usuário deletado com sucesso!");
                this.ListarMedicos();
            }
        })
        .catch((error) => {
            toastr.error("Médico possui especialidades cadastradas, não foi possível deletar");
            console.log(error);
        });
    }

    handleClose = () => this.setState({show : false});
    handleShow = () => this.setState({show : true});

    handleCloseEditar = () => {
        this.setState({showEditar : false});
        this.setState({ editarMedico : {
                nome : "",
                crm : "",
                telefone : "",
                estado : "",
                cidade : ""
            }
        });

    } 

    handleShowEditar = () => this.setState({showEditar : true});
    
    handleCloseEspecialidade = () => this.setState({showEspecialidade : false});
    handleShowEspecialidade = () => this.setState({showEspecialidade : true});

    AtualizaEstado = (input) => {
        this.setState({
            cadastrarMedico : {
                ...this.state.cadastrarMedico, [input.target.name] : input.target.value
            }
        });
    }

    AtualizaEstadoEditarMedico = (input) => {
        this.setState({
            editarMedico : {
                ...this.state.editarMedico, [input.target.name] : input.target.value
            }
        });
        
    }

    AtualizaEstadoEspecialidade = (input) => {
        this.setState({
           adicionarEspecialidade : input.target.value
        });        
    }

    previnir = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <Header/>
                <Jumbotron fluid>
                    <Container>
                        <h1>Lista de Médicos</h1><br/>
                        <div>
                            <Button variant="success" size="lg" block onClick={() => this.Cadastrar()}>Cadastrar Médico</Button>
                        </div>
                        <br/>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>CRM</th>
                                    <th>Telefone</th>
                                    <th>Cidade</th>                                   
                                    <th>Estado</th>                                   
                                                                   
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ListaDeMedicos.map(function(medico) {
                                        console.log("Med", medico.id_medico)
                                        return (

                                            <tr key={medico.id_medico}>
                                                <td>{medico.nome}</td>
                                                <td>{medico.crm}</td>
                                                <td>{medico.telefone}</td>
                                                <td>{medico.cidade}</td>
                                                <td>{medico.estado}</td>
                                                <td>  
                                                    <ToggleButtonGroup type="checkbox">
                                                        <Button variant="dark" onClick={() => this.Especialidade(medico.id_medico)}>Especialidades</Button>
                                                        <Button variant="primary" onClick={() => this.Editar(medico)}>Editar</Button>
                                                        <Button variant="danger" onClick={() => this.Deletar(medico.id_medico)}>Deletar</Button>
                                                    </ToggleButtonGroup>                               
                                                </td>                              
                                            </tr>

                                        );

                                    }.bind(this))
                                }
                                
                            </tbody>
                        </Table>
                    </Container>
                </Jumbotron>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Médico</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.EfetuarCadastro}>
                        <Modal.Body>

                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome" name="nome" value={this.state.cadastrarMedico.nome} onChange={this.AtualizaEstado} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>CRM</Form.Label>
                                <Form.Control type="text" placeholder="Digite o crm" name="crm" value={this.state.cadastrarMedico.crm} onChange={this.AtualizaEstado} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control type="text" placeholder="Digite o telefone" name="telefone" value={this.state.cadastrarMedico.telefone} onChange={this.AtualizaEstado} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" placeholder="Digite a cidade" name="cidade" value={this.state.cadastrarMedico.cidade} onChange={this.AtualizaEstado} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" placeholder="Digite o estado" name="estado" value={this.state.cadastrarMedico.estado} onChange={this.AtualizaEstado} required/>
                            </Form.Group>                  
                                                                    
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Sair
                        </Button>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/* {Modal de Edição} */}
                <Modal show={this.state.showEditar} onHide={this.handleCloseEditar}>
                    <Modal.Header closeButton>
                    <Modal.Title>Editar Médico</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.EfetuarEdicao}>
                        <Modal.Body>
                            <Form.Group>
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Digite o nome" name="nome" value={this.state.editarMedico.nome} onChange={this.AtualizaEstadoEditarMedico} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>CRM</Form.Label>
                                <Form.Control type="text" placeholder="Digite o crm" name="crm" value={this.state.editarMedico.crm} onChange={this.AtualizaEstadoEditarMedico} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control type="text" placeholder="Digite o telefone" name="telefone" value={this.state.editarMedico.telefone} onChange={this.AtualizaEstadoEditarMedico} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" placeholder="Digite a cidade" name="cidade" value={this.state.editarMedico.cidade} onChange={this.AtualizaEstadoEditarMedico} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" placeholder="Digite o estado" name="estado" value={this.state.editarMedico.estado} onChange={this.AtualizaEstadoEditarMedico} required/>
                            </Form.Group>                       
                        </Modal.Body>      
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseEditar}>
                                Sair
                            </Button>
                            <Button variant="primary" type="submit">
                                Atualizar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/* {Modal de Especialidade} */}
                <Modal show={this.state.showEspecialidade} onHide={this.handleCloseEspecialidade}>
                    <Modal.Header closeButton>
                        <Modal.Title>Especialidades do Médico</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>                                       
                                        <th colSpan="2">Especialidades</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.especialidades.map(function(especialidade) {
                                            console.log(especialidade.nome);
                                            return (
                                                <tr key={especialidade.id_especialidade}>
                                                    <td>{especialidade.nome}</td>                                        
                                                </tr> 
                                            );
                                        })
                                    }
                                                                                                      
                                </tbody>
                            </Table>
                            <form onSubmit={this.previnir}>
                                <Form.Group>                                
                                    <Form.Label>Adicionar Especialidade ao Médico</Form.Label><br/>
                                    <select name="especialidadeId" id="selectInput" value={this.state.adicionarEspecialidade} onChange={this.AtualizaEstadoEspecialidade}>                                  
                                                <option value="Selecionar especialidade" disabled>Selecionar especialidade</option>
                                       {
                                           this.state.ListaDeEspecialidades.map(function(e) {
                                               return (
                                                <option key={e.id_especialidade} value={e.id_especialidade}>{e.nome}</option>
                                               ); 
                                           })
                                       }                            
                                    </select><br/><br/>
                                    <div className="centralizarButton">
                                        <Button variant="primary" type="submit" size="lg" block onClick={() => this.AdicionarEspecialidade()}>
                                            Adicionar
                                        </Button>
                                    </div>
                                </Form.Group>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCloseEspecialidade} size="lg">
                                Sair
                            </Button>                       
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default withRouter(Medico); // Conserta erros de redirecionamento

 
