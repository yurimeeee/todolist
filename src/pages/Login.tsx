import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { FormProps } from 'antd';
import { Button, Checkbox, Flex, Form, Input } from 'antd';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
// import { supabase } from '../supabase/supabaseClient';
import { supabase } from '@api/supabaseClient';
import { userInfoStore } from '@store/store';
import { useCookies } from 'react-cookie';
import ToDoAllSVG from '@assets/img/ToDoAllSVG';

type FieldType = {
  userId?: string;
  password?: string;
  remember?: string;
};

function Login() {
  const { userInfo, setUserInfo } = userInfoStore();
  const [cookies, setCookie, removeCookie] = useCookies(['idSave']);
  const [idSaveCheck, setIdSaveCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: 'google',
  //   options: {
  //     queryParams: {
  //       access_type: 'offline',
  //       prompt: 'consent',
  //     },
  //   },
  // })

  const handleSignInWithGoogle = async (response: any) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000',
      },

      // token: response.credential,
      // nonce: '<NONCE>',
    });

    console.log('구글 로그인 data', data);
  };
  // const handleSignInWithKakao = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'kakao',
  //     options: {
  //       redirectTo: 'http://localhost:3000',
  //       scopes: 'profile_image profile_nickname',
  //     },
  //   });

  //   console.log('카카오 로그인 data', data);
  // };
  const handleSignInWithEmail = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log('이메일 로그인 data', data);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // async function getUserInfo() {
  //   // Get the user session and user details
  //   const {
  //     data: { user },
  //     error,
  //   } = await supabase.auth.getUser();

  //   if (error) {
  //     console.error('Error fetching user:', error.message);
  //     return null;
  //   }

  //   // If user exists, log their information
  //   if (user) {
  //     setUserInfo(user);
  //     return user;
  //   }

  //   return null;
  // }

  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  return (
    <Wrapper>
      <Logo>
        <ToDoAllSVG />
      </Logo>
      <Form name="login" initialValues={{ remember: true }} style={{ maxWidth: 600 }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
        <Form.Item name="email" rules={[{ required: true, message: '이메일을 입력해주세요' }]}>
          <Input
            prefix={<UserOutlined />}
            placeholder="이메일"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="비밀번호"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>
        {/* <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>아이디 저장</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item> */}
        <Form.Item name="remember" valuePropName={idSaveCheck ? 'checked' : ''}>
          <Checkbox checked={idSaveCheck} onChange={() => setIdSaveCheck(!idSaveCheck)}>
            아이디 저장
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" onClick={handleSignInWithEmail}>
            로그인
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            icon={<GoogleOutlined />}
            onClick={handleSignInWithGoogle}
            // loading={loadings[1]} onClick={() => enterLoading(1)}
          >
            구글 로그인
          </Button>
          {/* <Button
            type="primary"
            icon={<GoogleOutlined />}
            onClick={handleSignInWithKakao}
            // loading={loadings[1]} onClick={() => enterLoading(1)}
          >
            Kakao Login
          </Button> */}
          <div>
            <a href="">회원가입</a>
          </div>
        </Form.Item>
      </Form>

      {/* <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="email" label="EMAIL" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item name="password" label="PASSWORD" rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName={idSaveCheck ? 'checked' : ''} wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox checked={idSaveCheck} onChange={() => setIdSaveCheck(!idSaveCheck)}>
            아이디 저장
          </Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleSignInWithEmail}>
            Login
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            icon={<GoogleOutlined />}
            onClick={handleSignInWithGoogle}
            // loading={loadings[1]} onClick={() => enterLoading(1)}
          >
            Google Login
          </Button>
        </Form.Item>
      </Form> */}
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;

  .ant-form-item {
    margin-bottom: 12px;
  }

  .ant-form-item-explain-error {
    font-size: 12px;
    margin-top: 4px;
  }
`;

const Logo = styled.div`
  svg {
    width: 140px;
    height: 56px;
  }
`;
