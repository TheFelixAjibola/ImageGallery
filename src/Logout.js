import React from "react";
import { auth } from "./firebase";

function Logout() {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Handle successful logout (e.g., redirect to the login page)
    } catch (error) {
      console.error("Logout error:", error.message);
      // Handle logout error (e.g., show an error message)
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
