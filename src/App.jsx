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
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="animate-fade-in">
        <Slides />
      </div>
      <section className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        <div className="animate-slide-up">
          <Addcities />
        </div>
      </section>
    </div>
  );
}

function App() {
  // const [showWeather, setShowWeather] = useState(false);
  const [loading, setloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
        <Navbar setSearchQuery={setSearchQuery} />
        <main className="flex-grow">
          {loading && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="loader"></div>
            </div>
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
      </div>
    </Router>
  );
}

export default App;
