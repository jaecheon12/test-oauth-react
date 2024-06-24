import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import GoogleCallback from "./pages/GoogleCallback";
import NaverCallback from "./pages/NaverCallback";
import Header from "./components/Header";
import Test from "./components/Test";
import Update from "./pages/Update";
import { GoogleOAuthProvider  } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from "./static/config";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> */}
          <Header />
          <RowContainer>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/update" element={<Update />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/test" element={<Test />} />
              <Route path="/google/callback" element={<GoogleCallback />} />
              <Route path="/naver/callback" element={<NaverCallback />} />
            </Routes>
          </RowContainer>
        {/* </GoogleOAuthProvider> */}
      </Provider>
    </div>
  );
}

const RowContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font: 1em "Fira Sans", sans-serif;
`;
