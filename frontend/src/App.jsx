import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import DestinationDetails from "./DestinationDetails";
import TripPlanner from "./TripPlanner";
import Login from "./Login";
import Profile from "./Profile";

import "./App.css";


// ================= HOME PAGE =================

function Home() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Check login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );


  // ================= FETCH DESTINATIONS =================

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data);

        if (data.success) {
          setDestinations(data.data);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Error fetching destinations:",
          error
        );

        setLoading(false);
      });
  }, []);


  // ================= SEARCH =================

  const filteredDestinations = destinations.filter(
    (destination) => {
      const searchText = search.trim().toLowerCase();

      if (searchText === "") {
        return true;
      }

      const name =
        destination.name?.toLowerCase() || "";

      const state =
        destination.state?.toLowerCase() || "";

      return (
        name.includes(searchText) ||
        state.includes(searchText)
      );
    }
  );


  // ================= SEARCH BUTTON =================

  const handleSearch = () => {
    document
      .getElementById("explore")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };


  // ================= PROFILE CHECK =================

  const handleProfileClick = () => {
    const user = localStorage.getItem("user");

    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };


  return (
    <div className="app">


      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="navbar">

        {/* LOGO */}

        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <span className="logo-icon">
            🌍
          </span>

          Smart<span>Tourism</span>
        </div>


        {/* NAV LINKS */}

        <div className="nav-links">

          <a href="#home">
            Home
          </a>

          <a href="#explore">
            Explore
          </a>

          <a href="#planner">
            Trip Planner
          </a>

          <a href="#about">
            About
          </a>

        </div>


        {/* LOGIN / PROFILE */}

        {isLoggedIn ? (

          <button
            className="login-btn"
            onClick={handleProfileClick}
          >
            👤 Profile
          </button>

        ) : (

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        )}

      </nav>


      {/* =================================================
          HERO
      ================================================= */}

      <section
        className="hero"
        id="home"
      >

        <div className="hero-overlay"></div>


        <div className="hero-content">

          <div className="hero-badge">
            ✨ SMART TRAVEL EXPERIENCE
          </div>


          <h1>
            Explore.
            <br />

            <span>Plan. Travel.</span>
          </h1>


          <p className="hero-text">
            Discover incredible destinations across
            India and create unforgettable journeys
            with Smart Tourism.
          </p>


          {/* SEARCH */}

          <div className="search-box">

            <div className="search-icon">
              🔍
            </div>


            <input
              type="text"
              placeholder="Where do you want to go?"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  handleSearch();
                }

              }}
            />


            <button
              onClick={handleSearch}
            >
              Search
            </button>

          </div>


          {/* FEATURES */}

          <div className="hero-features">

            <span>
              ✓ Personalized Trips
            </span>

            <span>
              ✓ Smart Itineraries
            </span>

            <span>
              ✓ Discover India
            </span>

          </div>

        </div>


        {/* SCROLL */}

        <div className="hero-scroll">

          <span>
            SCROLL TO EXPLORE
          </span>

          <div>
            ↓
          </div>

        </div>

      </section>


      {/* =================================================
          DESTINATIONS
      ================================================= */}

      <section
        className="destinations"
        id="explore"
      >

        <div className="section-heading">

          <div>

            <span className="section-label">
              DISCOVER INDIA
            </span>


            <h2>
              {search.trim()
                ? `Results for "${search}"`
                : "Popular Destinations"}
            </h2>


            <p>
              Find your next unforgettable adventure.
            </p>

          </div>


          {!search.trim() && (

            <button
              className="view-all-btn"
              onClick={() =>
                document
                  .getElementById("explore")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore All →
            </button>

          )}

        </div>


        {/* DESTINATION GRID */}

        {loading ? (

          <div className="loading-box">

            <div className="loading-spinner"></div>

            <p>
              Discovering amazing destinations...
            </p>

          </div>

        ) : (

          <div className="destination-grid">

            {filteredDestinations.length > 0 ? (

              filteredDestinations.map(
                (destination, index) => (

                  <DestinationCard
                    key={destination._id}
                    destination={destination}
                    index={index}
                  />

                )
              )

            ) : (

              <div className="no-data">

                <div>
                  🔍
                </div>

                <h3>
                  Destination not found
                </h3>

                <p>
                  Try searching for another destination.
                </p>


                <button
                  onClick={() => setSearch("")}
                >
                  Clear Search
                </button>

              </div>

            )}

          </div>

        )}

      </section>


      {/* =================================================
          STATS
      ================================================= */}

      <section className="stats-section">

        <div className="stat">

          <strong>
            100+
          </strong>

          <span>
            Destinations
          </span>

        </div>


        <div className="stat">

          <strong>
            6
          </strong>

          <span>
            Travel Interests
          </span>

        </div>


        <div className="stat">

          <strong>
            ∞
          </strong>

          <span>
            Adventures
          </span>

        </div>


        <div className="stat">

          <strong>
            24/7
          </strong>

          <span>
            Travel Planning
          </span>

        </div>

      </section>


      {/* =================================================
          TRIP PLANNER
      ================================================= */}

      <section
        className="planner"
        id="planner"
      >

        <div className="planner-decoration">
          ✈️
        </div>


        <div className="planner-content">

          <span className="section-label">
            PLAN YOUR JOURNEY
          </span>


          <h2>
            Your next adventure
            <br />
            starts here.
          </h2>


          <p>
            Choose your destination, duration,
            budget and interests. Let Smart Tourism
            create a personalized itinerary for you.
          </p>


          <button
            className="planner-btn"
            onClick={() =>
              navigate("/planner")
            }
          >
            Start Planning

            <span>
              →
            </span>

          </button>

        </div>

      </section>


      {/* =================================================
          FOOTER
      ================================================= */}

      <footer id="about">

        <div className="footer-main">


          {/* BRAND */}

          <div className="footer-brand">

            <div className="footer-logo">

              🌍 Smart<span>Tourism</span>

            </div>


            <p>
              Explore. Plan. Travel.
            </p>


            <p className="footer-description">
              Making travel planning smarter,
              simpler and more memorable.
            </p>

          </div>


          {/* EXPLORE */}

          <div className="footer-links">

            <h4>
              Explore
            </h4>

            <a href="#home">
              Home
            </a>

            <a href="#explore">
              Destinations
            </a>

            <a href="#planner">
              Trip Planner
            </a>

          </div>


          {/* SMART TOURISM */}

          <div className="footer-links">

            <h4>
              Smart Tourism
            </h4>

            <a href="#about">
              About Us
            </a>

            <a href="#explore">
              Discover India
            </a>

            <a
              href="/profile"
              onClick={(e) => {

                if (!localStorage.getItem("user")) {
                  e.preventDefault();
                  navigate("/login");
                }

              }}
            >
              My Profile
            </a>

          </div>

        </div>


        {/* FOOTER BOTTOM */}

        <div className="footer-bottom">

          <span>
            © 2026 Smart Tourism Planner
          </span>

          <span>
            Made for travellers ❤️
          </span>

        </div>

      </footer>

    </div>
  );
}


// =====================================================
// DESTINATION CARD
// =====================================================

function DestinationCard({
  destination,
  index,
}) {

  const navigate = useNavigate();


  return (

    <article
      className="destination-card"
      style={{
        animationDelay:
          `${index * 0.08}s`,
      }}
    >

      {/* IMAGE */}

      <div className="destination-image">

        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          onError={(e) => {

            e.target.src =
              "https://via.placeholder.com/800x600?text=No+Image";

          }}
        />


        <div className="image-overlay"></div>


        {/* RATING */}

        <div className="rating-badge">

          ⭐ {destination.rating || "4.5"}

        </div>


        {/* LOCATION */}

        <div className="location-badge">

          📍 {destination.state}

        </div>

      </div>


      {/* CARD CONTENT */}

      <div className="card-content">

        <h3>
          {destination.name}
        </h3>


        <p>
          {destination.description}
        </p>


        <div className="card-bottom">


          {/* BUDGET */}

          <div className="budget">

            <span>
              FROM
            </span>

            <strong>
              ₹{destination.averageBudget}
            </strong>

          </div>


          {/* EXPLORE */}

          <button
            className="explore-btn"
            onClick={() =>
              navigate(
                `/destination/${destination._id}`
              )
            }
          >
            Explore

            <span>
              →
            </span>

          </button>

        </div>

      </div>

    </article>

  );
}


// =====================================================
// MAIN APP
// =====================================================

function App() {

  return (

    <BrowserRouter>

      <Routes>


        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* DESTINATION DETAILS */}

        <Route
          path="/destination/:id"
          element={<DestinationDetails />}
        />


        {/* TRIP PLANNER */}

        <Route
          path="/planner"
          element={<TripPlanner />}
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* PROFILE */}

        <Route
          path="/profile"
          element={<Profile />}
        />


      </Routes>

    </BrowserRouter>

  );
}


export default App;