import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Navigation from "./components/Navigation"
import CustomersList from "./pages/CustomersList"
import TrainingsList from "./pages/TrainingsList"


function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/trainings" element={<TrainingsList />} />
      </Routes>
    </>
  )
}

export default App
