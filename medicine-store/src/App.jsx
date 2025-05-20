import React, { useState } from 'react';
import MedicineList from './components/MedicineList';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <MedicineList user={user} />
    </div>
  );
}

export default App;
