import { useAuth } from "@clerk/clerk-react";

const API_URL = import.meta.env.VITE_API_URL;

export interface ResultInput {
  exercise_id: string;
  value: number;
  score: number;
  timestamp: string;
  user_id: string;
}

export interface ResultResponse {
  id: string;
  user_id: string;
  exercise_id: string;
  value: number;
  score: number;
  timestamp: string;
}

// POST /results
export async function saveResult(
  input: ResultInput,
  token: string
): Promise<ResultResponse> {
  const res = await fetch(`${API_URL}/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) throw new Error("Error al guardar resultado");
  return await res.json();
}

// GET /results/{user_id}
export async function getResultsByUser(
  userId: string,
  token: string
): Promise<ResultResponse[]> {
  const res = await fetch(`${API_URL}/results/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener resultados");
  return await res.json();
}
