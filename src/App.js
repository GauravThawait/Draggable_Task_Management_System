import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Forgotpassword from "./pages/auth/Forgotpassword";
import Feed from "./pages/Feed";
import PostForm from "./components/Feed/PostForm";
import Tasks from "./pages/Tasks";
import AppLayout from "./AppLayout";
import PrivateRoute from "./utils/PrivateRoutes";
import AuthProvider from "./utils/AuthContext";

function App() {
  return (
    <AuthProvider>
    <Router>
      <AppLayout>
        <div className="App">
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/forgotpassword" element={<Forgotpassword />} />

            {/* Protect the following routes */}
            <Route 
              exact 
              path="/feed" 
              element={
                <PrivateRoute>
                  <Feed />
                </PrivateRoute>
              } 
            />


            <Route 
              exact 
              path="/form" 
              element={
                <PrivateRoute>
                  <PostForm />
                </PrivateRoute>
              } 
            />


            <Route 
              exact 
              path="/tasks" 
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              } 
            />
          </Routes>
        </div>
      </AppLayout>
    </Router>
    </AuthProvider>
  );
}

export default App;
