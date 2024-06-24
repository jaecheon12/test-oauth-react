import { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { isExpired } from "react-jwt";
import { errortest1, getMyProfile, logout } from "../features/api/auth";
import { setAccessToken } from "../features/reducers/settingSlice";
import { RootStore } from "../store";
import WebSocketClient from "../util/webSocket";


let wsClient = null

console.log("wsClient", wsClient)

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.settingReducer.accessToken);

  const [userStatus, setUserStatus] = useState(null)
  const [user, setUser] = useState({})

  console.log("accessToken", accessToken)

  const handleGoReport = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleGoLogin = useCallback(async () => {
    if (userStatus === false) {
      console.log("logout")
      if (await logout(localStorage.getItem('access_token'))) {
        localStorage.removeItem('access_token');
        setUserStatus(null);
        navigate("/");
      }
      return;
    }

    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    console.log("header token", token)
    // if (token) {
    //   setUserStatus(isExpired(token))
    // }
  }, [accessToken])

  const handleGoUpdate = useCallback(() => {
    navigate("/update");
  }, [navigate]);

  const handleGoSignup = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  // const handleGoSetting = useCallback(() => {
  //   navigate("/settings");
  // }, [navigate]);
  const handleGoSetting = () => {
    // setAccessToken("")
    dispatch(setAccessToken(""))
    localStorage.setItem('access_token', "")
    // setUserStatus(false)
  }

  const handleCheck = async () => {
    const res = await getMyProfile(localStorage.getItem('access_token'))
    if (res === false) {
      setUser({email: "Unauthorized"})
    }
    else {
      setUser(res)
    }
  }


  const handleConnectEnc = async () => {
    console.log("Enc connect")
    try {
      // wsClient = new WebSocketClient('wss://www.tvcf.co.kr/api_gpu/ws1/A000526905?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIvL3Nzby50dmNmLmNvLmtyIiwiaWF0IjoxNzA5Nzc4ODA5LCJleHAiOjE3MDk4NjUyMDksInJvbGVzIjpbImd1ZXN0IiwidXNlciIsImFkbWluIiwicHJlbWl1bSIsImdvbGQiXSwidXNlcklkIjoiQ0pTNzNTMDAwMDIyNDM5IiwidXNlck5hbWUiOiLstZzsp4Tsi50iLCJ1c2VyVHlwZSI6MywidXNlckxldmVsIjo0fQ.WEoAU7cY4J-FZQH5hwCHTVW27cWpaxlf3quDLVm93H0&events=start_frame');
      wsClient = new WebSocketClient('wss://router.tvcf.co.kr/api/auth/ws');
        // wsClient = new WebSocketClient('ws://www.tvcf.co.kr/api/auth/ws');
        // wsClient = new WebSocketClient('wss://121.124.127.144:50003/api/auth/ws');
      // wsClient = new WebSocketClient('ws://121.124.127.144:50001/api_gpu/ws');
      wsClient.connect();
    } catch (e) {
      console.error(e)
    }
  }


  const handleConnect = async () => {
    try {
      // wsClient = new WebSocketClient('wss://www.tvcf.co.kr/api/auth/ws');
      // wsClient = new WebSocketClient('ws://121.124.127.143:50302/api/auth/ws');
      // wsClient = new WebSocketClient('ws://121.124.127.143:50302/api/auth/ws');
      wsClient = new WebSocketClient('wss://router.tvcf.co.kr/api_gpu/ws');
      // wsClient = new WebSocketClient('wss://121.124.127.144:50003/api/auth/ws');
      wsClient.connect();
    } catch (e) {
      console.error(e)
    }
    // wsClient = new WebSocketClient('wss://tvcf.co.kr:50003/api/auth/ws');
    // // wsClient = new WebSocketClient('wss://www.tvcf.co.kr/api_gpu/ws2/A000526905?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIvL3Nzby50dmNmLmNvLmtyIiwiaWF0IjoxNzA5Nzc4ODA5LCJleHAiOjE3MDk4NjUyMDksInJvbGVzIjpbImd1ZXN0IiwidXNlciIsImFkbWluIiwicHJlbWl1bSIsImdvbGQiXSwidXNlcklkIjoiQ0pTNzNTMDAwMDIyNDM5IiwidXNlck5hbWUiOiLstZzsp4Tsi50iLCJ1c2VyVHlwZSI6MywidXNlckxldmVsIjo0fQ.WEoAU7cY4J-FZQH5hwCHTVW27cWpaxlf3quDLVm93H0&events=start_frame');
    // wsClient.connect();

    console.log("connect")
  }


  const handleSend1 = async () => {
    // console.log("handleSend1", wsClient)
    // wsClient.send('ping');

    const err = await errortest1("/custom-error?data1=13&data2=2")

    console.log("send1 err :", err)
  }



  const handleSend2 = async () => {
    // console.log("handleSend2", wsClient)
    // wsClient.send('ding');

    const err = await errortest1("/custom-error?data1=1&data2=3")

    console.log("send2 err :", err)
  }


  useEffect(() => {
    const token = localStorage.getItem('access_token')
    console.log("token", token)
    if (token) {
      setUserStatus(isExpired(token))
    }
  }, [navigate])

  return (
    <TopHeader>
      <Title onClick={handleGoReport}>test</Title>
      <PageControls>
      </PageControls>
      <CheckButton onClick={handleConnectEnc}>connect Enc</CheckButton>
      <CheckButton onClick={handleConnect}>connect socket</CheckButton>
      <CheckButton onClick={handleSend1}>send</CheckButton>
      <CheckButton onClick={handleSend2}>send</CheckButton>
      <CheckButton onClick={handleCheck}>{user.email}</CheckButton>
      <SettingButton onClick={handleGoLogin}> {accessToken === "" ? <div>login</div> : <div>logout</div>}</SettingButton>
      <SettingButton onClick={handleGoUpdate}>update</SettingButton>
      <SettingButton onClick={handleGoSignup}>signup</SettingButton>
      <SettingButton onClick={handleGoSetting}>Setting</SettingButton>
    </TopHeader>
  );
}

const TopHeader = styled.header`
  display: flex;
  justify-content: stretch;
  width: 100%;
  height: 70px;
  background-color: #344054;
  border: 1px solid #333;
`;

const Title = styled.button`
  width: 200px;
  height: 70px;
  font-weight: bold;
  font-size: 30px;

  color: white;
  background-color: #344054;
  border: 0px solid #333;
`;

const PageControls = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0px;
`;

const CheckButton = styled.button`
  height: 70px;
  width: 150px;
  color: white;
  background-color: #344054;
`;

const SettingButton = styled.button`
  height: 70px;
  width: 100px;
  color: white;
  background-color: #344054;
`;
