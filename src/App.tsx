import React from 'react';
import { LoggedOutRouter } from './routers/logged-out-router';
import { gql, useQuery } from '@apollo/client';

const IS_LOGGED_IN = gql`
query isInCart {
  isInCart @client
}
`

function App() {
  const { data } = useQuery(IS_LOGGED_IN);
  console.log('🚀 | file: App.tsx:13 | data:', data);
  
  return <LoggedOutRouter />;
}

export default App;
