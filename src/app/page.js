
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import AuthForm from "@/components/AuthForm";

export default async function Home() {

  return (
    <main className="min-h-screen w-full">
      
      <AuthForm/>
    </main>
  )
}
