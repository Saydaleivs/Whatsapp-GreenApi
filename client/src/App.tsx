import * as React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Chat } from './pages/Chat';
import Login from './pages/Login';
import checkAuthStatus from './services/checkAuthStatus';

function App() {
  const [isAuth, setIsAuth] = React.useState<boolean>(checkAuthStatus());

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login setIsAuth={setIsAuth} />} />
        {isAuth && <Route path='/chat' element={<Chat />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
