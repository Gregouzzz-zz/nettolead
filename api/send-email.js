const axios = require("axios");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { to, lead } = req.body;

    console.log("EMAIL ENVOYÉ À :", to);

    const response = await axios.post(
      "https://api.resend.com/emails",
      {
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
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json(response.data);

  } catch (error) {
    console.log("ERREUR API:", error.response?.data || error.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
