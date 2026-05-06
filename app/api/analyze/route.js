export async function POST(request) {
  try {
    const body = await request.json();
    const { title, channel, viewCount } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "ANTHROPIC_API_KEY未設定" }, { status: 500 });
    }

   const prompt = `以下のYouTube動画がアイドル楽曲か判断し、JSON形式のみで回答してください。説明文不要。タイトル: ${title} チャンネル: ${channel} 再生数: ${viewCount} {"isIdol":true,"confidence":0.95,"songTitle":"曲名","artistName":"アーティスト名","groupName":"グループ名","genre":"ジャンル","mood":"雰囲気","targetAge":"年齢層","popularCities":["東京","大阪"],"reason":"理由1文"}`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 800,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      return Response.json({ error: `Claude API ${res.status}`, detail: text }, { status: 500 });
    }

    const data = JSON.parse(text);
    
    if (!data || !data.content || !Array.isArray(data.content)) {
      return Response.json({ error: "予期しないレスポンス", detail: text.slice(0, 200) }, { status: 500 });
    }

    const raw = data.content
      .filter(c => c.type === "text")
      .map(c => c.text)
      .join("")
      .replace(/```json|```/g, "")
      .trim();

    return Response.json(JSON.parse(raw));

  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
