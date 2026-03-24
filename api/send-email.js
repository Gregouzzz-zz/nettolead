import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {

  const { to, lead } = req.body;

  try {
    await resend.emails.send({
      from: 'NettoLead <onboarding@resend.dev>',
      to: to,
      subject: 'Nouveau lead débloqué 🚀',
      html: `
        <h2>Nouveau lead</h2>
        <p><strong>Nom :</strong> ${lead.name}</p>
        <p><strong>Téléphone :</strong> ${lead.phone}</p>
        <p><strong>Email :</strong> ${lead.email}</p>
        <p><strong>Ville :</strong> ${lead.city}</p>
        <p><strong>Demande :</strong> ${lead.message}</p>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}
