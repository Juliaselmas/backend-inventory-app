"use client";
import { useAuth } from "@/context/auth";

import Link from "next/link";

function Header() {
  const auth = useAuth();

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <h1 className="navbar-brand">INVENTORY APPLICATION</h1>
        <div>
          {auth.token ? (
            <button className="btn btn-danger" onClick={auth.logout}>
              Logout
            </button>
          ) : (
            <a href="/login" className="btn btn-primary">
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;