interface RadioProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

export default function Radio({ label, options, value, onChange }: RadioProps) {
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