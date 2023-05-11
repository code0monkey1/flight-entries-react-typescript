import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3001/api/'

export const getDiaries = () =>
  axios.get<NonSensitiveDiaryEntry[]>(baseUrl+"diaries").then(response => response.data)

export const createDiary = (object: NewDiaryEntry) =>
  axios.post<DiaryEntry[]>(baseUrl+"diaries", object).then(response => response.data)