import React, {useState} from 'react';

interface IOwnProps {
  onChange: (value: string) => void;
  k: number
}
let i = 0;
export function Input({
  onChange,
  k
}: IOwnProps) {

  const [value, setValue] = useState('');

  function handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    setValue(value);
    onChange(value);
  }

  console.log('input ' + k + ' ' + i++);
  return (
    <input value={value} onChange={handleChange}/>
  )

}