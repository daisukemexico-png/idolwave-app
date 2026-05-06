export async function POST(request) {
  const body = await request.json();
  const { title, channel, description, tags, viewCount } = body;

  const prompt = `以下のYouTube動画がアイドル楽曲か判断し、JSON形式のみで回答してください。説明文不要。
タイトル: ${title}
チャンネル: ${channel}
説明: ${description?.slice(0,200)}
タグ: ${tags?.join(",")}
再生数: ${viewCount}

{"isIdol":true,"confidence":0.95,"songTitle":"曲名","artistName":"アーティスト名","groupName":"グループ名","genre":"ジャンル","mood":"雰囲気","targetAge":"年齢層","popularCities":["東京","大阪"],"reason":"理由1文"}`;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  const raw = data.content.map(c => c.text || "").join("").replace(/```json|```/g, "").trim();
  return Response.json(JSON.parse(raw));
}
