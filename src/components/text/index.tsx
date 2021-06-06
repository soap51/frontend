import { ReactNode } from "react";
import { FONT_TYPE } from "../../constant";

type fontSize = 'h1' | 'p'

interface ITextProp {
  fontSize?: fontSize;
  children?: ReactNode;
  type?: FONT_TYPE;
}

export const Text = ({ children, fontSize, type }: ITextProp) => {
  switch (fontSize) {
    case "h1":
      return <h1 className="text" >{children}</h1>;
    case "p":
    default:
      return <p className="text" style={{color: type === FONT_TYPE.ERROR ? "red" : "black"}}>{children}</p>;
  }
};
