const API_URL = import.meta.env.VITE_API_URL;

export interface ResultInput {
  exercise_id: string;
  value: number;
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

// ✅ GET /score?exercise_id=xxx&marca=yy&sexo=M&grado=1
export async function getScoreFromBackend(
  exerciseId: string,
  value: number,
  sexo: string,
  grado: string
): Promise<number> {
  // Convertir "Masculino"/"Femenino" a "M"/"F"
  const sexoCode = sexo === "Masculino" ? "M" : "F";

  const params = new URLSearchParams({
    exercise_id: exerciseId,
    marca: value.toString(), // Cambiar 'value' por 'marca'
    sexo: sexoCode, // Usar código corto
    grado,
  });

  const res = await fetch(`${API_URL}/score?${params.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error al calcular puntaje: ${errorMessage}`);
  }

  const json = await res.json();
  console.log("Response from API:", json); // Para debuggear - puedes quitarlo después
  return json; // Si tu API retorna directamente el número
  // Si tu API retorna {score: number}, cambia por: return json.score;
}
