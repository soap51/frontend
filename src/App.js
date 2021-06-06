import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { PrivateRoute } from "./components/privateRoute";
import { UserProvider } from "./context/userContext";
import {
  LoginScreen,
  RegisterScreen,
  ProfileScreen
} from './screens'

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <PrivateRoute path="/profile/:id">
            <ProfileScreen />
          </PrivateRoute>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/">
            <LoginScreen />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
