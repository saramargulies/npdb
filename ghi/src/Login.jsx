import { useLoginMutation } from "./app/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="spacer"></div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="Login__username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="Login__username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Login__password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="Login__password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: "#bfac95"}}>
              Don't have an account? Sign up now and enjoy a world of possibilities.
            </div>
            <div className="card-body" style={{ backgroundColor: "#f2e2c4"}}>
              <blockquote className="blockquote mb-0" >
                <p>There is no Wi-Fi in the forest, but I promise you will find a better connection.</p>
                <footer className="blockquote-footer">Unknown</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default Login;
