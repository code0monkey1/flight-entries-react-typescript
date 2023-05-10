import axios from "axios";
import { useEffect, useState } from "react";
import { getAllEntries } from "./services/notesService";
import { FormEvent, NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
function App() {
    
  const [entry,setEntry] = useState<Partial<NewDiaryEntry>>()
  const [diaryEntries,setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([])
    
  console.log("entry",entry)
  console.log("diaryEntries",diaryEntries)
  
  const setEntryField=(e:FormEvent)=>{

   setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  }
  useEffect(() => {
   
    const fetchDiaryEntries=async()=>{
            
         try{

          const diaryEntries:NonSensitiveDiaryEntry[]= await getAllEntries();

          setDiaryEntries(diaryEntries)
        }
        catch(err){
           
            let errMsg = "Error : ";
            
            if(axios.isAxiosError(err)){

              errMsg += err.request.data;
            }

            console.error(errMsg)

         }
    }


    fetchDiaryEntries()
  

  },[])

  const onFormSubmit = (e:React.FormEvent)=>{

    e.preventDefault();

    console.log(e.target);

  }

  return (
    <div style={{padding:"2rem"}}>
     
      <form onSubmit={onFormSubmit}> 
          
          <h1>Add new entry</h1>
          <h2>Date : <input name="date" type="date" onChange={setEntryField}/></h2>
          <h2>Weather : 
             <label>
          Select an option:
          <select name="weather" onChange={setEntryField}>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </label>

          </h2>
          <h2>Visibility : </h2>
          <h2>Comment : </h2>
         <button type="submit" >Submit</button>
         
      </form>
      
   <hr/>
   <ol>
      {
        diaryEntries.map(entry=>
          
            <li key={entry.id}>
                  
                  <p>Date :{entry.date} </p>
                  <p>Weather :{entry.weather} </p>
                  <p>Visibility :{entry.visibility} </p>

            </li>)
      }
  </ol>
    </div>
  );
}

export default App;
