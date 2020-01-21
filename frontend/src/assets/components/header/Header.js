import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Navbar, Button, Nav, Form} from 'react-bootstrap';


class Header extends Component{
  
    logout = () => {       

        // fetch("http://localhost:3333/api/logout")
        //     .then(response => response.json())
        //     .then((data) => {
        //         console.log("Data ", data);
        //          // Remove o token do localStorage
        //         localStorage.removeItem("usuario-contasimples");

        //     })
        //     .catch(error => console.log(error));            
            localStorage.removeItem("usuario");

            // Redireciona para o endereço "/"
            this.props.history.push("/");
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg" fixed="top" variant="dark">
                <Navbar.Brand href="/home">GCB</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">                     
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/usuarios">Médicos</Nav.Link>
                    </Nav>                        
                    <Form inline>               
                        <Link to="/"onClick={() => this.logout()}> <Button variant="outline-light">Sair</Button></Link>
                    </Form>
                </Navbar.Collapse>
            </Navbar>           

        )
    }
}

export default withRouter(Header); // Conserta erros de redirecionamento

 
