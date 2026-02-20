// pages/index.js
import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    type: '',
    surface: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('leads')
      .insert([{ ...form, unlocked: false }]); // unlocked=false par défaut

    if (error) {
      alert('Erreur : ' + error.message);
    } else {
      alert('Demande envoyée avec succès ! ✅');
      setForm({ name:'', email:'', phone:'', city:'', type:'', surface:'', message:'' });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded shadow mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Demande Nettoyage</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom" required className="w-full p-2 border rounded"/>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" required className="w-full p-2 border rounded"/>
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Téléphone" required className="w-full p-2 border rounded"/>
        <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" required className="w-full p-2 border rounded"/>
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type (menage/bureaux)" required className="w-full p-2 border rounded"/>
        <input name="surface" value={form.surface} onChange={handleChange} placeholder="Surface (m²)" type="number" required className="w-full p-2 border rounded"/>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Message" required className="w-full p-2 border rounded"/>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700">Envoyer</button>
      </form>
    </div>
  );
}
