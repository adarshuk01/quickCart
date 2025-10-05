import React, { useContext, useState } from 'react'
import InputField from '../components/common/InputField'
import PageHeader from '../components/common/PageHeader'
import Button from '../components/common/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Register() {
    const { signup,loading ,verifyOtp} = useContext(AuthContext)
    const [show,setshow]=useState(false)

    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        otp:''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     const formData = new FormData()
    //     formData.append('firstName', formValues.firstName)
    //     formData.append('lastName', formValues.lastName)
    //     formData.append('email', formValues.email)
    //     formData.append('password', formValues.password)

    //     signup(formData)
    // }

  const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await signup({
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    password: formValues.password,
  });

  if (result.success) {
    setshow(true); // ✅ Show OTP input only on success
  } else {
    alert(result.message); // optional error alert
  }
};

const handleverify=async(e)=>{
 e.preventDefault()
 const result = await verifyOtp({
    firstName: formValues.firstName,
    lastName: formValues.lastName,
    email: formValues.email,
    password: formValues.password,
    otp:formValues.otp
  });


}



    return (
        <div>
            <PageHeader page={'Create Account'} />

            {!show&&

            <form
                onSubmit={handleSubmit}
                className='bg-white space-y-4 max-w-2xl lg:px-6 py-4 my-4 shadow-sm mx-auto p-4'
            >
                <h1 className='font-semibold text-2xl text-gray-800'>Register</h1>
                <InputField
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    label="First Name"
                />
                <InputField
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    label="Last Name"
                />
                <InputField
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    label="Email Address"
                />
                <InputField
                    name="password"
                    type="password"
                    value={formValues.password}
                    onChange={handleChange}
                    label="Password"
                />

                <div className='flex flex-wrap gap-2 justify-between items-center'>
                    <Button loading={loading} disabled={loading} type="submit" label="Register" />
                    <p>
                        Already have an account?{' '}
                        <Link className='text-blue-900 ml-2 underline font-semibold' to='/login'>
                            Login
                        </Link>
                    </p>
                </div>
            </form>}
            {show&&<form onSubmit={handleverify}  className='bg-white space-y-4 max-w-2xl px-6 py-4 my-4 shadow-sm mx-auto' action="">
                <InputField
                    name="otp"
                    type="number"
                    value={formValues.otp}
                    onChange={handleChange}
                    label="Enter OTP"
                />
                    <Button  disabled={loading} loading={loading} type="submit" label="Verify OTP" />

            </form>}
            
        </div>
    )
}

export default Register
