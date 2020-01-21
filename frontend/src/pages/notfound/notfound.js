import React from 'react';
import Header from '../../assets/components/header/Header';
import {Jumbotron, Container} from 'react-bootstrap';

function NotFound() {

    return (
        <>
            <Header/>
            <Jumbotron fluid>
                <Container>
                    <h1>Página não encontrada</h1>
                    <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
                    </p>
                </Container>
            </Jumbotron>
          
        </>
    );
}

export default NotFound;
