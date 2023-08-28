import React from 'react';
import { LoggedOutRouter } from './routers/logged-out-router';
import { useReactiveVar } from '@apollo/client';
import { LoggedInRouter } from './routers/logged-in-router';
import { isLoggedInVar } from './apollo';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log('🚀 | file: App.tsx:13 | data:', isLoggedIn);
  
  return isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
