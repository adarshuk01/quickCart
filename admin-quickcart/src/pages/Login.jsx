import React, { useContext, useState } from 'react';
import InputField from '../common/InputField';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const { adminLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await adminLogin(email, pass);
  };

  return (
    <div className='h-screen flex justify-center items-center'>
      <form 
        onSubmit={handleSubmit} 
        className='flex flex-col w-full gap-4 md:w-[400px] lg:w-[400px] m-4'
      >
        <h2 className='font-bold uppercase text-2xl text-center underline text-blue-800'>
          QuickCart Admin Dashboard
        </h2>

        <InputField 
          label="Username" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <InputField 
          type="password" 
          label="Password" 
          value={pass} 
          onChange={(e) => setPass(e.target.value)} 
        />

        <button className='bg-blue-800 text-white p-3'>
          LOGIN
        </button>
      </form>
    </div>
  );
}

export default Login;
