import { useState, MutableRefObject } from 'react';
import type { ChangeEvent } from 'react';

const useInput = (
  // validateInput: (input: string) => boolean,
  inputRef: MutableRefObject<HTMLInputElement | null>,
  index: number,
  dispatch: React.Dispatch<ReducerActions>,
  initialValue?: string
) => {
  const [inputValue, setInputValue] = useState<string>(initialValue || '');
  // const [inputFocus, setInputFocus] = useState<boolean>(false);

  function inputValueHandler(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);

    const userInput = (event.target as HTMLInputElement).value;
    dispatch({
      type: 'updateColorNames',
      payload: { index, updatedColorName: userInput },
    });
    setInputValue(() => userInput);
  }

  function inputReset() {
    dispatch({
      type: 'updateColorNames',
      payload: { index, updatedColorName: '' },
    });
    setInputValue('');
    if (inputRef.current) inputRef.current.focus();
  }

  return {
    inputValueHandler,
    inputValue,
    inputReset,
    // inputFocus,
  };
};

export default useInput;
