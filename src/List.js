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
    console.log("PRIDOBIVANJE PODATKOV");
    fetch("/api/getData?table=data")
    .then((resp) => resp.json())
    .then(function(a){
        console.log(a);
        setData(a);
    })
  };

  // izvede po tem ko je bil element zgrajen
  useEffect(()=>{
    console.log("useEffect in LIst!");
    getData();
  },[]);

  if(data){
    // ko dobimo nazaj podatke
    console.log("List se je sestavil");
    return (
        <div>
            <FormAddNewItem></FormAddNewItem>
            <ListGroup>{data.map((val) => <Item id={val.id} name={val.name} checked={val.is_checked}></Item>)}</ListGroup>
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