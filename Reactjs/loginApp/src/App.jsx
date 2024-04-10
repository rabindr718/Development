import RoutingComponents from "./Routing/RoutingComponents";
import Header from "./Components/Header/Header";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import ProfileModal from "./Components/Modal/ProfileModal";
function App() {
  return (
    <div>
      <Header />
      <div className="appComponent">
        <RoutingComponents />
      </div>
      <Footer />
    </div>
  );
}

export default App;
