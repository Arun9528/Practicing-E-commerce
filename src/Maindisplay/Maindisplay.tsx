import MainContent from "../Main/MainContent";
import Sidebar from "../SideBar/SideBar";

export default function Maindisplay(){
    return (
        <div className="grid grid-cols-12">
          <Sidebar/>
          <MainContent/>
      </div>
    )
}