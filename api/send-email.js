export default async function handler(req, res) {
  const { email } = req.body;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
     from: "NettoLead <contact@nettolead.fr>"
     to: "klein.gregory@outlook.fr",
      subject: "🚀 Bienvenue sur NettoLead",
      html: `
        <h2>Bienvenue sur NettoLead 🚀</h2>
        <p>Tu es maintenant sur la liste privée.</p>
        <p>Tu seras informé dès le lancement.</p>
        <br>
        <strong>L’équipe NettoLead</strong>
      `
    })
  });

  const data = await response.json();

  res.status(200).json(data);
}
