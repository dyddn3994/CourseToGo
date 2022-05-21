import React, { useState } from "react";
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MainLayout from "../MainLayout";
import Form from "./InputForm";

    const SearchIdPage = () => {
        return(
          <MainLayout>
            <Form type='searchId' />
          </MainLayout>
        );
      };
      

export default SearchIdPage;