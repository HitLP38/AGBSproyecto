// src/infra/api/resultsApi.ts
const API_URL = import.meta.env.VITE_API_URL;

export interface ResultInput {
  exercise_id: string;
  value: number | string; // aún lo aceptamos como entrada
  score: number;
  timestamp: string;
  user_id: string;
  sexo?: string;
  grado?: string;
}

export interface ResultResponse extends ResultInput {
  id: string;
}

// ✅ POST /results — GUARDAR RESULTADO
export async function saveResult(
  input: ResultInput,
  token: string
): Promise<ResultResponse> {
  // ⚠️ Convertimos string numérico como "2:49" a número antes de enviar
  let parsedValue: number;

  if (typeof input.value === "string") {
    if (input.value.includes(":")) {
      // Es del tipo "mm:ss", convertirlo
      const [min, sec] = input.value.split(":").map(Number);
      parsedValue = min + sec / 60;
    } else {
      parsedValue = parseFloat(input.value);
    }
  } else {
    parsedValue = input.value;
  }

  const body = {
    exercise_id: input.exercise_id,
    value: parsedValue, // ✅ Enviamos como float limpio
    score: input.score,
    timestamp: input.timestamp,
    user_id: input.user_id,
    sexo: input.sexo,
    grado: input.grado,
  };

  const res = await fetch(`${API_URL}/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
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
    marca: value.toString(), // 👈 el backend espera string aquí
    sexo: sexo,
    grado: parseInt(grado, 10),
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

  return typeof json === "number" ? json : json.puntaje;
}

// ✅ POST /notes/calculate_grade_from_selection —
export async function calculateGradeFromSelection(
  scores: number[],
  token: string
): Promise<{ mensaje: string; puntaje_total: number; nota_final: number }> {
  const res = await fetch(`${API_URL}/notes/calculate_grade_from_selection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ scores }),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`Error al calcular la nota: ${errorMessage}`);
  }

  return await res.json();
}
