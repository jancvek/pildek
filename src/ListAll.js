import React, { useContext } from 'react';
import { useState, useEffect } from 'react';

import ItemStore from './ItemStore';

import FormAddNewStore from './forms/FormAddNewStore'
import StoreContext from './context/StoreContext'

import { ListGroup } from 'react-bootstrap'

function ListAll(props) {

  const {dataAll, setDataAll} = useContext(StoreContext);

  const getData = async () => {
    fetch("/api/getData?table=store")
    .then((resp) => resp.json())
    .then(function(a){
      console.log(a);
        setDataAll(a);
    })
  };

  const addNewItem = async (name) => {
        // check if exist
        fetch("/api/getData?table=store&name="+name)
            .then((resp) => {
                if(!resp.ok) throw Error(resp.statusText);
                console.log(resp);
                
                if(resp.status == 204){

                    // no content
                    // add to data
                    fetch("/api/addData?table=store&name="+name)
                        .then((r) =>{
                            if(!r.ok) throw Error(r.statusText);
                            return r;
                        })
                        .then((r) => r.json())
                        .then(function(a){
                            console.log("Added row id: "+a.id);
                            //setDataAll(dataAll.concat({"id":a.id, "is_checked":0, "name":name}));

                        })
                        .catch((er) => console.log(er));
   
                }
            })
            .catch((error) => console.log(error));
  }

  // izvede po tem ko je bil element zgrajen
  useEffect(()=>{
    getData();
  },[]);

  if(dataAll){
    // ko dobimo nazaj podatke
    return (
        <div>
          <FormAddNewStore></FormAddNewStore>
          <ListGroup>{dataAll.map((val) => <ItemStore key={val.id} id={val.id} name={val.name} store={props.store}></ItemStore>)}</ListGroup>
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

export default ListAll;
