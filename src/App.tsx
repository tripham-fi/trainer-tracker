import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Navigation from "./components/Navigation"
import CustomersList from "./pages/CustomersList"
import TrainingsList from "./pages/TrainingsList"
import { ModalProvider } from './ModalContext';
import ModalContainer from "./components/modals/ModalContainer"
import CalendarPage from "./pages/CalendarPage"
import "./App.css"
import StatisticsPage from "./pages/StatisticsPage"

function App() {

  return (
    <ModalProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/trainings" element={<TrainingsList />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
      </Routes>
      <ModalContainer />
    </ModalProvider>
  )
}

export default App
