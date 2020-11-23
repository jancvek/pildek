import React from 'react';
import { useState, useEffect } from 'react';

import ListAll from './ListAll';
import List from './List';

import ListContext from './context/ListContext'
import StoreContext from './context/StoreContext'

import { Container, Row, Col, Button, Collapse } from 'react-bootstrap'

function App() {

  const [data, setData] = useState(null);
  const [dataAll, setDataAll] = useState(null);
  const [open, setOpen] = useState(true);
  const [collapse, setCollapse] = useState(false);

  const onBtnCLick = () => {
    setOpen((open ? false : true));
  }

  // izvede po tem ko je bil element zgrajen
  useEffect(()=>{
    setCollapseDepOnWidth();
  },[]);

  const setCollapseDepOnWidth = () => {
    if(window.innerWidth<995 && collapse == false){
      setCollapse(true);
    }
    else if(window.innerWidth>994 && collapse == true){
      setCollapse(false);
    }
  }

  window.addEventListener('resize', () => {setCollapseDepOnWidth();})

  return (
    <>
    {/* bootstrap css */}
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
      integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
      crossorigin="anonymous"
    />
    
      <ListContext.Provider value={{data, setData}}>
        <Container>
          <div id="change_btn" class="sticky-top d-block d-sm-block d-lg-none">
            <Button variant="warning" onClick={onBtnCLick}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-back" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
            </svg>
            </Button>
          </div>
          <Row>
            <Collapse in={(collapse ? open : true)}>
              <Col lg>
                <h4>Pildek za trgovino:</h4>
                <List/>
              </Col>
            </Collapse>
            <Collapse in={(collapse ? !open : true)}>
              <Col lg id="col_two">
                <h4>Nabor izdelkov:</h4>
                <StoreContext.Provider value={{dataAll, setDataAll}}>
                  <ListAll/>
                </StoreContext.Provider>
              </Col>
            </Collapse>
          </Row>
          </Container>
      </ListContext.Provider>
    </>
  );
}

export default App;