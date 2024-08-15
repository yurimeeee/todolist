import styled from 'styled-components';

import { Button } from 'antd';

import { supabase } from '@api/supabaseClient';
import { userInfoStore } from '@store/store';
import { User } from '@supabase/supabase-js';

type HeaderProps = {
  isLoggedIn: User | null;
};

const Header = ({ isLoggedIn }: HeaderProps) => {
  const { userInfo, setUserInfo } = userInfoStore();

  const handleClickSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUserInfo(null);
  };

  return (
    <Container>
      {userInfo?.email}{' '}
      {userInfo && (
        <Button type="primary" onClick={handleClickSignOut}>
          Logout
        </Button>
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
