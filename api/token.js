export default async function handler(req, res) {
  // ✅ CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Trata pré-voo (preflight) CORS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const r = await fetch("http://10.154.77.186:8085/wsToken.asmx/GetToken?user=Usuar&password=1234");
    const xml = await r.text();

    const token = xml.match(/<string[^>]*>(.*?)<\/string>/)?.[1];
    if (!token) return res.status(500).send("Token não encontrado");

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send("Erro ao buscar token: " + err.message);
  }
}
