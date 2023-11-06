import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./fragments/Navbar";
import Footer from "./fragments/Footer";
import MessageContext from "./contexts/MessageContext";
import Dashboard from "./pages/Dashboard";
import Analytics from "./fragments/Analytics";
import MovieList from "./pages/MovieList";
import EditMovie from "./pages/EditMovie";
import AddMovies from "./pages/AddMovies";

export default function App() {
  const [message, setMessage] = useState(null);

  // Set message to null automatically after a period of time.
  useEffect(() => {
    if (message === null)
      return;

    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

  return (
    <div className="d-flex flex-column min-vh-100" >
      <MessageContext.Provider value={{ message, setMessage }}>
        <Router>
          <Navbar />
          <main role="main" sty>
            
            {/* <Dashboard /> */}
            <div className="container my-3">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/movieList" element={<MovieList />} />
                <Route path="/editMovie" element={<EditMovie />} />
                <Route path="/addMovie" element={<AddMovies />} />
              </Routes>
            </div>
            
          </main>
          <Footer />
        </Router>
      </MessageContext.Provider>
    </div>
  );
}
