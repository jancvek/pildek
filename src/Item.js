import React from 'react';
import { useState, useEffect, useContext } from 'react';

import ListContext from './context/ListContext'
import { ListGroup, Row, Col, Form, Button } from 'react-bootstrap'

function Item(props) {

  const [check, setCheck] = useState(props.checked);
  const {data, setData} = useContext(ListContext);

  const onClick = () => {
    setCheck(check == 1 ? 0 : 1);
    saveData();
  }

  const saveData = () => {
    console.log(check==1?0:1);
    let c = check==1?0:1;
    fetch("http://localhost:5050/setData?check="+c+"&id="+props.id)
    .then((resp) => resp.json())
  }

  const getColor = () =>
  {
      if(check=='1'){
        return '#9fdf9f';
      }else{
        return 'white';
      }
  }

  const getIndexOfById = (id) =>
  {
    
    for(var i = 0; i<data.length; i++)
    {
      var a = data[i];
      if(id == a.id) return i;      
    }
  }

  const onDelete = () =>
  {
    fetch("http://localhost:5050/deleteData?table=data&id="+props.id)
        .then((r) =>{
            if(!r.ok) throw Error(r.statusText);

            var tmp = getIndexOfById(props.id);

            console.log("indexof "+props.name+": "+tmp);
            data.splice(getIndexOfById(props.id),1)
            console.log("new data: ");
            console.log(data.filter((a)=>{return a.id!=props.id}));

            setData(data.filter((a)=>{return a.id!=props.id}));
            
            return r;
        })
        .catch((er) => console.log(er));
  }

  return (
        <ListGroup.Item key={props.id} style={{backgroundColor: getColor()}}>
          <Row>
            <Col xs={2} align="center">
              <Form.Check type="checkbox" checked={check} onChange={onClick}></Form.Check>
            </Col>
            <Col xs={8}>
              {props.name}
            </Col>
            <Col xs={2} align="center">
              <Button onClick={onDelete} variant="danger" size="sm">
                <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
  );
}

export default Item;