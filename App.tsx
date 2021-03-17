import * as React from 'react';
import {AuthProvider} from './hooks/auth';
import AppRouter from './router';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
