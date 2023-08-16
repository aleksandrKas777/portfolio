import {ReactNode} from "react";

interface ILayout {
  children: ReactNode
}

export const Layout = ({children}: ILayout) => {
  return (
      <div>
        {children}
      </div>
  )
}