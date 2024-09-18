import React, { useState } from 'react';
import styled from 'styled-components';
import type { FormProps } from 'antd';
import { supabase } from '@api/supabaseClient';
import { Button, Checkbox, Form, Input, message } from 'antd';
import ToDoAllSVG from '@assets/img/ToDoAllSVG';

type FieldType = {
  userId?: string;
  password?: string;
  remember?: string;
};

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

  // const onFinish = async (values: any) => {
  //   try {
  //     // 회원가입 (이메일, 비밀번호만 사용)
  //     const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
  //       email: values.email,
  //       password: values.password,

  //       options: {
  //         data: {
  //           //options안 data 객체 안에 key:value형식으로 넣어주면
  //           //raw_user_meta_data에 객체 형태로 저장된다.
  //           email: values.email,
  //           user_name: values.user_name,
  //           avatar_url: null,
  //         },
  //       },
  //       // options: {
  //       //   data: {
  //       //     email: values.email,
  //       //     // user_id: values.user_id,
  //       //     // user_pw: values.password,
  //       //     user_name: values.user_name,
  //       //     avatar_url: '',
  //       //   },
  //       // },
  //     });

  //     // if (signUpError) throw signUpError;

  //     // // 추가 정보 userInfo 테이블에 삽입
  //     // const { data: insertData, error: insertError } = await supabase.from('userInfo').insert([
  //     //   {
  //     //     id: signUpData.user?.id,
  //     //     email: values.email,
  //     //     // user_id: values.user_id,
  //     //     // user_pw: values.password,
  //     //     user_name: values.user_name,
  //     //     avatar_url: '',
  //     //   },
  //     // ]);

  //     // if (insertError) throw insertError;

  //     console.log('가입 완료:', signUpData);
  //     console.log('Sign-up failed: ' + signUpError?.code);
  //     // } catch (error: any) {
  //   } catch (signUpError: any) {
  //     console.log('Sign-up failed: ' + (signUpError as Error).message);
  //     // if (signUpError) {
  //     // const { code, message } = signUpError;

  //     // Check for specific error code
  //     if (signUpError?.code === 'user_already_exists') {
  //       alert('This user is already registered.');
  //       message.error('이미 가입된 이메일 입니다.');
  //     } else {
  //       message.error('회원가입에 실패했습니다. 다시 시도해주세요.');
  //     }
  //     // } else {
  //     //   // console.error('Error:', error);
  //     //   // alert('An unexpected error occurred.');
  //     // }
  //   }
  //   // catch (error) {
  //   //   console.log('Sign-up failed: ' + (error as Error).message);
  //   // }
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
            user_name: values.user_name,
            avatar_url: null,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      message.success('회원가입이 완료되었습니다.');
    } catch (err: any) {
      if (err.code === 'user_already_exists') {
        message.error('이미 가입된 이메일입니다.');
      } else {
        message.error('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
      // console.error('Sign-up failed:', error.message);
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
    <Wrapper>
      <Logo>
        <ToDoAllSVG />
      </Logo>
      {/* <Logo src="" /> */}
      <Form
        name="basic"
        layout="vertical"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
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
        {/* <Form.Item name="email" label="이메일" rules={[{ required: true, message: '이메일을 입력해주세요' }]}> */}
        <Form.Item
          name="email"
          label="이메일"
          rules={[
            {
              type: 'email',
              message: '유효한 이메일 형식이 아닙니다',
            },
            {
              required: true,
              message: '이메일을 입력해주세요',
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item name="user_name" label="이름" rules={[{ required: true, message: '이름을 입력해주세요' }]}>
          <Input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item name="password" label="비밀번호" rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}>
          <Input.Password
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Item>

        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}> */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            가입하기
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

export default Signup;

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
  }
`;
const Logo = styled.div`
  svg {
    width: 140px;
    height: 56px;
  }
`;
