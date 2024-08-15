import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
// import { supabase } from '../supabase/supabaseClient';
import { supabase } from '@api/supabaseClient';
import { userInfoStore } from '@store/store';
import { useCookies } from 'react-cookie';

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
    <div>
      <Form
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
          {/* <Button
            type="primary"
            icon={<GoogleOutlined />}
            onClick={handleSignInWithKakao}
            // loading={loadings[1]} onClick={() => enterLoading(1)}
          >
            Kakao Login
          </Button> */}
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 1080px;
`;

type FieldType = {
  userId?: string;
  password?: string;
  remember?: string;
};
