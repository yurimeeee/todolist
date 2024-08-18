import { useState } from 'react';
import styled from 'styled-components';

import { Button } from 'antd';

import { supabase } from '@api/supabaseClient';
import { userInfoStore } from '@store/store';
import { User } from '@supabase/supabase-js';
import WriteModal from '@components/WriteModal';

type HeaderProps = {
  isLoggedIn: User | null;
};

const Header = ({ isLoggedIn }: HeaderProps) => {
  const { userInfo, setUserInfo } = userInfoStore();
  const [open, setOpen] = useState(false);

  const handleClickSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUserInfo(null);
  };

  const showModal = () => {
    setOpen(true);
  };

  return (
    <Container>
      {userInfo?.email}{' '}
      {userInfo && (
        <>
          <Button type="primary" ghost onClick={showModal}>
            Add to Do
          </Button>
          <WriteModal open={open} setOpen={setOpen} />
          <Button type="primary" onClick={handleClickSignOut}>
            Logout
          </Button>
        </>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 16px;
`;
