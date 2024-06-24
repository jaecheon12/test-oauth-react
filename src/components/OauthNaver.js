import React from 'react';
import styled from "styled-components";
import {ENV_NAVER_CLIENT_ID, ENV_NAVER_REDIRECT_URL} from "../static/config";

// REACT_APP_ENV_NAVER_CLIENT_ID=6hxonjUFTYSqXpGHKloD
// REACT_APP_OAUTH_REDIRECT_URL=https://react.tvcf.co.kr/oauth/callback

const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${ENV_NAVER_CLIENT_ID}&redirect_uri=${ENV_NAVER_REDIRECT_URL}&state=${Math.random()}`;

const OauthNaver = ({ text }) => {
  const naverLogin = () => {
    window.location.href = NAVER_URL;
  };

  return (
    <NaverButton onClick={naverLogin}>
      <NaverLogo src="/images/naverLogo.png"></NaverLogo>
      <NaverText>{text}</NaverText>
    </NaverButton>
  );
};

const NaverButton = styled.button`
  background-color: #03c75a;
  color: white;
  height: 40px;
`

const NaverLogo = styled.img`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 3px;
`

const NaverText = styled.span`
  position: relative;
`

export default OauthNaver;