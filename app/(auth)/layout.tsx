import style from "./auth.module.css";

export default function Layout({ children }:Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={style["auth-wrapper"]}>
            {children}
        </div>
    )
}