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