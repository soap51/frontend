import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useUseContext } from "../../context/userContext";
import "./card.css";
interface Props {
  children: ReactNode;
}
export const Card = ({ children }: Props) => {
  const [context] = useUseContext();
  return (
    <div className="card">
      {!context.token && (
        <div className="card-header">
          <Link to="/">Login</Link>

          <Link to="/Register">Register</Link>
        </div>
      )}

      {children}
    </div>
  );
};
