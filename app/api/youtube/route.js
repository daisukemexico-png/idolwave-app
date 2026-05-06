export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return Response.json({ error: "videoId は必須です" }, { status: 400 });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "APIキー未設定" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`
    );
    const data = await res.json();

    if (!data.items?.length) {
      return Response.json({ error: "動画が見つかりませんでした" }, { status: 404 });
    }

    const item = data.items[0];
    return Response.json({
      id: videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      description: item.snippet.description?.slice(0, 400) || "",
      thumbnail: item.snippet.thumbnails?.high?.url || "",
      viewCount: Number(item.statistics.viewCount || 0),
      likeCount: Number(item.statistics.likeCount || 0),
      publishedAt: item.snippet.publishedAt?.slice(0, 10) || "",
      tags: item.snippet.tags?.slice(0, 10) || [],
    });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
