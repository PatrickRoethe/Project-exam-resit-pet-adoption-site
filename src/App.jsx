import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout.jsx";

/* pages */
import CreatePet from "./pages/CreatePet";
import EditPet from "./pages/EditPet";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PetDetail from "./pages/PetDetail";
import Register from "./pages/Register";

/* app component */
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pet/:id" element={<PetDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="create" element={<CreatePet />} />
        <Route path="edit/:id" element={<EditPet />} />
      </Route>{" "}
    </Routes>
  );
}

export default App;
