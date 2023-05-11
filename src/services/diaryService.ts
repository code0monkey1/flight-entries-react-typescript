import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'https://localhost:3000/api/'

export const getDiaries = () =>
  axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then(response => response.data)

export const createDiary = (object: NewDiaryEntry) =>
  axios.post<DiaryEntry[]>(baseUrl, object).then(response => response.data)