import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-loading">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* NAVBAR */}

      <nav className="profile-navbar">

        <div
          className="profile-logo"
          onClick={() => navigate("/")}
        >
          🌍 Smart<span>Tourism</span>
        </div>

        <button
          className="profile-home-btn"
          onClick={() => navigate("/")}
        >
          ← Home
        </button>

      </nav>


      {/* PROFILE */}

      <main className="profile-container">

        <div className="profile-card">

          <div className="profile-avatar">
            {user.name?.charAt(0).toUpperCase()}
          </div>

          <span className="profile-label">
            SMART TOURISM MEMBER
          </span>

          <h1>
            {user.name}
          </h1>

          <p className="profile-email">
            {user.email}
          </p>


          <div className="profile-info">

            <div className="profile-info-box">

              <span>👤</span>

              <div>
                <small>Name</small>
                <strong>{user.name}</strong>
              </div>

            </div>


            <div className="profile-info-box">

              <span>📧</span>

              <div>
                <small>Email</small>
                <strong>{user.email}</strong>
              </div>

            </div>

          </div>


          <div className="profile-actions">

            <button
              className="profile-plan-btn"
              onClick={() => navigate("/planner")}
            >
              ✈️ Plan a Trip
            </button>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;