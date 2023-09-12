import React from 'react';
import { LoggedOutRouter } from './routers/logged-out-router';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { LoggedInRouter } from './routers/logged-in-router';
import { isLoggedInVar } from './apollo';

const QueryLocalval = gql`
  {
    isLocalval @client
  }
`;

function App() {
  const { data } = useQuery(QueryLocalval);
  console.log('🚀 | file: App.tsx:15 | queryRet:', data);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log('🚀 | file: App.tsx:13 | data:', isLoggedIn);

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
