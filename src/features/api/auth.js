import axios from "axios";

import {ENV_GOOGLE_CLIENT_ID, ENV_SSO_SERVER_URL, ENV_BACKEND_BASE_URL, ENV_ERRORTEST_BASE_URL} from "../../static/config"

// Axios 인스턴스 기본 설정
const axiosInstance = axios.create({
  baseURL: ENV_BACKEND_BASE_URL,
  headers: {
    "Accept": "application/json",
  },
});


const ssoaxiosInstance = axios.create({
  baseURL: ENV_SSO_SERVER_URL,
  headers: {
    "Accept": "application/json",
  },
});

// 공통 에러 핸들링
const handleError = (error) => {
  console.error(error);
  return error.response ? error.response : {error: "Network Error"};
};

// Auth 헤더 설정
const setAuthHeader = (token) => ({
  "Authorization": `Bearer ${token}`
});

// Content-Type 설정
const setContentType = (type) => ({
  "Content-Type": type,
  "Access-Control-Allow-Origin": "*"
});

export const login = async (user_id, password) => {
  try {
    const response = await ssoaxiosInstance.post(
      '/user/login',
      { user_id, password },
      {
        headers: setContentType("application/x-www-form-urlencoded"),
        withCredentials: true
      }
    );
    return response.data; // Ensure the response data is returned
  } catch (error) {
    return handleError(error);
  }
};

export const logout = async (token) => {
  try {
    const res = await axiosInstance.post('/api/v1/users/logout', {}, {headers: setAuthHeader(token)});
    return res.status === 204;
  } catch (error) {
    return handleError(error);
  }
};

export const getMyProfile = async (token) => {
  try {
    const res = await axiosInstance.get('/api/v1/users/me', {headers: setAuthHeader(token)});
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};


export const getMyProfileWithCookie = async () => {
  try {
    const res = await axiosInstance.get('/api/sso/v1/picture');
    return res;
  } catch (error) {
    return handleError(error);
  }
};

export const signup = async (username, email, password) => {
  try {
    const axiosPost = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    const res = await axiosInstance.post('/api/v1/auth/register', {email, password});
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};


export const myProfile = async (token) => {
  try {
    const res = await axiosInstance.get('/api/v1/user/me', {headers: setAuthHeader(token)});
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const update = async (token, email) => {
  try {
    const res = await axiosInstance.patch('api/v1/user/me', {email}, {headers: setAuthHeader(token)});
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const google_oauth = async (code) => {
  try {
    const res = await axiosInstance.get(`/api/v1/auth/login`,
                                        { params: { "redirect_uri": "https:react.tvcf.co.kr",
                                                    "state": code }});

    console.log("google_oauth res", res)

    return res.data;
  } catch (error) {
    return handleError(error);
  }
};

export const google_oauthCB = async (code) => {
  try {
    const res = await axiosInstance.get(`/api/vi/auth/callback`,
                                        { params: { "response_type": "code",
                                                    "state": code }});
    return res.data;
  } catch (error) {
    return handleError(error);
  }
};


export const naverCodeForToken = async (uri, code, state, redirect_uri) => {
  try {
    const axiosInst = axios.create({
      baseURL: ENV_BACKEND_BASE_URL,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    });

    console.log("exchangeCodeForToken", uri, code, redirect_uri)

    const response = await axiosInst.post(uri, {
      code: code,
      state: state,
      redirect_uri: redirect_uri,
    });

    console.log("exchangeCodeForToken res", response.data)


    return response.data;
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    // Handle error appropriately
    throw error;
  }
};


export const googleCodeForToken = async (uri, code, redirect_uri) => {
  try {
    const axiosInst = axios.create({
      baseURL: ENV_BACKEND_BASE_URL,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    });

    console.log("exchangeCodeForToken", uri, code, redirect_uri)

    const response = await axiosInst.post(uri, {
      code: code,
      redirect_uri: redirect_uri,
    });

    return response.data;

  } catch (error) {
    console.error('Error exchanging code for token:', error);
    // Handle error appropriately
    throw error;
  }
};


function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name + '=') === 0) {
          return c.substring(name.length + 1, c.length);
      }
  }
  return "";
}


function callApiWithToken() {
  const token = getCookie('token');  // 쿠키에서 'token' 이름으로 저장된 값을 가져옵니다.
  const url = 'https://www.testmyapp.com/myprofile';  // API URL 설정

  const xhr = new XMLHttpRequest();  // XMLHttpRequest 객체 생성
  xhr.open('GET', url, true);  // GET 메소드로 요청을 열고, 비동기적으로 설정

  // 요청 헤더에 토큰을 추가
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
          // 요청이 성공적으로 완료됐을 때, 응답을 콘솔에 출력
          console.log('Response:', xhr.responseText);
      } else {
          // 요청이 실패했을 때, 오류 메시지를 콘솔에 출력
          console.error('Request failed:', xhr.statusText);
      }
  };

  xhr.onerror = function () {
      // 네트워크 수준의 오류 처리
      console.error('Request error.');
  };

  xhr.send();  // 요청 전송
}



export const errortest1 = async (uri, code, redirect_uri) => {
  try {
    const axiosInst = axios.create({
      baseURL: ENV_ERRORTEST_BASE_URL
    });

    console.log("exchangeCodeForToken", uri)

    const response = await axiosInst.get(uri);

    console.log("response", response)

    return response.data;

  } catch (error) {
    console.error('Error exchanging code for token:', error);
    // Handle error appropriately
    throw error;
  }
};

// export const errortest2 = async (uri, code, redirect_uri) => {
//   try {
//     const axiosInst = axios.create({
//       baseURL: ENV_ERRORTEST_BASE_URL,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//       },
//       withCredentials: true,
//     });

//     console.log("exchangeCodeForToken", uri, code, redirect_uri)

//     const response = await axiosInst.get(uri);

//     console.log("response", response.data)

//     return response.data;

//   } catch (error) {
//     console.error('Error exchanging code for token:', error);
//     // Handle error appropriately
//     throw error;
//   }
// };
