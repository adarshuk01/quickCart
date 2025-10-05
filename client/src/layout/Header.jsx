import MiddleBar from "../components/header/MiddleBar";
import NavLinks from "../components/header/NavLinks";
import NavMenu from "../components/header/NavMenu";
import SidebarMenu from "../components/header/SidebarMenu";
import TopBar from "../components/header/TopBar";


const Header = ({toogleshow}) => {
  return (
    <header className="sticky  lg:-top-50 z-50">
      <TopBar />
      <NavLinks/>
      <MiddleBar toogleshow={toogleshow} />
      <NavMenu />
      
    </header>
  );
};

export default Header;
