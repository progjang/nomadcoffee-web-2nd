import { useReactiveVar } from "@apollo/client";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { darkModeVar, isLoggedInVar} from "./apollo";
import {ThemeProvider} from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const darkMode = useReactiveVar(darkModeVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme } >
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/">
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            <h1>404 not found</h1>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
