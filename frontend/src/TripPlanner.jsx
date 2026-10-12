import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TripPlanner() {
  const navigate = useNavigate();

  const [destinations, setDestinations] = useState([]);
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(10000);
  const [interest, setInterest] = useState("Nature");

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // DESTINATION-WISE TOURIST PLACES
  // =====================================================

  const destinationPlaces = {
    Ooty: {
      Nature: [
        "Ooty Lake",
        "Botanical Garden",
        "Doddabetta Peak",
        "Pykara Lake",
        "Pine Forest",
        "Rose Garden",
      ],
      Adventure: [
        "Doddabetta Peak",
        "Pykara Waterfalls",
        "Avalanche",
        "Pine Forest",
        "Emerald Lake",
        "Mountain Trek",
      ],
      History: [
        "Stone House",
        "St. Stephen's Church",
        "Government Museum",
        "Ooty Railway Station",
        "Toda Village",
        "Tea Museum",
      ],
      Food: [
        "Ooty Chocolate Shops",
        "Local Tea Shops",
        "Earl's Secret",
        "Ooty Market",
        "Local Bakery",
        "Tea Factory",
      ],
      Culture: [
        "Toda Village",
        "Tea Factory",
        "Ooty Market",
        "St. Stephen's Church",
        "Government Museum",
        "Rose Garden",
      ],
    },

    Kodaikanal: {
      Nature: [
        "Kodaikanal Lake",
        "Bryant Park",
        "Coaker's Walk",
        "Pillar Rocks",
        "Silver Cascade Falls",
        "Moir Point",
      ],
      Adventure: [
        "Guna Caves",
        "Dolphin's Nose",
        "Pillar Rocks",
        "Moir Point",
        "Forest Trek",
        "Berijam Lake",
      ],
      History: [
        "Kodaikanal Observatory",
        "Kurinji Andavar Temple",
        "Old Church",
        "Kodaikanal Solar Observatory",
        "Heritage Walk",
        "Local Museum",
      ],
      Food: [
        "Local Food Street",
        "Kodaikanal Chocolates",
        "Hilltop Cafés",
        "Local Bakery",
        "Tea Shops",
        "Homemade Cheese Shops",
      ],
      Culture: [
        "Kurinji Andavar Temple",
        "Local Market",
        "Kodaikanal Church",
        "Handicraft Shops",
        "Local Village",
        "Cultural Centre",
      ],
    },

    Munnar: {
      Nature: [
        "Tea Gardens",
        "Mattupetty Dam",
        "Echo Point",
        "Eravikulam National Park",
        "Top Station",
        "Attukad Waterfalls",
      ],
      Adventure: [
        "Eravikulam Trek",
        "Top Station",
        "Kolukkumalai",
        "Mattupetty",
        "Mountain Trek",
        "Forest Adventure",
      ],
      History: [
        "Tea Museum",
        "CSI Church",
        "Old Munnar",
        "Tea Factory",
        "Mattupetty Heritage Area",
        "Local Museum",
      ],
      Food: [
        "Munnar Tea Shops",
        "Local Kerala Restaurant",
        "Spice Market",
        "Tea Factory",
        "Local Bakery",
        "Traditional Restaurant",
      ],
      Culture: [
        "Tea Museum",
        "Spice Market",
        "Local Village",
        "CSI Church",
        "Handicraft Shops",
        "Traditional Kerala Centre",
      ],
    },

    Coorg: {
      Nature: [
        "Abbey Falls",
        "Raja's Seat",
        "Mandalpatti",
        "Dubare Forest",
        "Coffee Plantations",
        "Nisargadhama",
      ],
      Adventure: [
        "Mandalpatti Trek",
        "Dubare Elephant Camp",
        "River Rafting",
        "Forest Trek",
        "Mountain Trail",
        "Camping",
      ],
      History: [
        "Madikeri Fort",
        "Omkareshwara Temple",
        "Raja's Tomb",
        "Nalknad Palace",
        "Museum",
        "Heritage Walk",
      ],
      Food: [
        "Coorg Coffee Estate",
        "Traditional Kodava Restaurant",
        "Local Food Market",
        "Coffee Tasting",
        "Homemade Chocolate Shop",
        "Local Bakery",
      ],
      Culture: [
        "Madikeri Fort",
        "Omkareshwara Temple",
        "Kodava Village",
        "Local Market",
        "Coffee Estate",
        "Traditional Cultural Centre",
      ],
    },

    Goa: {
      Nature: [
        "Baga Beach",
        "Calangute Beach",
        "Dudhsagar Falls",
        "Palolem Beach",
        "Butterfly Beach",
        "Chapora Beach",
      ],
      Adventure: [
        "Water Sports",
        "Scuba Diving",
        "Parasailing",
        "Dudhsagar Trek",
        "Kayaking",
        "Jet Skiing",
      ],
      History: [
        "Basilica of Bom Jesus",
        "Fort Aguada",
        "Chapora Fort",
        "Old Goa",
        "Se Cathedral",
        "Fontainhas",
      ],
      Beach: [
        "Baga Beach",
        "Calangute Beach",
        "Palolem Beach",
        "Anjuna Beach",
        "Candolim Beach",
        "Vagator Beach",
      ],
      Food: [
        "Goan Food Market",
        "Local Seafood Restaurant",
        "Panaji Food Street",
        "Beach Café",
        "Goan Bakery",
        "Local Market",
      ],
      Culture: [
        "Old Goa",
        "Fontainhas",
        "Basilica of Bom Jesus",
        "Goan Cultural Centre",
        "Local Market",
        "Traditional Village",
      ],
    },

    Jaipur: {
      Nature: [
        "Jal Mahal",
        "Central Park",
        "Nahargarh Hills",
        "Sisodia Rani Garden",
        "Ram Niwas Garden",
        "Kanak Vrindavan Garden",
      ],
      Adventure: [
        "Nahargarh Fort Trek",
        "Elephant Village",
        "Hot Air Balloon Ride",
        "Cycling Tour",
        "Hiking Trail",
        "Desert Adventure",
      ],
      History: [
        "Amber Fort",
        "Hawa Mahal",
        "City Palace",
        "Jantar Mantar",
        "Jaigarh Fort",
        "Nahargarh Fort",
      ],
      Food: [
        "Johari Bazaar",
        "Chokhi Dhani",
        "Local Rajasthani Restaurant",
        "MI Road Food Street",
        "Traditional Thali Restaurant",
        "Jaipur Food Market",
      ],
      Culture: [
        "City Palace",
        "Hawa Mahal",
        "Chokhi Dhani",
        "Albert Hall Museum",
        "Johari Bazaar",
        "Rajasthani Cultural Centre",
      ],
    },

    Manali: {
      Nature: [
        "Solang Valley",
        "Rohtang Pass",
        "Hadimba Forest",
        "Beas River",
        "Manali Nature Park",
        "Vashisht Waterfalls",
      ],
      Adventure: [
        "Paragliding",
        "Skiing",
        "River Rafting",
        "Solang Valley",
        "Trekking",
        "Snow Adventure",
      ],
      History: [
        "Hadimba Temple",
        "Vashisht Temple",
        "Manali Old Town",
        "Naggar Castle",
        "Tibetan Monastery",
        "Old Manali",
      ],
      Food: [
        "Old Manali Cafés",
        "Mall Road Food Street",
        "Himachali Restaurant",
        "Tibetan Food Centre",
        "Local Bakery",
        "Mountain Café",
      ],
      Culture: [
        "Hadimba Temple",
        "Tibetan Monastery",
        "Naggar Castle",
        "Old Manali",
        "Himachali Village",
        "Local Handicraft Market",
      ],
    },

    Mysore: {
      Nature: [
        "Brindavan Gardens",
        "Karanji Lake",
        "Kukkarahalli Lake",
        "Mysore Zoo",
        "Chamundi Hills",
        "Ranganathittu Bird Sanctuary",
      ],
      Adventure: [
        "Chamundi Hills Trek",
        "Cycling Tour",
        "Wildlife Safari",
        "Bird Watching",
        "Nature Trail",
        "Adventure Park",
      ],
      History: [
        "Mysore Palace",
        "Jaganmohan Palace",
        "Devaraja Market",
        "Railway Museum",
        "Lalitha Mahal",
        "St. Philomena's Church",
      ],
      Food: [
        "Mysore Pak Shops",
        "Devaraja Market",
        "Mysore Food Street",
        "Traditional Karnataka Restaurant",
        "Local Café",
        "South Indian Restaurant",
      ],
      Culture: [
        "Mysore Palace",
        "Jaganmohan Palace",
        "Devaraja Market",
        "Chamundi Temple",
        "Railway Museum",
        "Cultural Centre",
      ],
    },

    Madurai: {
      Nature: [
        "Vaigai River",
        "Samanar Hills",
        "Alagar Hills",
        "Eco Park",
        "Theppakulam",
        "Athisayam",
      ],
      Adventure: [
        "Samanar Hills Trek",
        "Alagar Hills",
        "Cycling Tour",
        "Nature Walk",
        "Village Exploration",
        "Outdoor Adventure",
      ],
      History: [
        "Meenakshi Amman Temple",
        "Thirumalai Nayakkar Palace",
        "Gandhi Memorial Museum",
        "Vandiyur Mariamman Teppakulam",
        "Thirupparankundram Temple",
        "Keezhadi",
      ],
      Food: [
        "Jigarthanda Shops",
        "Madurai Food Street",
        "Traditional Tamil Restaurant",
        "Banana Leaf Meals",
        "Local Market",
        "Famous Parotta Shops",
      ],
      Culture: [
        "Meenakshi Amman Temple",
        "Thirumalai Nayakkar Palace",
        "Gandhi Museum",
        "Local Market",
        "Temple Street",
        "Traditional Cultural Centre",
      ],
    },

    Chennai: {
      Nature: [
        "Marina Beach",
        "Besant Nagar Beach",
        "Guindy National Park",
        "Elliot's Beach",
        "Semmozhi Poonga",
        "Pulicat Lake",
      ],
      Adventure: [
        "Surfing",
        "Beach Activities",
        "Cycling",
        "Kayaking",
        "Boating",
        "Nature Trail",
      ],
      History: [
        "Fort St. George",
        "Kapaleeshwarar Temple",
        "Government Museum",
        "San Thome Basilica",
        "Vivekananda House",
        "Madras High Court",
      ],
      Beach: [
        "Marina Beach",
        "Elliot's Beach",
        "Besant Nagar Beach",
        "Covelong Beach",
        "Thiruvanmiyur Beach",
        "Neelankarai Beach",
      ],
      Food: [
        "T Nagar Food Street",
        "Marina Beach Food",
        "South Indian Restaurant",
        "Filter Coffee Café",
        "Local Food Market",
        "Traditional Tamil Restaurant",
      ],
      Culture: [
        "Kapaleeshwarar Temple",
        "Fort St. George",
        "Government Museum",
        "Kalakshetra",
        "Vivekananda House",
        "Mylapore",
      ],
    },
  };


  // =====================================================
  // FETCH DESTINATIONS
  // =====================================================

  useEffect(() => {
    fetch("http://localhost:5000/api/destinations")
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setDestinations(data.data);
          setDestination(data.data[0].name);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);


  // =====================================================
  // CREATE TRIP
  // =====================================================

  const createTrip = () => {
    const numberOfDays = Number(days);

    const selectedDestination =
      destinationPlaces[destination];

    let places = [];

    if (selectedDestination) {
      places =
        selectedDestination[interest] ||
        selectedDestination.Nature ||
        [];
    }

    // If selected interest is unavailable,
    // use Nature places instead
    if (places.length === 0) {
      places =
        selectedDestination?.Nature || [
          "Explore Local Attractions",
          "Visit Popular Places",
          "Enjoy Local Experience",
        ];
    }

    const itinerary = [];

    for (let i = 0; i < numberOfDays; i++) {

      const startIndex =
        (i * 2) % places.length;

      const dayPlaces = [
        places[startIndex % places.length],
        places[(startIndex + 1) % places.length],
        places[(startIndex + 2) % places.length],
      ];

      // Remove duplicates
      const uniquePlaces = [
        ...new Set(dayPlaces),
      ];

      itinerary.push({
        day: i + 1,
        places: uniquePlaces,
      });
    }

    setTrip({
      destination,
      days: numberOfDays,
      budget: Number(budget),
      interest,
      itinerary,
    });
  };


  return (
    <div className="planner-page">

      {/* ================= NAVBAR ================= */}

      <nav className="planner-navbar">

        <div
          className="logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          🌍 Smart<span>Tourism</span>
        </div>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Home
        </button>

      </nav>


      {/* ================= MAIN ================= */}

      <div className="planner-container">

        <div className="planner-heading">

          <p className="subtitle">
            SMART TRAVEL PLANNER
          </p>

          <h1>
            Plan Your Perfect Trip ✈️
          </h1>

          <p>
            Choose your destination, duration,
            budget and travel interest.
          </p>

        </div>


        {/* ================= FORM ================= */}

        <div className="planner-form">

          {/* DESTINATION */}

          <div className="form-group">

            <label>
              📍 Destination
            </label>

            {loading ? (

              <select disabled>
                <option>
                  Loading destinations...
                </option>
              </select>

            ) : (

              <select
                value={destination}
                onChange={(e) =>
                  setDestination(e.target.value)
                }
              >

                {destinations.map((place) => (

                  <option
                    key={place._id}
                    value={place.name}
                  >
                    {place.name} — {place.state}
                  </option>

                ))}

              </select>

            )}

          </div>


          {/* DAYS */}

          <div className="form-group">

            <label>
              🗓️ Number of Days
            </label>

            <input
              type="number"
              min="1"
              max="15"
              value={days}
              onChange={(e) =>
                setDays(e.target.value)
              }
            />

          </div>


          {/* BUDGET */}

          <div className="form-group">

            <label>
              💰 Budget
            </label>

            <input
              type="number"
              min="1000"
              value={budget}
              onChange={(e) =>
                setBudget(e.target.value)
              }
            />

          </div>


          {/* INTEREST */}

          <div className="form-group">

            <label>
              ❤️ Travel Interest
            </label>

            <select
              value={interest}
              onChange={(e) =>
                setInterest(e.target.value)
              }
            >

              <option value="Nature">
                🌿 Nature
              </option>

              <option value="Adventure">
                🏔️ Adventure
              </option>

              <option value="History">
                🏛️ History
              </option>

              <option value="Beach">
                🏖️ Beach
              </option>

              <option value="Food">
                🍴 Food
              </option>

              <option value="Culture">
                🎭 Culture
              </option>

            </select>

          </div>


          {/* CREATE */}

          <button
            className="create-trip-btn"
            onClick={createTrip}
            disabled={
              loading ||
              destinations.length === 0
            }
          >
            ✨ Create My Trip
          </button>

        </div>


        {/* ================= ITINERARY ================= */}

        {trip && (

          <div className="itinerary">

            <div className="itinerary-header">

              <p className="subtitle">
                YOUR PERSONALIZED PLAN
              </p>

              <h2>
                {trip.destination} Trip 🌍
              </h2>

              <div className="trip-summary">

                <span>
                  🗓️ {trip.days} Days
                </span>

                <span>
                  💰 ₹
                  {trip.budget.toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span>
                  ❤️ {trip.interest}
                </span>

              </div>

            </div>


            {/* DAILY ITINERARY */}

            {trip.itinerary.map((day) => (

              <div
                className="day-card"
                key={day.day}
              >

                <div className="day-number">
                  DAY {day.day}
                </div>


                <div className="day-content">

                  <h3>
                    Day {day.day} — Explore{" "}
                    {trip.destination}
                  </h3>


                  <div className="places">

                    {day.places.map(
                      (place, index) => (

                        <div
                          className="place"
                          key={place}
                        >

                          <span>
                            {index === 0
                              ? "📍"
                              : index === 1
                              ? "🌿"
                              : "✨"}
                          </span>

                          {place}

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default TripPlanner;