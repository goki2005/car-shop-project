import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();

        if (username === "admin" && password === "1234") {

            localStorage.setItem("isAdmin", "true");

            navigate("/admin");

        } else {

            alert("Invalid login details ");

        }
    };

    return (
        <div className="admin-login-page">

            <div className="admin-login-box">

                <h1>Admin Login</h1>

                <form onSubmit={handleLogin} autoComplete="off">

                    <input
                        type="text"
                        name="admin_username"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="off"
                        required
                    />

                    <input
                        type="password"
                        name="admin_password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminLogin;