// src/services/api.ts

// Base da API: apontando para o backend do Render
const API_BASE_URL = "https://eco-tur-fortaleza.onrender.com";

type HttpMethod = "GET" | "POST";

async function request<TResponse>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: unknown;
  } = {}
): Promise<TResponse> {
  const { method = "GET", body } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    // tenta ler o JSON de erro, se houver
    let errorDetail: unknown;
    try {
      errorDetail = await res.json();
    } catch {
      errorDetail = await res.text();
    }

    throw new Error(
      `Erro na requisição (${res.status}): ${JSON.stringify(errorDetail)}`
    );
  }

  // se não tiver corpo, só retorna como any
  if (res.status === 204) {
    return {} as TResponse;
  }

  return (await res.json()) as TResponse;
}

// --------- Funções específicas da nossa API ---------

export type User = {
  id: number;
  name: string;
  email: string;
};

export async function registrarUsuario(dados: {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}): Promise<User> {
  const resp = await request<User>("/api/users/register", {
    method: "POST",
    body: dados,
  });
  return resp;
}

export async function loginUsuario(dados: {
  email: string;
  senha: string;
}): Promise<{ user: User }> {
  const resp = await request<{ user: User }>("/api/auth/login", {
    method: "POST",
    body: dados,
  });
  return resp;
}
