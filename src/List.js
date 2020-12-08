import React, { useContext } from 'react';
import { useState, useEffect } from 'react';

import Item from './Item';
import FormAddNewItem from './forms/FormAddNewItem'
import ListContext from './context/ListContext'

import { ListGroup } from 'react-bootstrap'

function List(props) {

  const {data, setData} = useContext(ListContext);

  // const [data, setData] = useState(0);

  const getData = async () => {
    fetch("/api/getData?table=data")
    .then((resp) => resp.json())
    .then(function(a){
        setData(a);
    })
  };

  // izvede po tem ko je bil element zgrajen
  useEffect(()=>{
    getData();
  },[]);

  if(data){
    // ko dobimo nazaj podatke
    return (
        <div>
            <FormAddNewItem></FormAddNewItem>
            <ListGroup>{data.map((d) => <Item key={d.id} id={d.id} name={d.name} checked={d.is_checked} category={d.category}></Item>)}</ListGroup>
        </div>
      );
  }
  else{
    // v vmesnem času ko pridobivamo podatke
    return (
        <div>Loading...</div>
    )
  }
}

export default List;