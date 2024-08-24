import { useEffect } from 'react';
import { Router } from './Router';

import { supabase } from '@api/supabaseClient';
import { userInfoStore } from '@store/store';
import Header from '@components/layout/Header';

function App() {
  const { userInfo, setUserInfo } = userInfoStore();

  async function getUserInfo() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }

    if (user) {
      setUserInfo(user);
      return user;
    }

    return null;
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Header />
      <Router isLoggedIn={userInfo} />
    </>
  );
}

export default App;
