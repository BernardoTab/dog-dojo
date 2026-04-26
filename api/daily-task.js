export default async function handler(req, res) {
  try {
    await fetch("https://dog-dojo-api.onrender.com/api/weeklyquest/refresh", {
      method: "GET"
    });

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "failed" });
  }
}