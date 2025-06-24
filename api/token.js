export default async function handler(req, res) {
  try {
    const response = await fetch("http://10.154.77.186:8085/wsToken.asmx/GetToken?user=Usuar&password=1234");
    const xml = await response.text();

    const match = xml.match(/<string[^>]*>(.*?)<\/string>/);
    const token = match ? match[1] : null;

    if (!token) return res.status(500).json({ error: "Token não encontrado" });

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
