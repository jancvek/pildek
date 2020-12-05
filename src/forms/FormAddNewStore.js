import React from 'react';
import { useState, useContext } from 'react';

import StoreContext from '../context/StoreContext'

import { Form, Modal, Button, Nav } from 'react-bootstrap'

function FormAddNewStore() {

    const {dataAll,setDataAll} = useContext(StoreContext);
    const [name, setName] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onSubmit = (event) => {
        event.preventDefault();
        addNewItem();
        setName('');
    }

    const addNewItem = async () =>{
        // check if exist
        fetch("/api/getData?table=store&name="+name)
        .then((resp) => {
            if(!resp.ok) throw Error(resp.statusText);
            console.log(resp);
            
            if(resp.status == 204){

                // no content
                // add to data
                fetch("/api/addData?table=store&name="+name+"&category=1")
                    .then((r) =>{
                        if(!r.ok) throw Error(r.statusText);
                        return r;
                    })
                    .then((r) => r.json())
                    .then(function(a){
                        console.log("Added row id: "+a.id);
                        setDataAll(dataAll.concat({"id":a.id,"name":name}));
                        setShow(false);

                    })
                    .catch((er) => console.log(er));

            }
        })
        .catch((error) => console.log(error));
    }

  return (
    <>
        <Nav className="justify-content-center" activeKey="/home">
            <Button variant="outline-dark" onClick={handleShow}>Dodaj nov izdelek 
                {/* <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg> */}
            </Button>
        </Nav>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Nov izdelek</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit} id="addToStore">
                    <Form.Group>
                        <Form.Control 
                        placeholder="Vpiši ime izdelka:"
                        type="text" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        />
                        <br />
                        <Form.Control as="select">
                            <option value='1'>Sadje in zelenjava</option>
                            <option value='2'>Mlečni izdelki</option>
                            <option value='3'>Delikatesa</option>
                            <option value='50' selected='selected'>Ostalo</option>
                        </Form.Control>
                    </Form.Group>
                </Form>  
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit" form="addToStore">Dodaj</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
}

export default FormAddNewStore;