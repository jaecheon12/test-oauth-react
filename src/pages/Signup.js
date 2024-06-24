
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {signup} from "../features/api/auth";

export default function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  
  const navigate = useNavigate();
        
  const onButtonClick = async () => {
      // You'll update this function later...
    const res = await signup(email, email, password1)
    console.log(res)
  }

  return (  <MainContainer>
    <TitleContainer>
      <div>SignUp</div>
    </TitleContainer>
    <br />
    <InputContainer>
      {"username"}
      <InputBox
        value={username}
        placeholder="Enter your username here"
        onChange={ev => setUsername(ev.target.value)}
      />
      <ErrorLabel>{username}</ErrorLabel>
    </InputContainer>
    <br />
    <InputContainer>
      {"email"}
      <InputBox
        value={email}
        placeholder="Enter your email here"
        onChange={ev => setEmail(ev.target.value)}
      />
      <ErrorLabel>{emailError}</ErrorLabel>
    </InputContainer>
    <br />
    <InputContainer>
      {"password"}
      <InputBox
        value={password1}
        placeholder="Enter your password here"
        onChange={ev => setPassword1(ev.target.value)}
      />
      <ErrorLabel>{passwordError}</ErrorLabel>
    </InputContainer>
    <br />
    <InputContainer>
      {"password check"}
      <InputBox
        value={password2}
        placeholder="Enter your password here"
        onChange={ev => setPassword2(ev.target.value)}
      />
      <ErrorLabel>{passwordError}</ErrorLabel>
    </InputContainer>
    <br />
    <InputContainer>
      <InputButton
        type="button"
        onClick={onButtonClick}
        value="Sign up"
      />
    </InputContainer>
  </MainContainer>);
}

const MainContainer = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 100px);
`;


const InputButton = styled.input`
    border: none;
    background: cornflowerblue;
    color: white;
    padding: 12px 24px;
    margin: 8px;
    font-size: 24px;
    border-radius: 8px;
    cursor: pointer;
    `;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 64px;
  font-weight: bolder;
  align-items: center;
  justify-content: center;
`;

const HistoryItem= styled.div`
  flex-direction: row;
  display: flex;
  width: 400px;
  align-items: center;
  justify-content: space-between;
`;

const HistoryContainer = styled.div`
  flex-direction: column;
  display: flex;
  height: 200px;
  align-items: center;
  flex-grow: 5;
  justify-content: flex-start;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 260px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ErrorLabel = styled.div`
  color: red;
  font-size: 12px;
`

const InputBox = styled.input`
  height: 48px;
  width: 400px;
  font-size: large;
  border-radius: 8px;
  border: 1px solid grey;
  padding-left: 8px;
`