import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Navigation from "./components/Navigation"
import CustomersList from "./pages/CustomersList"
import TrainingsList from "./pages/TrainingsList"
import { ModalProvider } from './ModalContext';
import ModalContainer from "./components/modals/ModalContainer"


function App() {

  return (
    <ModalProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customers" element={<CustomersList />} />
        <Route path="/trainings" element={<TrainingsList />} />
      </Routes>
      <ModalContainer />
    </ModalProvider>
  )
}

export default App
