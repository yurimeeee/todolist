import styled from 'styled-components';
import { Button, Flex } from 'antd';

import { supabase } from '@api/supabaseClient';
import { modalStore, userInfoStore } from '@store/store';
import { PlusOutlined } from '@ant-design/icons';
import ToDoAllSVG from '@assets/img/ToDoAllSVG';

const Header = () => {
  const { userInfo, setUserInfo } = userInfoStore();
  const { setIsOpen, setIsUpateMode } = modalStore();

  const handleClickSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUserInfo(null);
  };

  return (
    <Container>
      <ToDoAllSVG />
      {userInfo && (
        <Flex gap={8} align="center">
          {/* {userInfo.email}{' '} */}
          <Button
            type="primary"
            ghost
            onClick={() => {
              setIsOpen(true);
              setIsUpateMode(false);
            }}
          >
            <PlusOutlined /> 일정 추가
          </Button>
          <Button type="primary" onClick={handleClickSignOut}>
            로그아웃
          </Button>
        </Flex>
      )}
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
`;
const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
