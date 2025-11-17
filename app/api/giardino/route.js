import { db } from "@/config/db";


export async function POST(request) {
  try {
    const data = await request.json();

    const {
      firstName,
      dataNascimento,
      phoneNumber,
      sugestionRating,
      atendimentoAvaliation,
      improvementSugestion,
      garcom,
      cep,
      rua,
      bairro,
      cidade,
      estado
    } = data;

    await db.execute(
      `INSERT INTO giardino_forms 
      (firstName, dataNascimento, phoneNumber, sugestionRating, atendimentoAvaliation, improvementSugestion, garcom, cep, rua, bairro, cidade, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        firstName,
        dataNascimento,
        phoneNumber,
        sugestionRating,
        atendimentoAvaliation,
        improvementSugestion,
        garcom,
        cep,
        rua,
        bairro,
        cidade,
        estado
      ]
    );

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
