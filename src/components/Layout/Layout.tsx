import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Layout.css";
export function Layout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__content">
        <Header />
        <main className="app-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* <Outlet /> é um "espaço reservado" do React Router. É ali que a página da rota atual (Hoje, Próximas etc.) é encaixada.
 A Sidebar e o Header ficam fixos, e só o conteúdo do Outlet muda. */