import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app d-flex flex-column min-vh-100">
      <AppNavbar />

      <main className="flex-grow-1">
        <Home />
      </main>

      <Footer />
    </div>
  );
}

export default App;