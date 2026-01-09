const express = require("express");
const fetch = require("node-fetch"); // For HubSpot API requests
const app = express();
const PORT = 3000;

app.use(express.json()); // To parse JSON bodies

// Replace with your actual HubSpot API key
const HUBSPOT_API_KEY = "YOUR_HUBSPOT_API_KEY";
const HUBSPOT_SEGMENT_ID = 19;

// POST endpoint to check membership
app.post("/check-member", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  try {
    // Check if contact exists in HubSpot
    const contactRes = await fetch(`https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${HUBSPOT_API_KEY}`);
    
    if (!contactRes.ok) {
      return res.json({ member: false });
    }

    const contactData = await contactRes.json();

    // Check if contact is in segment (List ID 19)
    // HubSpot uses list membership endpoint
    const listsRes = await fetch(`https://api.hubapi.com/contacts/v1/lists/${HUBSPOT_SEGMENT_ID}/contacts/all?hapikey=${HUBSPOT_API_KEY}`);
    const listsData = await listsRes.json();

    const isMember = listsData.contacts.some(c => c.vid === contactData.vid);

    res.json({ member: isMember });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
