import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleCodeForToken } from '../features/api/auth';
import { ENV_BACKEND_BASE_URL, ENV_SSO_SERVER_URL, ENV_GOOGLE_REDIRECT_URL } from '../static/config';

const GoogleCallback = () => {
  const navigate = useNavigate();
  console.log("GoogleCallback")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", urlParams)
    const code = urlParams.get('code');

    if (!code) {
      console.error('No code found in URL');
      navigate('/login');
      return;
    }

    const exchangeCode = async () => {
      try {
        const res = await googleCodeForToken(ENV_BACKEND_BASE_URL + ENV_SSO_SERVER_URL + "/google/token", code, ENV_GOOGLE_REDIRECT_URL);
        console.log("exchangeCode res", res)

        if (res.error) {
          throw new Error(res.error);
        }

        navigate('/'); // 인증 성공 후 홈 또는 대시보드로 리디렉션
      } catch (error) {
        console.error('Error exchanging code for token:', error.message);
        navigate('/login'); // Redirect back to login on error
      }
    };

    exchangeCode();
  }, [navigate]);

  return <div>Processing OAuth callback...</div>;
};

export default GoogleCallback;