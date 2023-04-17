import { createContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const { message } = await response.json();
        console.log(message); // You can log the success message to the console if you want
        // Set the user state with the response data
        setUser({ email });
      } else {
        const { message } = await response.json();
        console.error(message); // Log the error message to the console
        // Clear the user state
        setUser(null);
      }  };

  const logout = async () => {
    // Implement your logout logic here and clear the user state
  };

  const register = async (email, password) => {
    // Implement your register logic here and set the user state if registration is successful
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
