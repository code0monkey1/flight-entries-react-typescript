import React from 'react'
import { NonSensitiveDiaryEntry } from '../types'
interface IProps {
  diaryEntries:Array<NonSensitiveDiaryEntry>
}
const DiaryEntries = ({diaryEntries}:IProps) => {
  return (
    <>    <h2> Diary Entries</h2>
       <ul>
            {
              diaryEntries.map(entry=>
                
                  <li key={entry.id}>
                        
                        <p>Date :{entry.date} </p>
                        <p>Weather :{entry.weather} </p>
                        <p>Visibility :{entry.visibility} </p>

                  </li>)
            }
      </ul>
    </>
  )
}

export default DiaryEntries