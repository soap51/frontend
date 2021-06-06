import { ReactNode } from "react"
import { Redirect, Route } from "react-router-dom"
import { useUseContext } from "../../context/userContext";
interface IPrivateRouteProps {
    children: ReactNode
}
export const PrivateRoute = ({ children, ...rest } : IPrivateRouteProps)  =>{
    const [context] = useUseContext();
    return (
      <Route
        {...rest}
        render={({ location }) =>
            context.token ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {from : location}
              }}
            />
          )
        }
      />
    );
  }