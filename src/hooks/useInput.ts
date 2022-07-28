import { useState } from 'react';
import type { ChangeEvent } from 'react';

const useInput = (
  // validateInput: (input: string) => boolean,
  initialValue?: string
) => {
  const [inputValue, setInputValue] = useState<string>(initialValue || '');

  function inputValueHandler(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);

    const userInput = (event.target as HTMLInputElement).value;
    setInputValue(() => userInput);
  }

  function inputReset() {
    setInputValue('');
  }

  return {
    inputValueHandler,
    inputValue,
    inputReset,
  };
};

export default useInput;
