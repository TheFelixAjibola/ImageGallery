import React, { useState } from "react";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [showError, setShowError] = useState(false); // State to control when to show error

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Handle successful login (e.g., redirect to the gallery)
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      setShowError(true);

      // Hide the error message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setShowError(false);
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </div>
              </form>
              {showError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
