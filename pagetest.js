import { supabase } from '../lib/supabaseClient';

export default function Test() {
  const handleTest = async () => {
    const { data, error } = await supabase.from('leads').insert([
      {
        name: 'Test',
        email: 'test@test.com',
        phone: '0000000000',
        city: 'Paris',
        type: 'menage',
        surface: 50,
        message: 'Test formulaire',
        unlocked: false
      }
    ]);
    alert(error ? 'Erreur : ' + error.message : 'Lead ajouté avec succès !');
    console.log({ data, error });
  };

  return <button onClick={handleTest}>Test Supabase</button>;
}
