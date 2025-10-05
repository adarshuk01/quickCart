import React, { useState } from 'react'

function ShippingAddress({ onContinue }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    zip: '',
    city: '',
    state: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleContinue = () => {
    // Simple validation (you can expand it)
    if (!form.firstName || !form.lastName || !form.address1 || !form.zip || !form.city || !form.state) {
      alert('Please fill all required fields')
      return
    }
    onContinue()
  }

  return (
    <form className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name *"
          value={form.firstName}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name *"
          value={form.lastName}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
      </div>

      <input
        type="text"
        name="address1"
        placeholder="Address 1 - Street or P.O. Box *"
        value={form.address1}
        onChange={handleChange}
        className="border p-3 rounded-md w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="zip"
          placeholder="Zip Code *"
          value={form.zip}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
        <input
          type="text"
          name="city"
          placeholder="City *"
          value={form.city}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
        <input
          type="text"
          name="state"
          placeholder="State *"
          value={form.state}
          onChange={handleChange}
          className="border p-3 rounded-md w-full"
        />
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="mt-4 bg-black text-white px-6 py-3 rounded-md font-medium"
      >
        Continue to payment
      </button>
    </form>
  )
}

export default ShippingAddress
