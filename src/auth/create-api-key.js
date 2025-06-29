// src/api/create-api-key.js

/**
 * Lager en Noroff API Key hvis du ikke har en fra før.
 * Returnerer kun .key-strengen.
 *
 * @param {string} token - Access token fra login eller register
 * @returns {Promise<string>} apiKey
 */
export async function createApiKey(token) {
  const response = await fetch(
    "https://v2.api.noroff.dev/auth/create-api-key",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: "My App Key" }), // Navn kan endres
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not create API key");
  }

  // API Key ligger i data.data.key
  return data.data.key;
}
