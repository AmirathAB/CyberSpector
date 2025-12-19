// src/services/api.js
export async function login(email, password) {
  const response = await fetch("https://dummyjson.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur login");
  return data;
}
