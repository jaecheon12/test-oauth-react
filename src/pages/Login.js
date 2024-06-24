
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {login, getMyProfileWithCookie, google_oauth, google_oauthCB} from "../features/api/auth";
import styled from "styled-components";
import { isExpired, decodeToken } from "react-jwt";
import { GoogleLogin  } from '@react-oauth/google';
import OauthNaver from '../components/OauthNaver';
import OauthGoogle from '../components/OauthGoogle';

import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [userInfo, setUserInfo] = useState(null)
  const [authUrl, setAuthUrl] = useState('')

  const handleLogin = async () => {
    if (email === "" && password === "") {
      if (authUrl) {
        console.log("handleLogin res", authUrl)
        return;
      }
    }

    console.log(email, password)

    const res = await login(email, password);

    console.log("handleLogin res", res);

  }

  const handleCheck = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/sso/v1/picture', {
        withCredentials: true
      });

      console.log(res);
    } catch (error) {
      console.error('Error fetching profile with cookie:', error);
    }
  }

  const handleCheck1 = async () => {
    try {
      const res = await axios.get("http://localhost:8000" + '/api/sso/v1/picture1', {
        withCredentials: true
      });

      console.log(res);
    } catch (error) {
      console.error('Error fetching profile with cookie:', error);
    }
  }
  const handleCheck2 = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_SERVER_URL + '/api/sso/v1/picture2', {
        withCredentials: true
      });

      console.log(res);
    } catch (error) {
      console.error('Error fetching profile with cookie:', error);
    }
  }

  return (
  <MainContainer>
    <TitleContainer>
      <div>Login</div>
    </TitleContainer>
    <br />
    <InputContainer>
      <InputBox
        value={email}
        placeholder="Enter your email here"
        onChange={ev => setEmail(ev.target.value)}
      />
      <ErrorLabel>{emailError}</ErrorLabel>
    </InputContainer>
    <br />
    <InputContainer>
      <InputBox
        value={password}
        placeholder="Enter your password here"
        onChange={ev => setPassword(ev.target.value)}
      />
      <ErrorLabel>{passwordError}</ErrorLabel>
    </InputContainer>
    <br />
    {/* <GoogleLogin
      onSuccess={credentialResponse => {
        axios.get(process.env.REACT_APP_FRONT_URL + '/callback', {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
          params: {
            credential: credentialResponse.credential
          }
        }).then(res => {
          console.log("Oauth callback : ", res);
        })}
      }
      onError={() => {
        console.log('Login Failed');
      }}
      useOneTap
    /> */}

    <OauthNaver text="네이버로 계속하기"></OauthNaver>

    <OauthGoogle text="구글로 계속하기"></OauthGoogle>
    <InputContainer>
      <InputButton
        type="button"
        onClick={handleLogin}
        value="Log in"
      />
      <InputButton
        type="button"
        onClick={handleCheck}
        value="Check"
      />
      <InputButton
        type="button"
        onClick={handleCheck1}
        value="Check1"
      />
      <InputButton
        type="button"
        onClick={handleCheck2}
        value="Check2"
      />
    </InputContainer>
    {/*  user2@example.com  */}
    <ColumnContainer>
    {
      userInfo &&
      Object.entries(userInfo).map(([key, value]) => {
        return (
          <RowContainer>
            <div>{key} : {value}</div>
          </RowContainer>
        )
      })
    }
    </ColumnContainer>
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

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;