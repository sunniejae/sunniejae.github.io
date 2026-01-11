import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());

// Serve all static files from root
app.use(express.static(path.join(process.cwd())));

// HubSpot email verification endpoint
const HUBSPOT_PAT = process.env.HUBSPOT_PAT;

app.post('/verify-email', async (req, res) => {
  const { email } = req.body;

  try {
    const response = await fetch(
      `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${HUBSPOT_PAT}`
    );

    if (response.status === 200) {
      res.json({ access: true });
    } else {
      res.json({ access: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Fallback route for root
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Optional: handle other unknown routes gracefully
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Listen on Azure-assigned port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
