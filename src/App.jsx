import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout.jsx";

/* pages */
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePet from "./pages/CreatePet";
import EditPet from "./pages/EditPet";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PetDetail from "./pages/PetDetail";
import Register from "./pages/Register";

// 🔥 LEGG TIL:
import { useInitAuth } from "./hooks/useInitAuth"; // <-- legg til denne importen

/* app component */
function App() {
  useInitAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pet/:id" element={<PetDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="create"
          element={
            <ProtectedRoute>
              <CreatePet />
            </ProtectedRoute>
          }
        />
        <Route
          path="edit/:id"
          element={
            <ProtectedRoute>
              <EditPet />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
