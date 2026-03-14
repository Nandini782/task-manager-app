import { useState } from "react";
import API from "../api/api";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", form);

    alert("Registered successfully");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button>Register</button>
    </form>
  );
}

export default Register;