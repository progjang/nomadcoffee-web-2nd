import { ApolloProvider, useReactiveVar } from "@apollo/client";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { client, darkModeVar, isLoggedInVar} from "./apollo";
import {ThemeProvider} from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import routes from "./routes";
import {HelmetProvider} from "react-helmet-async";

function App() {
  const darkMode = useReactiveVar(darkModeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <ApolloProvider client={client}>
    <HelmetProvider>
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme } >
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path={routes.home} exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          {!isLoggedIn ? (
            <Route path={routes.signUp}>
              <SignUp />
            </Route>
          ) : null}
          <Route>
            <h1>404 not found</h1>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
    </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
