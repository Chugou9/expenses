
import {Input} from './Input';
import React, {useState} from 'react';
import './styles';
let j = 0;
export function WithoutMemo() {
  const [text, setText] = useState('');


  const handleInputChange = (key: number) => (value: string) => {
    setText('current input ' + key + ' current value ' + value);
  }


  function renderList() {
  
    let result = [];



    for (var i = 0; i <= 10000; i++) {
      result.push(
        <React.Fragment key={`frag=${i}`}>
          <p key={`paragraph -${i}`}>{i}</p>
          <Input key={i} k={i} onChange={handleInputChange(i)} />
        </React.Fragment>
      )
    }

    return result;
  }

  console.log('block', j++);
  return (
    <div className="text-block">
      <p key={'sdfu'}>{text}</p>
      {renderList()}
    </div>
  )
}