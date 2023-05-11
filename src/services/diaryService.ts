import axios from 'axios';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const baseUrl = 'https://641fef8182bea25f6df72478.mockapi.io/api/v1/entries'

export const getDiaries = () =>
  axios.get<NonSensitiveDiaryEntry[]>(baseUrl).then(response => response.data)

export const createDiary = (object: NewDiaryEntry) =>
  axios.post<DiaryEntry[]>(baseUrl, object).then(response => response.data)