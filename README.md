# React Typescript Frontend of Flight Diaries ( Connected to the Flight Diaries Typescript Backend ) 


> You don't need to validate everything before posting to the backend , from the frontend  , like you did in the backend 
> 
> Basic type checks would do .

_The only check needed was to make sure that the NewEntry object has `Weather` and `Visibility` values_

> This is the only type check required on the frontend: 

```javascript
   if (!weather || !visibility) {
      displayError("Weather or Visibility missing");
      return;
    }


//The error display function called 

  const displayError = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

```

---

```javascript

    // The Generically typed Radio component is best suited for Weather and Visibility types :
    interface RadioProps<T> {
      label: string;
      options: T[];
      value: T | null;
      onChange: (value: T) => void;
    }
    
    export default function Radio<T extends string>({ label, options, value, onChange }: RadioProps<T>) {
      return (
        <>
          <h3>
            {label} :{" "}
            {options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  value={option}
                  checked={value === option}
                  onChange={() => onChange(option)}
                />
                {option}
              </label>
            ))}
          </h3>
          <hr />
        </>
      );
    }
    
```

#### While fetching diaries , do look out for error in the axios request by using `axios.isAxiosError` like so : 

```javascript
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

```

> This is how you deal with an axios error : 
>
> https://dev.to/mdmostafizurrahaman/handle-axios-error-in-typescript-4mf9