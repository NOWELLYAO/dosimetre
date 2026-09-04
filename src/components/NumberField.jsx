import { useEffect, useRef, useState } from "react";

// Champ numérique tolérant : accepte "13,5" ou "13.5", se laisse vider
// entièrement pendant la saisie (pas de "0" qui reste bloqué), et ne
// revalide/normalise qu'à la perte de focus (blur).
export default function NumberField({
  value,
  onChange,
  min,
  max,
  className = "input-num",
  placeholder,
  id,
}) {
  const [text, setText] = useState(formatValue(value));
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      setText(formatValue(value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  function formatValue(v) {
    if (v === null || v === undefined || Number.isNaN(v)) return "";
    return String(v).replace(".", ",");
  }

  function handleChange(e) {
    // n'autorise que chiffres, virgule, point et signe moins
    const raw = e.target.value.replace(/[^0-9,.\-]/g, "");
    setText(raw);

    const normalized = raw.replace(",", ".");
    if (normalized === "" || normalized === "-" || normalized === "." || normalized === "-.") {
      // saisie en cours (champ vide ou incomplet) : on ne force rien visuellement,
      // mais on informe le parent avec 0 pour que les calculs restent cohérents.
      onChange(0);
      return;
    }
    const num = parseFloat(normalized);
    if (!Number.isNaN(num)) {
      onChange(num);
    }
  }

  function handleBlur() {
    isFocused.current = false;
    const normalized = text.replace(",", ".");
    let num = parseFloat(normalized);
    if (Number.isNaN(num)) num = 0;
    if (min !== undefined) num = Math.max(min, num);
    if (max !== undefined) num = Math.min(max, num);
    setText(formatValue(num));
    onChange(num);
  }

  return (
    <input
      id={id}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={text}
      onChange={handleChange}
      onFocus={() => (isFocused.current = true)}
      onBlur={handleBlur}
      className={className}
      placeholder={placeholder}
    />
  );
}
