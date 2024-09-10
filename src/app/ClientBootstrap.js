"use client";
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ClientBootstrap() {
  useEffect(() => {
    // Dynamisk import av Bootstrap JavaScript så att det bara körs på klientsidan
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}
