import { AppContext } from '../context/AppProvider';
import { useContext } from 'react';

const useAppContext = () => useContext(AppContext);

export default useAppContext;
