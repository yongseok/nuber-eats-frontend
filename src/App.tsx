import React from 'react';
import { LoggedOutRouter } from './routers/logged-out-router';
import { gql, useQuery } from '@apollo/client';
import { LoggedInRouter } from './routers/logged-in-router';

const IS_LOGGED_IN = gql`
  query isLoggedInLalala {
    isLoggedIn @client
  }
`;

function App() {
  const {
    data: { isLoggedIn },
  } = useQuery(IS_LOGGED_IN);
  console.log('🚀 | file: App.tsx:13 | data:', isLoggedIn);
  
  return isLoggedIn? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
