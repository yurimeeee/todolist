import React, { memo, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Home from '@pages/Home';
import Signup from '@pages/Signup';
import Login from '@pages/Login';
import { User } from '@supabase/supabase-js';

// import Loader from '@components/share/Loader';
// import Login from '@pages/Login';

//존재하지 않는 경로로 이동 시 홈으로 리다이렉트
const NotFound = () => <Navigate to="/" />;

type RouterProps = {
  isLoggedIn: User | null;
};

const LoggedOutRoutes = memo(() => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/join" element={<Signup />} />
  </Routes>
));

const LoggedInRoutes = memo(() => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/join" element={<Signup />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
));

// export const Router = () => {
export const Router = ({ isLoggedIn }: RouterProps) => {
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!isLoggedIn) {
    // Logged out Router
    return (
      <>
        {/* <Suspense fallback={<Loader height="100vh" />}> */}
        <LoggedOutRoutes />
        {/* </Suspense> */}
      </>
    );
  }

  return (
    // Logged in Router
    <>
      {/* <Suspense fallback={<Loader height="100vh" />}> */}
      {/* <Wrapper> */}
      {/* // <Header /> */}
      {/* <Components $paddingBottom={location.pathname !== '/' ? 200 : 0}> */}
      <LoggedInRoutes />
      {/* </Components> */}
      {/* </Wrapper> */}
      {/* </Suspense> */}
    </>
  );
};

// const Wrapper = styled.div`
//   width: 100vw;
//   height: 100vh;
//   min-height: 1080px;
// `;
// const Components = styled.div<{ $paddingBottom: number }>`
//   width: 100%;
//   min-width: 1080px;
//   max-width: 1300px;
//   min-height: calc(100vh - 150px);
//   padding-top: 100px;
//   margin: 0 auto;
//   position: relative;
//   overflow-y: scroll;
//   padding-bottom: ${({ $paddingBottom }) => `${$paddingBottom}px`}; // number 타입을 string으로 변환
// `;
