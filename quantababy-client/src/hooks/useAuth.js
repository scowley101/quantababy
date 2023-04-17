import { useContext } from 'react';
import { AuthContext } from 'react';

export const useAuth = () => useContext(AuthContext);
