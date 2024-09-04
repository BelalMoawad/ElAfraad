import "./App.css";
import Search from "./components/Search";
import SearchWithName from "./components/SearchWithName";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilterWithName from "./components/FilterWithName";
import FilteredSoldier from "./components/FilteredSoldier";
import OffierHelpersVsSoldiers from "./components/OfficerHelpersVsSoldiers";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from './helpers/Header';
import Officers from './components/Officers';
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import FilteredOfficer from "./components/FilteredOfficer";
import AddingForm from "./components/AddingForm";
import OptionalAddingForm from "./components/OptionalAddingForm";
import AddDynamicPhoneNumbers from "./components/AddDynamicPhoneNumbers";
import AddDynamicPunishments from "./components/AddDynamicPunishments";
import AddDynamicVacations from "./components/AddDynamicVacations";
import AddDynamicPromotions from "./components/AddDynamicPromotions";
import SearchWithEndingDate from "./components/SearchWithEndingDate";
import FilterWithEndingDate from "./components/FilterWithEndingDate";
import SearchWithEnteringDate from "./components/SearchWithEnteringDate";
import FilterWithEnteringDate from "./components/FilterWithEnteringDate";
import SearchWithMilitrayNumber from "./components/SearchWithMilitrayNumber";
import FilterWithMilitrayNumber from "./components/FilterWithMilitrayNumber";
import PunishmentShow from "./components/PunishmentShow";
import VacationsShow from "./components/VacationsShow";
import PromotionsShow from "./components/PromotionsShow"; 
import DeletingOfficerOrSoldier from "./components/DeletingOfficerOrSoldier";


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<HomePage />} />
            </Route>
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/search/name" element={<SearchWithName />} />
            <Route exact path="/search/exit_from_army_date" element={<SearchWithEndingDate />} />
            <Route exact path="/search/entering_army_date" element={<SearchWithEnteringDate />} />
            <Route exact path="/search/militray_number" element={<SearchWithMilitrayNumber />} />
            <Route exact path="/add" element={<AddingForm />} />
            <Route exact path="/add/mobile_numbers/:id/:rank/:name/:type" element={<AddDynamicPhoneNumbers />} />
            <Route exact path="/add/punishments/:id/:rank/:name/:type" element={<AddDynamicPunishments />} />
            <Route exact path="/add/vacations/:id/:rank/:name/:type" element={<AddDynamicVacations />} />
            <Route exact path="/add/promotions/:id/:rank/:name/:type" element={<AddDynamicPromotions />} />
            <Route exact path="/add/:id/:rank/:name/:type" element={<OptionalAddingForm />} />
            <Route exact path="/officers" element={<Officers />} />
            <Route exact path="/filter_name/:name/:type" element={<FilterWithName />} />
            <Route exact path="/filterEndingDate/:type/:end" element={<FilterWithEndingDate />} />
            <Route exact path="/filterEnteringDate/:type/:start" element={<FilterWithEnteringDate />} />
            <Route exact path="/filterMilitrayNumner/:type/:milNumber" element={<FilterWithMilitrayNumber />} />
            <Route exact path="/api_soldier/:id" element={<FilteredSoldier />} />
            <Route exact path="/api_officer/:id" element={<FilteredOfficer />} />
            <Route exact path="/filtering/:name" element={<OffierHelpersVsSoldiers />} />
            <Route exact path="/punishments/:id/:type/:rank/:name" element={<PunishmentShow />} />
            <Route exact path="/vacations/:id/:type/:rank/:name" element={<VacationsShow />} />
            <Route exact path="/promotions/:id/:type/:rank/:name" element={<PromotionsShow />} />
            <Route exact path="/deleting/:id/:type" element={<DeletingOfficerOrSoldier />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
