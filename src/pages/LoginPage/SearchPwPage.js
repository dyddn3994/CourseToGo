import React, { useState } from "react";
import MainLayout from "../MainLayout";
import Form from "../../components/Login/InputForm";

    const SearchPwPage = () => {
      const [icCheckedId, setIsCheckedId] = useState('false');  //아이디 확인
      const [isCheckedPwd, setIsCheckedPwd] = useState('false');  //비밀번호 확인
      // 입력되는 아이디와 비밀번호
      const [inputs, setInputs] = useState({
        inputName: '',
        inputEmail: ''
      });
    
      const {inputName,inputEmail} = inputs;
    
      const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
          ...inputs,
          [name]: value // name 키를 가진 값을 value 로
        });
      };
     
      const clickedHandler =(e) =>{
        
      };
        return(
      
          <MainLayout>
            <Form type='searchPw'inputs={inputs} onChange ={onChange} clickedHandler={clickedHandler} />
          </MainLayout>
        );
      };
      

export default SearchPwPage;