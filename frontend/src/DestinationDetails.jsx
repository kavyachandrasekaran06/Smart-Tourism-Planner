import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/destinations/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Destination not found");
        }

        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setDestination(data.data);
        } else {
          setError("Destination not found");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Unable to load destination");
        setLoading(false);
      });
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="details-message">
        <div className="loading-icon">🌍</div>
        <h2>Discovering destination...</h2>
        <p>Please wait a moment</p>
      </div>
    );
  }

  // Error
  if (error || !destination) {
    return (
      <div className="details-message">
        <div className="error-icon">😔</div>

        <h2>Destination not found</h2>

        <p>
          We couldn't find the destination you're looking for.
        </p>

        <button onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">

      {/* ================= HERO IMAGE ================= */}

      <div className="details-hero">

        <img
          src={destination.image}
          alt={destination.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/1600x700?text=Destination";
          }}
        />

        <div className="details-overlay"></div>

        {/* Back button */}

        <button
          className="details-back-btn"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        {/* Hero text */}

        <div className="details-hero-content">

          <span className="details-location">
            📍 {destination.state}
          </span>

          <h1>
            {destination.name}
          </h1>

          <div className="hero-rating">
            ⭐ {destination.rating} / 5
          </div>

        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="details-content">

        <div className="details-main">

          {/* Description */}

          <div className="details-section">

            <span className="details-small-title">
              ABOUT THE DESTINATION
            </span>

            <h2>
              Discover {destination.name}
            </h2>

            <p className="details-description">
              {destination.description}
            </p>

          </div>


          {/* Information cards */}

          <div className="details-info-grid">

            <div className="info-box">

              <div className="info-icon">
                💰
              </div>

              <div>
                <span>
                  AVERAGE BUDGET
                </span>

                <h3>
                  ₹{destination.averageBudget}
                </h3>

                <p>
                  Estimated trip budget
                </p>
              </div>

            </div>


            <div className="info-box">

              <div className="info-icon">
                🌤️
              </div>

              <div>
                <span>
                  BEST TIME
                </span>

                <h3>
                  {destination.bestTimeToVisit}
                </h3>

                <p>
                  Ideal time to visit
                </p>
              </div>

            </div>


            <div className="info-box">

              <div className="info-icon">
                📍
              </div>

              <div>
                <span>
                  LOCATION
                </span>

                <h3>
                  {destination.state}
                </h3>

                <p>
                  India
                </p>
              </div>

            </div>


            <div className="info-box">

              <div className="info-icon">
                ⭐
              </div>

              <div>
                <span>
                  TRAVEL RATING
                </span>

                <h3>
                  {destination.rating} / 5
                </h3>

                <p>
                  Traveller rating
                </p>
              </div>

            </div>

          </div>


          {/* CTA */}

          <div className="details-cta">

            <div>

              <span>
                READY FOR YOUR NEXT ADVENTURE?
              </span>

              <h2>
                Start planning your trip
              </h2>

              <p>
                Create a personalized itinerary
                for {destination.name}.
              </p>

            </div>

            <button
              onClick={() => navigate("/planner")}
            >
              ✈️ Plan My Trip
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DestinationDetails;