import axios from "axios";
import { useEffect, useState } from "react";
import { getAllEntries } from "./services/notesService";
import { NewDiaryEntry, NonSensitiveDiaryEntry } from "./types";
function App() {
    
  const [entry,setEntry] = useState<NewDiaryEntry>()
  const [diaryEntries,setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>()
    
  console.log("entry",entry)
  console.log("diaryEntries",diaryEntries)
  
  
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

  return (
    <div style={{padding:"2rem"}}>
     
      <form> 
          
          <h1>Add new entry</h1>
          <h2>Date : </h2>
          <h2>Weather : </h2>
          <h2>Visibility : </h2>
          <h2>Comment : </h2>
         <button type="submit">Submit</button>
         
      </form>
      
   <hr/>
   <ol>
      {
        diaryEntries?.map(entry=>
          
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
