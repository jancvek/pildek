import React from 'react';
import { useState, useContext } from 'react';

import StoreContext from '../context/StoreContext'

import { Form } from 'react-bootstrap'

function FormAddNewStore() {

    const {dataAll,setDataAll} = useContext(StoreContext);
    const [name, setName] = useState();

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
                fetch("/api/addData?table=store&name="+name)
                    .then((r) =>{
                        if(!r.ok) throw Error(r.statusText);
                        return r;
                    })
                    .then((r) => r.json())
                    .then(function(a){
                        console.log("Added row id: "+a.id);
                        setDataAll(dataAll.concat({"id":a.id,"name":name}));

                    })
                    .catch((er) => console.log(er));

            }
        })
        .catch((error) => console.log(error));
    }

  return (
    <Form onSubmit={onSubmit}>
        <Form.Control 
            placeholder="Dodaj nov izdelek:"
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
        />
    </Form>  
  );
}

export default FormAddNewStore;