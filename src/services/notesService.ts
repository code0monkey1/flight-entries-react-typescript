
const BASE_URL ="https://641fef8182bea25f6df72478.mockapi.io/api/v1/"
import axios from 'axios';
import { NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

export const getAllEntries=()=>{
   
  return  axios.get<NonSensitiveDiaryEntry[]>(BASE_URL+"entries").then(res => res.data); 
   
}

export const createEntry=(note:NewDiaryEntry)=>{
  return axios.post<NonSensitiveDiaryEntry>(BASE_URL,note).then(res => res.data);
}