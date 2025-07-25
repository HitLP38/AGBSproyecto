//src/infra/api/resultsApi.ts
const API_URL = import.meta.env.VITE_API_URL;

export interface ResultInput {
  exercise_id: string;
  value: number | string;
  score: number;
  timestamp: string;
  user_id: string;
  sexo?: string;
  grado?: string;
}

export interface ResultResponse extends ResultInput {
  id: string;
}

// ✅ POST /results
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
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error al guardar resultado: ${errorMessage}`);
  }
  return await res.json();
}

// ✅ GET /results/{user_id}
export async function getResultsByUser(
  userId: string,
  token: string
): Promise<ResultResponse[]> {
  const res = await fetch(`${API_URL}/results/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error al obtener resultados: ${errorMessage}`);
  }
  return await res.json();
}

// ✅ POST /score — calcula puntaje oficial desde el backend
export async function getScoreFromBackend(
  exerciseId: string,
  value: number | string,
  sexo: string,
  grado: string
): Promise<number> {
  const payload = {
    exercise_id: exerciseId,
    marca: value.toString(), // 👈 asegúrate de que sea string
    sexo: sexo,
    grado: parseInt(grado, 10), // 👈 aseguramos que sea número
  };

  const res = await fetch(`${API_URL}/score/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error al calcular puntaje: ${errorMessage}`);
  }

  const json = await res.json();

  // ✅ Asegúrate que tu backend devuelva directamente un número. Si devuelve un objeto, ajusta esta línea:
  return typeof json === "number" ? json : json.puntaje;
}
