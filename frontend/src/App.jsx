import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import TankAnalysis from "./pages/tankAnalysis";
import DiseaseDetection from "./pages/diseaseDetection";
import Assistant from "./pages/assistant";
import Marketplace from "./pages/marketplace";
import Cart from "./pages/cart";
import OrderSuccess from "./pages/orderSuccess";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/protectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Pages */}

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Protected Pages */}

                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Home />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tank-analysis"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <TankAnalysis />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/disease"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <DiseaseDetection />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/assistant"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Assistant />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/marketplace"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Marketplace />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/order-success"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <OrderSuccess />
                        </ProtectedRoute>
                    }
                />


                {/* Unknown URL */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;