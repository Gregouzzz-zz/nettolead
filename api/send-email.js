export default async function handler(req, res) {

  // 🔥 IMPORTANT pour Vercel (HTML project)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { to, lead } = req.body;

    console.log("EMAIL ENVOYÉ À :", to);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: to,
        subject: "Nouveau lead 🚀",
        html: `
          <h2>Nouveau lead débloqué</h2>
          <p><strong>Nom :</strong> ${lead.name}</p>
          <p><strong>Ville :</strong> ${lead.city}</p>
          <p><strong>Téléphone :</strong> ${lead.phone}</p>
          <p><strong>Email :</strong> ${lead.email}</p>
        `
      })
    });

    const data = await response.json();

    console.log("RESEND:", data);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}
