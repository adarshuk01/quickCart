import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import InputField from '../components/common/InputField';
import Button from '../components/common/Button';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { login, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const location = useLocation();

  // Get previous route if user was redirected from a protected page
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true }); // Redirect to previous page or home
    }
  };

  return (
    <div>
      <PageHeader page="Login" />

      <form
        onSubmit={handleSubmit}
        className="bg-white space-y-4 max-w-2xl lg:px-6 py-4 my-4 shadow-sm mx-auto p-4"
      >
        <h1 className="font-semibold text-2xl text-gray-800">Login</h1>

        <InputField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="flex flex-wrap gap-2 justify-between items-center">
          <Button
            loading={loading}
            disabled={loading}
            label="Login"
            type="submit"
          />
          <p>
            Don't have an account?{' '}
            <Link
              className="text-blue-900 ml-2 underline font-semibold"
              to="/register"
            >
              Create One
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
