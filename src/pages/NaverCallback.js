import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { naverCodeForToken } from '../features/api/auth';
import { ENV_BACKEND_BASE_URL, ENV_NAVER_REDIRECT_URL } from '../static/config';


const NaverCallback = () => {
  const navigate = useNavigate();
  // const code = new URLSearchParams(window.location.search).get('code');

  console.log("OAuthCallback")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", urlParams)
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (!code) {
      console.error('No code found in URL');
      navigate('/login');
      return;
    }

    if (!state) {
      console.error('No state found in URL');
      navigate('/login');
      return;
    }

    const exchangeCode = async () => {
      try {
        const res = await naverCodeForToken("/api/sso/v1/naver/token", code, state, ENV_NAVER_REDIRECT_URL);
        console.log("exchangeCode res", res)

        if (res.error) {
          throw new Error(res.error);
        }

        console.log('Token exchange successful', res);
        navigate('/'); // Redirect to home or dashboard
      } catch (error) {
        console.error('Error exchanging code for token:', error.message);
        navigate('/login'); // Redirect back to login on error
      }
    };

    exchangeCode();
  }, [navigate]);

  return <div>Processing OAuth callback...</div>;
};

export default NaverCallback;