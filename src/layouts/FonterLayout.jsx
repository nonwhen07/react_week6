import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function FonterLayout() {
  return(
    <>
      <NavBar />
      <main>
        {/* {children} */}
        <Outlet />
      </main>
      <Footer />
    </>
  )
}