import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Navigation from "./components/Navigation"
import CustomersList from "./pages/CustomersList"


function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/trainings" element={<>Hello</>} />
      </Routes>
    </>
  )
}

export default App
