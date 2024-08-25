import React, { useState } from 'react';
import styled from 'styled-components';
import type { FormProps } from 'antd';
import { supabase } from '@api/supabaseClient';
import { Button, Checkbox, Form, Input } from 'antd';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  // const onFinish = async (values: any) => {
  //   const { data, error } = await supabase.auth.signUp({
  //     email: values.email,
  //     password: values.password,
  //   });

  //   if (error) {
  //     throw error;
  //   }

  //   const userData = await supabase.from('userInfo').insert({
  //     id: data.user?.id,
  //     email: values.email,
  //     // user_id: values.user_id,
  //     // user_pw: values.password,
  //     user_name: values.user_name,
  //     avatar_url: '',
  //   });

  //   console.log(userData);
  //   alert('회원가입');
  // };

  const onFinish = async (values: any) => {
    try {
      // 회원가입 (이메일, 비밀번호만 사용)
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,

        options: {
          data: {
            email: values.email,
            // user_id: values.user_id,
            // user_pw: values.password,
            user_name: values.user_name,
            avatar_url: '',
          },
        },
      });

      // if (signUpError) throw signUpError;

      // // 추가 정보 userInfo 테이블에 삽입
      const { data: insertData, error: insertError } = await supabase.from('userInfo').insert([
        {
          id: signUpData.user?.id,
          email: values.email,
          // user_id: values.user_id,
          // user_pw: values.password,
          user_name: values.user_name,
          avatar_url: '',
        },
      ]);

      if (insertError) throw insertError;

      console.log('가입 완료:', signUpData);
    } catch (error) {
      console.log('Sign-up failed: ' + (error as Error).message);
    }
  };

  // const onFinish = async (values: any) => {
  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email: values.email,
  //       password: values.password,
  //       options: {
  //         data: {
  //           user_email: values.email,
  //           user_id: values.user_id,
  //           user_pw: values.password,
  //           user_name: values.user_name,
  //           avatar_url: '',
  //         },
  //       },
  //     });
  //     if (error) {
  //       throw error;
  //     }

  //     console.log('가입 완료 data', data);
  //   } catch (error) {
  //     console.log('Sign-up failed: ' + (error as Error).message);
  //   }
  // };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // const handleSignUp = async () => {
  //   const { data, error } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //     options: {
  //       data: {
  //         user_id: userId,
  //         user_name: userName,
  //         avatar_url: '',
  //       },
  //     },
  //   });

  //   console.log('가입 완료 data', data);
  // };

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
        {/* <Form.Item name="user_id" label="ID" rules={[{ required: true, message: 'Please input your ID!' }]}>
          <Input
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
        </Form.Item> */}
        <Form.Item name="email" label="EMAIL" rules={[{ required: true, message: 'Please input your Email!' }]}>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item name="user_name" label="NAME" rules={[{ required: true, message: 'Please input your Name!' }]}>
          <Input
            onChange={(e) => {
              setUserName(e.target.value);
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signup;

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
