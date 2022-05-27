import React from "react";
import styled, { css } from 'styled-components';

import MainLayout from "../MainLayout";
import Form from "./InputForm";

const LoginPage = () => {

  return (

      <MainLayout>
        <Form type='login'/>
      </MainLayout> 
  );
};
//}
// styled components
// div

const LoginDiv =  styled.div`
  text-align: center;
  margin-top:5%;
`;
export default LoginPage;