import { useAuthStore } from "../store/authStore";

const BASE_URL = "https://v2.api.noroff.dev/pets";

// Helper for å hente token + apiKey til alle requests
function getAuthHeaders() {
  const token = useAuthStore.getState().token;
  const apiKey = useAuthStore.getState().apiKey;
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
  };
}

// --- CREATE ---
export async function createPet(petData) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(petData),
  });

  const data = await response.json();
  if (!response.ok) {
    // Kaster hele responsen, ikke bare én message
    throw data;
  }
  return data;
}

// --- UPDATE ---
export async function updatePet(id, petData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(petData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not update pet");
  }
  return data;
}

// --- DELETE ---
export async function deletePet(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Could not delete pet");
  }
  // DELETE gir ofte 204 No Content, så vi returnerer ingenting
  return true;
}

// --- GET ONE ---
export async function getPet(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not fetch pet");
  }
  return data;
}
