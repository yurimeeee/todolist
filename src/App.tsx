import { TabsProps } from 'antd';
import TabMenu from '@components/TabMenu';
import CustomCalendar from '@components/CustomCalendar';
import BoardViewSection from '@components/layout/BoardViewSection';
import WriteModal from '@components/WriteModal';
import FloatInfoBtn from '@components/FloatInfoBtn';
import { Button, Modal, Space } from 'antd';
import AllViewSection from '@components/layout/AllViewSection';
import ListViewSection from '@components/layout/ListViewSection';
import { Router } from './Router';
import { useStore } from 'zustand';
import { userInfoStore } from '@store/store';
import { supabase } from '@api/supabaseClient';
import { useEffect, useState } from 'react';
import Header from '@components/layout/Header';

function App() {
  const { userInfo, setUserInfo } = userInfoStore();

  async function getUserInfo() {
    // Get the user session and user details
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error.message);
      return null;
    }

    // If user exists, log their information
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
      <Header isLoggedIn={userInfo} />
      <Router isLoggedIn={userInfo} />
    </>
    // <div className="App">
    //   <TabMenu tabContents={tabContents} onChange={onChange} />
    //   {/* <WriteModal /> */}
    //   <FloatInfoBtn onClick={info} />
    // </div>
  );
}

export default App;
