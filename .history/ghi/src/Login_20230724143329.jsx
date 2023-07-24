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
    <div className="row">
      <div className="col-md-6 offset-md-3">
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
  );
};

export default Login;
