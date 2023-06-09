export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

// export type Weather = 'sunny' | 'windy' | 'rainy' | 'cloudy';

export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}
export interface DiaryEntry {
      id: number;
      date: string;
      weather: Weather;
      visibility: Visibility;
      comment?: string; // comments are optional
    }

export type NonSensitiveDiaryEntry =Omit<DiaryEntry,'comment'>; 

export type NewDiaryEntry = Omit<DiaryEntry,'id'>;

export type FormEvent =React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>