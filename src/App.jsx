// App.js
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import Slides from "./components/slides";
import Addcities from "./components/Addcities";
import Footer from "./components/footer";
import Weather from "./components/Weather";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './components/styles.css'


function Home() {
  return (
    <>
      <Slides />
      <section className="card mb-5">
        <Addcities/>
      </section>
    </>
  );
}

function App() {
  // const [showWeather, setShowWeather] = useState(false);
  const [loading,setloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <Navbar setSearchQuery={setSearchQuery} />
      <main>
        {loading && (
          <div className="loader"></div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/weather"
            element={<Weather searchQuery={searchQuery} setloading={setloading} />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
