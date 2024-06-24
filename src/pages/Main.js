import styled from "styled-components";

function Main() {
  return <Flat>
    <div>oauth test app main page</div>
    </Flat>;
}

const Flat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  background-color: #fcf0e0;

  height: calc(100vh - 85px);
`;

export default Main;
