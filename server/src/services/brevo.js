const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID || 2;

/**
 * Sync contact to Brevo Newsletter List via Brevo REST API v3
 */
async function syncContactToBrevo({ email, firstName }) {
  if (!BREVO_API_KEY || BREVO_API_KEY === 'xkeysib-demo-key') {
    console.log(`[Brevo Sync Mock] Skipped real API call for ${email} (Demo key)`);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName || ''
        },
        listIds: [parseInt(BREVO_LIST_ID, 10)],
        updateEnabled: true
      })
    });

    if (response.ok || response.status === 201 || response.status === 204) {
      return { success: true };
    } else {
      const errorData = await response.json();
      console.warn('Brevo API Sync Warning:', errorData);
      return { success: false, error: errorData };
    }
  } catch (error) {
    console.error('Brevo API Sync Error:', error.message);
    return { success: false, error: error.message };
  }
}

module.exports = {
  syncContactToBrevo
};
