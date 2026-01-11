// server.js
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public')); // serves front-end files

const HUBSPOT_PAT = process.env.HUBSPOT_PAT;

// Verify email endpoint
app.post('/verify-email', async (req, res) => {
  const { email } = req.body;
  try {
    const response = await fetch(
      `https://api.hubapi.com/contacts/v1/contact/email/${email}/profile?hapikey=${HUBSPOT_PAT}`
    );
    res.json({ access: response.status === 200 });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Listen on Azure port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
