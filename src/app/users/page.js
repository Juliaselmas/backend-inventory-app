import { useContext } from "react";
import { AuthContext } from "@/context/auth";
import Link from "next/link";

export default function UserDashboard() {
  const { user } = useContext(AuthContext);  // Använd AuthContext för att hämta den inloggade användaren

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className="min-h-screen w-full">
      <h1>Welcome, {user.name}</h1>
      <section>
        <p>Email: {user.email}</p>
        <p>User ID: {user.id}</p>
      </section>
      <nav>
        <Link href="/items">Manage Items</Link>
      </nav>
    </main>
  );
}
