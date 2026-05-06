export const metadata = {
  title: "IDOLWAVE - アイドル専用ラジオ × 会場マップ",
  description: "全国のアイドル楽曲をリアルタイムで追跡。YouTubeと連携した会場ヒートマップ。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0, padding: 0, background: "#060610" }}>
        {children}
      </body>
    </html>
  );
}
