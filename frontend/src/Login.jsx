import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    const endpoint = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    const body = isRegister
      ? {
          name,
          email,
          password,
        }
      : {
          email,
          password,
        };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      if (isRegister) {
        setMessage(
          "Registration successful! Please login."
        );

        setName("");
        setPassword("");
        setIsRegister(false);
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify(data.data)
        );

        setMessage("Login successful! 🎉");

        setTimeout(() => {
          navigate("/");
        }, 800);
      }
    } catch (error) {
      console.error("Authentication Error:", error);

      setMessage(
        "Unable to connect to server. Make sure backend is running."
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-page">

      {/* Left Side */}

      <div className="login-left">

        <div className="login-brand">
          🌍 Smart<span>Tourism</span>
        </div>

        <div className="login-hero">

          <p>
            YOUR JOURNEY STARTS HERE
          </p>

          <h1>
            Explore the world.
            <br />
            Create memories.
          </h1>

          <span>
            Plan your perfect trip with Smart Tourism.
          </span>

        </div>

      </div>


      {/* Right Side */}

      <div className="login-right">

        <div className="login-card">

          <button
            className="login-back"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>


          <div className="login-heading">

            <h2>
              {isRegister
                ? "Create Account"
                : "Welcome Back"}
            </h2>

            <p>
              {isRegister
                ? "Create your Smart Tourism account"
                : "Login to continue your journey"}
            </p>

          </div>


          {/* Form */}

          <form onSubmit={handleSubmit}>

            {isRegister && (

              <div className="login-field">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

              </div>

            )}


            <div className="login-field">

              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            <div className="login-field">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                minLength="6"
                required
              />

            </div>


            {/* Message */}

            {message && (

              <div className="login-message">
                {message}
              </div>

            )}


            {/* Submit */}

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isRegister
                ? "Create Account"
                : "Login"}
            </button>

          </form>


          {/* Switch */}

          <div className="login-switch">

            {isRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setMessage("");
              }}
            >
              {isRegister
                ? " Login"
                : " Register"}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;