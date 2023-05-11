import axios from "axios";
import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import RadioList from './components/RadioList';
import { createDiary, getDiaries } from './services/diaryService';
import { NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather } from "./types";
function App() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [visibility, setVisibility] = useState<Visibility | null>(null);
  const [comment, setComment] = useState("");
  const [date, setDate] = useState("");
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [notification, setNotification] = useState("");

  console.log("diaryEntries", diaryEntries);

  const displayError = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const diaryEntries: NonSensitiveDiaryEntry[] = await getDiaries();
        setDiaryEntries(diaryEntries);
      } catch (err) {
        let errMsg = "Error : ";
        if (axios.isAxiosError(err)) {
          errMsg += err.request.data;
        }
        console.error(errMsg);
      }
    };

    fetchDiaryEntries();
  }, []);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!weather || !visibility) {
      displayError("Weather or Visibility missing");
      return;
    }

    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment,
    };

    createDiary(newEntry)
      .then((data) => {
        console.log("The newly created entry is", JSON.stringify(data, null, 2));
        setDiaryEntries(diaryEntries.concat(data));
      })
      .catch((e) => {
        let errorMessage = "Error :";

        if (axios.isAxiosError(e)) {
          errorMessage +=
            e.response && e.response.data
              ? e.response.data.replace("Something went wrong. ", "")
              : "Addition failed, reason unknown...";
        }

        displayError(errorMessage);
      });
  };

  return (
    <div style={{ padding: "2rem" }}>
      {notification && <h3 style={{ border: "red 2px solid" }}>{notification}</h3>}

      <form onSubmit={onFormSubmit}>
        <h1>Add new entry</h1>
        <h3>
          Date :{" "}
          <input
            name="date"
            type="date"
            defaultValue={new Date().toISOString().slice(0, 10)}
            onChange={({ target }) => setDate(target.value)}
          />
        </h3>

        <RadioList
          label="Weather"
          options={Object.values(Weather)}
          value={weather}
          onChange={setWeather}
        />

        <RadioList
          label="Visibility"
          options={Object.values(Visibility)}
          value={visibility}
          onChange={setVisibility}
        />

        <h3>
          Comment : <textarea name="comment" onChange={({ target }) => setComment(target.value)} />
        </h3>

        <button type="submit">Submit</button>
        <br />
        <DiaryEntries diaryEntries={diaryEntries.sort((a, b) => b.id - a.id)} />
      </form>

      <hr />
    </div>
  );
}

export default App;


