export async function login({ email, password }) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(" Login failed:", data);
      throw new Error(data.message || "Login failed");
    }

    console.log(" Login success:", data);
    return data;
  } catch (error) {
    console.error(" Login error:", error);
    throw error;
  }
}

export async function register({ name, email, password }) {
  try {
    const response = await fetch("https://v2.api.noroff.dev/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(" Registration failed:", data);
      throw new Error(data.message || "Registration failed");
    }

    console.log(" Registration success:", data);
    return data;
  } catch (error) {
    console.error(" Registration error:", error);
    throw error;
  }
}
