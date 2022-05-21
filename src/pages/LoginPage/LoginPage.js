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

export default LoginPage;