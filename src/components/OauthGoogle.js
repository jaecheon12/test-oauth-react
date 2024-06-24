import React from 'react';
import axios from 'axios';

import styled from "styled-components";
import {ENV_GOOGLE_CLIENT_ID, ENV_GOOGLE_REDIRECT_URL} from "../static/config";

// REACT_APP_ENV_GOOGLE_CLIENT_ID=165160455582-r40lu07und4lv4v6f9t83du39c4f1bto.apps.googleusercontent.com
// REACT_APP_OAUTH_REDIRECT_URL=https://react.tvcf.co.kr/oauth/callback
// const redirect_code="https://react.tvcf.co.kr/google/callback";

// let GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive.metadata.readonly&response_type=code&redirect_uri=${ENV_GOOGLE_REDIRECT_URL}&client_id=${ENV_GOOGLE_CLIENT_ID}`;
const GOOGLE_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=code&redirect_uri=${ENV_GOOGLE_REDIRECT_URL}&client_id=${ENV_GOOGLE_CLIENT_ID}`;


const OauthGoogle = ({ text }) => {
  const googleLogin = () => {
    window.location.href = GOOGLE_URL;
  };

  return (
    <GoogleButton onClick={googleLogin}>
      <GoogleLogo src="/images/googleLogo.png"></GoogleLogo>
      {text}
    </GoogleButton>
  );
};

const GoogleButton = styled.button`
  // background-color: #03c75a;
  color: white;
  height: 40px;
`

const GoogleLogo = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 10px;
  left: 7px;
`

export default OauthGoogle;