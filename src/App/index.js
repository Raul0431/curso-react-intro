import React from 'react';
import { AppUI } from './AppUI';
import { TodoProvider } from '../TodoContext';


function App() {

  // Renderizado de la UI "components stateless"
  return(
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}

export default App;
