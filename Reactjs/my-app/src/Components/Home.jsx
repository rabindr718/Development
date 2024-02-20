import CNavbar from "./CNavbar";
import CenterHeading from "./CenterHeading";
import Navbar from "./Navbar";
import Item from "./Items";
import Modal from "../Components/Model";
import Explore from "./Explore";
import DownMiddle from "./DownMiddle";
import Pertange from "./Pertange";
import FreeTrial from "./FreeTrial";
const Home = () => {
  return (
    <div>
      <CNavbar></CNavbar>
      <Navbar></Navbar>
      <CenterHeading></CenterHeading>
      <Item></Item>
      <Modal></Modal>
      <Pertange></Pertange>
      <DownMiddle></DownMiddle>
      <Explore></Explore>
      <FreeTrial></FreeTrial>
    </div>
  );
};
export default Home;
