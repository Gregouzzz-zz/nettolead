export default async function handler(req, res) {
  try {
    // 🔥 IMPORTANT : parser le body correctement
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { email } = body;

    if (!email) {
      return res.status(400).json({ error: "Email manquant" });
    }

    console.log("Email reçu:", email);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "NettoLead <contact@send.nettolead.fr>"
        to: email,
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

    console.log("Réponse Resend:", data);

    return res.status(200).json(data);

  } catch (error) {
    console.error("ERREUR:", error);
    return res.status(500).json({ error: error.message });
  }
}
