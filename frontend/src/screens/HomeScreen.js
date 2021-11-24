import React, {useEffect, useState} from 'react';
import Note from "../components/Note";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function HomeScreen(){
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(()=>{
       const fetchData = async () =>{
           try {
               setLoading(true);
               const {data} = await axios.get('/api/notes');
               setLoading(false);
               setNotes(data);
           }catch (err){
               setError(err.message);
               setLoading(false);
           }
       } ;
       fetchData();
    }, [])
    return (
        <div>
            {loading?<LoadingBox/>
            : error?<MessageBox variant='danger'>{error}</MessageBox>
            : <div className="row center">
                        {notes.map(note => (
                            <Note key={note.id} note={note}></Note>
                        ))}
                    </div>
            }
        </div>
    )
}