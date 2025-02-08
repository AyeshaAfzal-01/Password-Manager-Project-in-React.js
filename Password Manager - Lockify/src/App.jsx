import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-black to-indigo-600">
      <Navbar />
      <div className="flex-1 flex justify-center items-center w-full">
        <Manager/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
