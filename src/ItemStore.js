import React from 'react';
import { useState, useEffect, useContext } from 'react';

import ListContext from './context/ListContext'
import { ListGroup, Row, Col, Button } from 'react-bootstrap'

function ItemStore(props) {

    const {data,setData} = useContext(ListContext);
    const [added,setAdded] = useState(data.find((val) => {return val.name === props.name}) ? 'success' : 'primary');

    // izvede pri vsakem render
    useEffect(()=>{
        setAdded(data.find((val) => {return val.name === props.name}) ? 'success' : 'primary');
    });

    const addToData = () =>
    {        
        // check if exist
        fetch("/api/getData?table=data&name="+props.name)
            .then((resp) => {
                if(!resp.ok) throw Error(resp.statusText);
                console.log(resp);
                
                if(resp.status == 204){

                    // no content
                    // add to data
                    fetch("/api/addData?table=data&name="+props.name)
                        .then((r) =>{
                            if(!r.ok) throw Error(r.statusText);
                            return r;
                        })
                        .then((r) => r.json())
                        .then(function(a){
                            console.log("Added row id: "+a.id);
                            setData(data.concat({"id":a.id, "is_checked":0, "name":props.name}));

                        })
                        .catch((er) => console.log(er));
   
                }
            })
            .catch((error) => console.log(error));
    }

    const onClick = () =>
    {    
        console.log("click");
        addToData();
        setAdded('success');
    }

    return (
        <ListGroup.Item key={props.id}>
            <Row>
            <Col xs={9}>
              {props.name}
            </Col>
            <Col xs={3} align="center">
              <Button variant={added} onClick={onClick}>
                <svg width="1.0em" height="1.0em" viewBox="0 0 16 16" class="bi bi-arrow-left-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
    );
}

export default ItemStore;
