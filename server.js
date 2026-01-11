import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // serves front-end files

const HUBSPOT_PAT = process.env.HUBSPOT_PAT;

// Endpoint to verify email against HubSpot contacts
app.post('/verify-email', async (req, res) => {
  const { email } = req.body;

  try {
    // v3 HubSpot API with PAT authentication
    const response = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts?properties=email&limit=1&filter=email=${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_PAT}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      res.json({ access: true }); // email is a HubSpot contact
    } else {
      res.json({ access: false }); // email not found
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Listen on Azure-assigned port or fallback 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
