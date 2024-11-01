import React, { useState } from 'react';
import axios from 'axios';

const sampleData = [
  { id: 123, name: 'Produk A' },
  { id: 456, name: 'Produk B' },
  { id: 789, name: 'Produk C' },
];

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedData: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const selectData = (data) => {
    setFormData({ ...formData, selectedData: data });
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/submissions', formData);
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 container">
      <h2 className="text-2xl font-semibold text-center mb-6">Simple Input Form</h2>
      <form onSubmit={handleSubmit} className="bbg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Selected Data:
          </label>
          <input
            type="text"
            value={formData.selectedData ? `ID: ${formData.selectedData.id}, Name: ${formData.selectedData.name}` : ''}
            readOnly
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button type="button" onClick={openModal} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Select Data
          </button>
        </div>
        <button type="submit" className="w-full py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
          Submit
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h3 className="text-lg font-bold mb-4">Select Data</h3>
            <table className="w-full mb-4">
              <thead>
                <tr className="text-left border-b">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      <button onClick={() => selectData(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={() => setIsModalOpen(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
