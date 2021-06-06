import { ReactNode } from "react";
import "./button.css";
interface IButtonProps {
  children?: ReactNode;
  type?: "button" | "reset" | "submit";
  onSubmit?: () => void;
  onClick?: () => void;
}
export const Button = ({ children, type, onSubmit, onClick }: IButtonProps) => {
  return (
    <button
      className="button"
      type={type}
      onSubmit={onSubmit}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
