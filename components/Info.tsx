type InfoProps = {
  label: string;
  value?: string | string[];
};

export function Info({ label, value }: InfoProps) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return (
      <div className="mb-3">
        <h5 className="font-bold text-md">{label}</h5>
        <p>-</p>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <h5 className="font-bold text-md">{label}</h5>

      {Array.isArray(value) ? (
        <ul className="list-none list-inside">
          {value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
}
