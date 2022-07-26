import { useState } from 'react';

export const useLoading = (asyncCallback: any, ...args: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  setIsLoading(true);
  console.log('LOADING');

  const getResponse: Function = () => {
    return asyncCallback(...args).then(() => setIsLoading(false));
  };

  return [getResponse, isLoading];
};
