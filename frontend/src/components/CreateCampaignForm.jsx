import { useState } from 'react';
import axios from 'axios';

const CreateCampaignForm = ({ onCampaignCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [platform, setPlatform] = useState('');
  const [budget, setBudget] = useState('');
  const token = localStorage.getItem('token');

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/campaigns/create`,
        { title, description, platform, budget },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert('✅ Campaign created!');
      setTitle('');
      setDescription('');
      setPlatform('');
      setBudget('');
      onCampaignCreated(); // refresh parent list
    } catch (err) {
      alert(err.response?.data?.message || 'Campaign creation failed');
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-xl mb-6">
      <h3 className="text-lg font-semibold mb-2">➕ Create New Campaign</h3>
      <input className="p-2 border w-full mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="p-2 border w-full mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="p-2 border w-full mb-2" placeholder="Platform" value={platform} onChange={(e) => setPlatform(e.target.value)} />
      <input className="p-2 border w-full mb-2" placeholder="Budget ₹" value={budget} type="number" onChange={(e) => setBudget(e.target.value)} />
      <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
    </div>
  );
};

export default CreateCampaignForm;
