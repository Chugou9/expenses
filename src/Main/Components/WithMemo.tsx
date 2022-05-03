import React, {useCallback, useMemo, useState} from 'react';
import MemoizedInput from './MemoizedInput';
import './styles';


let j = 0;
export function WithMemo() {
  const [text, setText] = useState('');


  const handleInputChange = useCallback((key: number) => (value: string) => {
    setText('current input ' + key + ' current value ' + value);
  }, []);


  const renderList = useMemo(() => {
  
    let result = [];



    for (var i = 0; i <= 10000; i++) {
      result.push(
        <React.Fragment key={`frag=${i}`}>
          <p>{i}</p>
          <MemoizedInput k={i} onChange={handleInputChange(i)} />
        </React.Fragment>
      )
    }

    return result;
  }, [handleInputChange]);

  console.log('block with memo ________________________________________________________________________________________________________________________', j++);
  return (
    <div className="text-block">
      <p key={'sdfu'}>{text}</p>
      {renderList}
    </div>
  )
}
