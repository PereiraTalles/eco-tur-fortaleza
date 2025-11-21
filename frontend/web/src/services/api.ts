const API_BASE_URL = "https://eco-tur-fortaleza.onrender.com";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

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

  if (res.status === 204) {
    return {} as TResponse;
  }

  return (await res.json()) as TResponse;
}

export type User = {
  id: number;
  name: string;
  email: string;
};

export async function registrarUsuario(dados: {
  nome: string;
  sobrenome: string;
  cidade: string;
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
type AtualizarUsuarioPayload = {
  nome: string;
  sobrenome: string;
  cidade: string;
  email: string;
  senha?: string; // opcional, se vier vazio mantém a antiga
};

export async function atualizarUsuario(
  id: number,
  dados: AtualizarUsuarioPayload
) {
  return request<{
    user: {
      id: number;
      name: string;
      email: string;
      sobrenome?: string;
      cidade?: string;
    };
  }>(`/api/users/${id}`, {
    method: "PUT",
    body: dados,
  });
}

export async function deletarUsuario(id: number) {
  // backend retorna 204 (sem corpo), o request já trata isso
  return request<void>(`/api/users/${id}`, {
    method: "DELETE",
  });
}

type CriarContaPayload = {
  nome: string;
  sobrenome: string;
  cidade: string;
  email: string;
  senha: string;
};

export async function criarUsuario(dados: CriarContaPayload) {
  return request<{
    id: number;
    name: string;
    email: string;
    created_at: string;
  }>("/api/users/register", {
    method: "POST",
    body: dados,
  });
}

export type Spot = {
  id: number;
  name: string;
  category: string;
  district: string | null;
  description: string | null;
  rating: number;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
};

export async function listarSpots() {
  return request<{ data: Spot[]; meta: unknown }>(
    "/api/spots?limit=1000&offset=0"
  );
}
