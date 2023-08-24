import {ReactNode} from "react";

interface ILayout {
  children: ReactNode
}

export const Layout = ({children}: ILayout) => {
  return (
      <div className={'bg-gradient-to-br from-blue-700 to-blue-200 min-h-screen'}>
        <header className={'p-2 text-2xl text-center text-orange-400 border-b-blue-500 border-b-2'}>XXX</header>
        {children}
      </div>
  )
}