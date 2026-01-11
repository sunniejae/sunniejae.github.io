// /api/index.js
import express from 'express';
import fetch from 'node-fetch'; // Node 18+ has fetch built-in

const app = express();
const PORT = process.env.PORT || 3000;

// Use JSON bodies
app.use(express.json());

// Example endpoint to check membership
// Expect query: ?email=someone@example.com
app.get('/check-member', async (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // HubSpot API URL to get contact by email
    const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY; // add in Azure Secrets
    const url = `https://api.hubapi.com/contacts/v1/contact/email/${encodeURIComponent(email)}/profile?hapikey=${HUBSPOT_API_KEY}`;
    
    const response = await fetch(url);
    
    if (response.status === 404) {
      return res.json({ member: false });
    }

    const data = await response.json();

    // Check if contact has your "Club Member" property set
    // Change 'is_club_member' to your HubSpot property
    const member = data.properties?.is_club_member?.value === 'true';

    return res.json({ member });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Starry Jae API is running 🌟');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
