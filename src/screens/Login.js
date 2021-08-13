import { darkModeVar, isLoggedInVar } from "../apollo";
import styled from "styled-components";

const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
`;

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;
function Login() {
    return (
        <Container>
            <Title>Login</Title>
            <button onClick={() => darkModeVar(true)}>To dark</button>
            <button onClick={() => darkModeVar(false)}>To light</button>
            <button onClick={() => isLoggedInVar(true)}>Log in now!</button>
        </Container>
        );
}

export default Login;