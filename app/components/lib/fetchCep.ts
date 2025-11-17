'use client'
export async function fetchCEP(cep: string) {
  const clean = cep.replace(/\D/g, "");
  if (clean.length !== 8) return null;

  const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
  const data = await res.json();

  if (data.erro) return null;
  return data;
}