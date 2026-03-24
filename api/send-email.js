module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { to, lead } = req.body;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.RESEND_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        to: to,
        subject: "Nouveau lead 🚀",
        html: `
          <h2>Nouveau lead</h2>
          <p>Nom : ${lead.name}</p>
          <p>Ville : ${lead.city}</p>
          <p>Téléphone : ${lead.phone}</p>
          <p>Email : ${lead.email}</p>
        `
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
