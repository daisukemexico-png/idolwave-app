"use client";
import { useState, useEffect, useRef } from "react";

// ─── Data ──────────────────────────────────────────────
const SONGS = [
  { id:"neon-butterfly",     title:"Neon Butterfly",     artist:"夜空ハナ",  group:"NEON SISTERS",   img:"🦋", color:"#b44fff", plays:12480, venue:"TOKYO IDOL THEATER",        city:"秋葉原", rank:1, duration:188 },
  { id:"starlight-overture", title:"Starlight Overture", artist:"桜花ミル",  group:"SAKURA BLOOM",   img:"🌸", color:"#ff3366", plays:8470,  venue:"SHIBUYA PLEASURE PLEASURE", city:"渋谷",   rank:2, duration:214 },
  { id:"midnight-call",      title:"Midnight Call",      artist:"月城アイ",  group:"MOON PHASE",     img:"🌙", color:"#00d4ff", plays:9210,  venue:"BIG CAT",                   city:"大阪",   rank:3, duration:231 },
  { id:"summer-parade",      title:"Summer Parade",      artist:"陽菜リン",  group:"SUNSHINE GIRLS", img:"🌻", color:"#ffd700", plays:5340,  venue:"ZEPP NAGOYA",               city:"名古屋", rank:4, duration:197 },
  { id:"heartbeat-drop",     title:"Heartbeat Drop",     artist:"桃瀬ユイ",  group:"PEACH RUSH",     img:"🍑", color:"#ff6b35", plays:5120,  venue:"CLUB CITTA'",               city:"川崎",   rank:5, duration:203 },
];

const VENUES = [
  { id:1, name:"TOKYO IDOL THEATER",        city:"秋葉原", x:218, y:178, plays:1203, color:"#b44fff", songs:[{title:"Neon Butterfly",plays:1203},{title:"Starlight Overture",plays:847}] },
  { id:2, name:"SHIBUYA PLEASURE PLEASURE", city:"渋谷",   x:210, y:183, plays:847,  color:"#ff3366", songs:[{title:"Starlight Overture",plays:847},{title:"Summer Parade",plays:534}] },
  { id:3, name:"BIG CAT",                   city:"大阪",   x:178, y:210, plays:921,  color:"#00d4ff", songs:[{title:"Midnight Call",plays:921},{title:"Neon Butterfly",plays:688}] },
  { id:4, name:"ZEPP NAGOYA",               city:"名古屋", x:192, y:200, plays:634,  color:"#ffd700", songs:[{title:"Summer Parade",plays:634},{title:"Heartbeat Drop",plays:489}] },
  { id:5, name:"Zepp Fukuoka",              city:"福岡",   x:138, y:255, plays:388,  color:"#00ff9f", songs:[{title:"Summer Parade",plays:388},{title:"Starlight Overture",plays:245}] },
  { id:6, name:"Zepp Sapporo",              city:"札幌",   x:238, y:108, plays:210,  color:"#ff6b35", songs:[{title:"Neon Butterfly",plays:210},{title:"Starlight Overture",plays:167}] },
];

const MOCK_VENUES_YT = [
  // 渋谷エリア
  { city:"渋谷", venue:"SHIBUYA O-EAST",            color:"#ff3366", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"SHIBUYA O-WEST",            color:"#ff3366", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"SHIBUYA O-Crest",           color:"#ff3366", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"SHIBUYA PLEASURE PLEASURE", color:"#ff6b35", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"duo MUSIC EXCHANGE",        color:"#ff6b35", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"WWW",                       color:"#ffd700", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"WWW X",                     color:"#ffd700", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"CLUB QUATTRO",              color:"#ff6b35", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"渋谷EGGMAN",                color:"#ff3366", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"渋谷La.mama",               color:"#ff6b35", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"渋谷GUILTY",                color:"#ffd700", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"TSUTAYA O-nest",            color:"#ff3366", region:"渋谷", x:142, y:180 },
  { city:"渋谷", venue:"Spotify O-EAST",            color:"#00ff9f", region:"渋谷", x:142, y:180 },
  // 下北沢エリア
  { city:"下北沢", venue:"下北沢SHELTER",            color:"#b44fff", region:"下北沢", x:138, y:186 },
  { city:"下北沢", venue:"下北沢GARDEN",             color:"#b44fff", region:"下北沢", x:138, y:186 },
  { city:"下北沢", venue:"下北沢ERA",                color:"#b44fff", region:"下北沢", x:138, y:186 },
  { city:"下北沢", venue:"BASEMENT BAR",             color:"#9933ff", region:"下北沢", x:138, y:186 },
  // 新宿エリア
  { city:"新宿", venue:"新宿LOFT",                   color:"#00d4ff", region:"新宿", x:148, y:172 },
  { city:"新宿", venue:"新宿BLAZE",                  color:"#00d4ff", region:"新宿", x:148, y:172 },
  { city:"新宿", venue:"RUIDO K4",                   color:"#00aaff", region:"新宿", x:148, y:172 },
  // 秋葉原エリア
  { city:"秋葉原", venue:"TOKYO IDOL THEATER",      color:"#00ff9f", region:"秋葉原", x:168, y:162 },
  { city:"秋葉原", venue:"AKIBAカルチャーズ劇場",   color:"#00ff9f", region:"秋葉原", x:168, y:162 },
  // 池袋エリア
  { city:"池袋", venue:"CYBER",                     color:"#ffd700", region:"池袋", x:148, y:158 },
  { city:"池袋", venue:"手刀",                      color:"#ffd700", region:"池袋", x:148, y:158 },
  { city:"池袋", venue:"harevutai",                 color:"#ffaa00", region:"池袋", x:148, y:158 },
  // 高田馬場・中野エリア
  { city:"高田馬場", venue:"AREA",                  color:"#ff6b35", region:"高田馬場", x:142, y:162 },
  { city:"中野", venue:"中野heavysick ZERO",        color:"#ff6b35", region:"中野", x:134, y:162 },
  // 恵比寿・目黒エリア
  { city:"恵比寿", venue:"THE GARDEN HALL",         color:"#ff3366", region:"恵比寿", x:145, y:184 },
  { city:"目黒", venue:"鹿鳴館",                    color:"#ff3366", region:"目黒", x:145, y:186 },
  // 原宿・青山エリア
  { city:"原宿", venue:"HARAJUKU ASTRO HALL",       color:"#00ff9f", region:"原宿", x:142, y:176 },
  // 赤坂・六本木エリア  
  { city:"赤坂", venue:"赤坂BLITZ",                 color:"#b44fff", region:"赤坂", x:150, y:178 },
  { city:"六本木", venue:"EX THEATER ROPPONGI",     color:"#b44fff", region:"六本木", x:150, y:180 },
];

const fmt = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
const extractVideoId = (url) => {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
};

// ─── Mini Components ───────────────────────────────────
const Spinner = ({ color="#ff3366", size=16 }) => (
  <div style={{ width:size,height:size,border:`2px solid ${color}33`,borderTop:`2px solid ${color}`,borderRadius:"50%",animation:"spin .7s linear infinite",flexShrink:0 }}/>
);

const WaveViz = ({ playing, color }) => (
  <div style={{ display:"flex",alignItems:"center",gap:2,height:24 }}>
    {Array.from({length:20}).map((_,i)=>(
      <div key={i} style={{ width:3,borderRadius:2,background:color,opacity:playing?.85:.2,height:playing?`${10+Math.sin(i*.9)*8}px`:"3px",animation:playing?`wv${i%5} ${.5+(i%4)*.13}s ease-in-out infinite alternate`:"none",transition:"height .3s,opacity .3s" }}/>
    ))}
  </div>
);

const Vinyl = ({ playing, color, img }) => (
  <div style={{ width:100,height:100,borderRadius:"50%",background:"conic-gradient(#0a0a0a 0deg,#1a1a1a 30deg,#0a0a0a 60deg,#111 90deg,#0a0a0a 120deg,#1a1a1a 150deg,#0a0a0a 180deg,#111 210deg,#0a0a0a 240deg,#1a1a1a 270deg,#0a0a0a 300deg,#111 330deg,#0a0a0a 360deg)",boxShadow:`0 0 0 2px #333,0 0 20px ${color}44`,animation:playing?"spin 3s linear infinite":"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
    <div style={{ width:36,height:36,borderRadius:"50%",background:`radial-gradient(circle,${color}cc,${color}44)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>{img}</div>
  </div>
);

// ─── Radio Screen ──────────────────────────────────────
function RadioScreen({ onShare }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState({});
  const [showQueue, setShowQueue] = useState(false);
  const ref = useRef();
  const song = SONGS[idx];

  useEffect(()=>{
    if(playing){ ref.current=setInterval(()=>setProgress(p=>{ if(p>=song.duration){setIdx(i=>(i+1)%SONGS.length);return 0;} return p+1; }),1000); }
    else clearInterval(ref.current);
    return ()=>clearInterval(ref.current);
  },[playing,idx]);

  const pct=(progress/song.duration)*100;

  if(showQueue) return (
    <div style={{ padding:"16px",display:"flex",flexDirection:"column",gap:8 }}>
      <div style={{ display:"flex",justifyContent:"space-between",marginBottom:4 }}>
        <span style={{ fontSize:11,color:"#666" }}>QUEUE</span>
        <button onClick={()=>setShowQueue(false)} style={{ background:"transparent",border:"none",color:"#888",fontSize:12,cursor:"pointer" }}>← 戻る</button>
      </div>
      {SONGS.map((s,i)=>(
        <div key={s.id} onClick={()=>{setIdx(i);setProgress(0);setPlaying(true);setShowQueue(false);}} style={{ display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:12,background:i===idx?`${s.color}18`:"#0d0d1e",border:`1px solid ${i===idx?s.color+"44":"#ffffff0a"}`,cursor:"pointer" }}>
          <div style={{ width:34,height:34,borderRadius:"50%",background:`${s.color}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>{s.img}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12,fontWeight:700,color:i===idx?s.color:"#fff" }}>{s.title}</div>
            <div style={{ fontSize:10,color:"#666" }}>{s.artist} · {s.city}</div>
          </div>
          <span style={{ fontSize:11,color:"#555" }}>{fmt(s.duration)}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding:"20px 16px",display:"flex",flexDirection:"column",gap:20,position:"relative" }}>
      <div style={{ position:"fixed",inset:0,background:`radial-gradient(ellipse at 50% 20%,${song.color}14,transparent 60%)`,pointerEvents:"none",transition:"background 1s",zIndex:0 }}/>
      <div style={{ position:"relative",zIndex:1,display:"flex",flexDirection:"column",gap:20 }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
          <div style={{ display:"flex",alignItems:"center",gap:6,fontSize:10,color:"#ff3366",fontWeight:700 }}>
            <div style={{ width:6,height:6,borderRadius:"50%",background:"#ff3366",animation:"pulse 1s infinite" }}/>ON AIR
          </div>
          <button onClick={()=>setShowQueue(true)} style={{ background:"transparent",border:"1px solid #ffffff22",borderRadius:8,color:"#888",padding:"5px 12px",fontSize:10,cursor:"pointer" }}>キュー ▸</button>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:16 }}>
          <Vinyl playing={playing} color={song.color} img={song.img}/>
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ fontSize:10,color:song.color,fontWeight:700,background:`${song.color}22`,display:"inline-block",padding:"2px 8px",borderRadius:4,marginBottom:6 }}>{song.group}</div>
            <div style={{ fontSize:18,fontWeight:900,color:"#fff",lineHeight:1.2,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{song.title}</div>
            <div style={{ fontSize:11,color:"#aaa",marginTop:2 }}>{song.artist}</div>
            <div style={{ fontSize:10,color:"#555",marginTop:4 }}>📍{song.city} · {song.venue}</div>
          </div>
        </div>
        <div style={{ background:"#0d0d1e",borderRadius:12,padding:"12px 14px",border:`1px solid ${song.color}22` }}>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,color:"#666",marginBottom:8 }}>
            <span>🎵 本日 <strong style={{ color:song.color }}>{song.plays.toLocaleString()}</strong> 回</span>
            <span>全国 #{song.rank}</span>
          </div>
          <WaveViz playing={playing} color={song.color}/>
        </div>
        <div>
          <div style={{ height:4,background:"#1a1a2e",borderRadius:4,cursor:"pointer" }} onClick={e=>{const r=e.currentTarget.getBoundingClientRect();setProgress(Math.floor(((e.clientX-r.left)/r.width)*song.duration));}}>
            <div style={{ height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${song.color}88,${song.color})`,borderRadius:4,position:"relative",transition:"width .5s linear" }}>
              <div style={{ position:"absolute",right:-5,top:"50%",transform:"translateY(-50%)",width:10,height:10,borderRadius:"50%",background:song.color }}/>
            </div>
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",fontSize:10,color:"#555",marginTop:4 }}><span>{fmt(progress)}</span><span>{fmt(song.duration)}</span></div>
        </div>
        <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:18 }}>
          <button onClick={()=>setLiked(l=>({...l,[song.id]:!l[song.id]}))} style={{ background:"transparent",border:"none",cursor:"pointer",fontSize:20,opacity:liked[song.id]?1:.35,color:"#ff3366",transition:"all .2s" }}>♥</button>
          <button onClick={()=>{setIdx(i=>(i-1+SONGS.length)%SONGS.length);setProgress(0);}} style={{ background:"#1a1a2e",border:"none",borderRadius:"50%",width:40,height:40,cursor:"pointer",fontSize:16,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center" }}>⏮</button>
          <button onClick={()=>setPlaying(!playing)} style={{ width:60,height:60,borderRadius:"50%",background:`linear-gradient(135deg,${song.color},${song.color}88)`,border:"none",cursor:"pointer",fontSize:22,color:"#fff",boxShadow:`0 0 20px ${song.color}55`,display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .1s",transform:playing?"scale(.96)":"scale(1)" }}>
            {playing?"⏸":"▶"}
          </button>
          <button onClick={()=>{setIdx(i=>(i+1)%SONGS.length);setProgress(0);}} style={{ background:"#1a1a2e",border:"none",borderRadius:"50%",width:40,height:40,cursor:"pointer",fontSize:16,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center" }}>⏭</button>
          <button onClick={()=>onShare(song)} style={{ background:"transparent",border:"1px solid #ffffff22",borderRadius:8,color:"#aaa",padding:"8px 12px",fontSize:11,cursor:"pointer" }}>シェア</button>
        </div>
      </div>
    </div>
  );
}

// ─── YouTube Analyzer Screen ───────────────────────────
function YouTubeScreen() {
  const [url, setUrl] = useState("");
  const [step, setStep] = useState(0);
  const [ytData, setYtData] = useState(null);
  const [aiResult, setAiResult] = useState(null);
  const [venueData, setVenueData] = useState([]);
  const [error, setError] = useState("");
  const [log, setLog] = useState([]);
  const logRef = useRef([]);

  const addLog = (msg, color="#aaa") => {
    const e = { msg, color, t: new Date().toLocaleTimeString("ja-JP",{hour:"2-digit",minute:"2-digit",second:"2-digit"}) };
    logRef.current = [...logRef.current, e];
    setLog([...logRef.current]);
  };

  const reset = () => { setStep(0);setYtData(null);setAiResult(null);setVenueData([]);setError("");logRef.current=[];setLog([]); };

  const handleAnalyze = async () => {
    setError(""); logRef.current=[]; setLog([]);
    const videoId = extractVideoId(url);
    if(!videoId){ setError("有効なYouTube URLを入力してください"); return; }

    try {
      // Step1: 内蔵APIルート経由（CORSなし）
      setStep(1); addLog("📡 YouTube情報を取得中...", "#ffd700");
      const res = await fetch(`/api/youtube?videoId=${videoId}`);
      if(!res.ok){ const j=await res.json(); throw new Error(j.detail||j.error||"YouTube取得失敗"); }
      const yt = await res.json();
      setYtData(yt);
      addLog(`✅ 取得成功: 「${yt.title}」`, "#00ff9f");
      addLog(`👁 再生数: ${yt.viewCount.toLocaleString()}回`, "#00d4ff");

      // Step2: Claude AI解析
      setStep(2); addLog("🤖 Claude AIで解析中...", "#b44fff");
      const aiRes = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: yt.title, channel: yt.channel,
          description: yt.description, tags: yt.tags, viewCount: yt.viewCount,
        }),
      });
      const aiText = await aiRes.text();
      if(!aiText) throw new Error("AI解析のレスポンスが空です");
      let ai;
      try { ai = JSON.parse(aiText); } catch(e) { throw new Error("AI解析JSONパースエラー: " + aiText.slice(0,100)); }
      if(ai.error) throw new Error("AI解析エラー: " + ai.error);
      setAiResult(ai);
      addLog(`✅ AI解析完了: ${ai.isIdol?"アイドル楽曲":"アイドル外"} (${Math.round(ai.confidence*100)}%)`, "#00ff9f");
      if(ai.artistName) addLog(`🎤 ${ai.artistName} / ${ai.groupName}`, "#ff3366");

      // Step3: 会場マッピング
      setStep(3); addLog("🗾 全国会場マッピング中...", "#00d4ff");
      const base = Math.min(Math.floor(yt.viewCount/1000), 2000);
      const popular = ai.popularCities||[];
      const venues = MOCK_VENUES_YT.map(v=>({
        ...v,
        plays: Math.max(50, Math.floor(base*(popular.some(c=>v.city.includes(c)||c.includes(v.city))?1.6:1.0)*(0.4+Math.random()*0.6)))
      })).sort((a,b)=>b.plays-a.plays);
      setVenueData(venues);
      addLog(`✅ ${venues.length}会場マッピング完了！`, "#00ff9f");
      addLog("🎉 完了！", "#ff3366");
      setStep(4);
    } catch(e) { setError(e.message); setStep(0); addLog(`❌ ${e.message}`, "#ff6666"); }
  };

  const maxPlays = venueData.length ? Math.max(...venueData.map(v=>v.plays)) : 1;

  return (
    <div style={{ padding:"16px",display:"flex",flexDirection:"column",gap:14 }}>
      <div style={{ background:"#0d0d1e",border:"1px solid #ffffff0a",borderRadius:14,padding:16 }}>
        <div style={{ fontSize:11,color:"#888",marginBottom:10 }}>YouTube URLを入力して楽曲・会場データを解析</div>
        <div style={{ display:"flex",gap:8,marginBottom:10 }}>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." onKeyDown={e=>e.key==="Enter"&&handleAnalyze()}
            style={{ flex:1,background:"#06060f",border:"1px solid #ffffff18",borderRadius:10,padding:"10px 12px",color:"#ccc",fontSize:11,fontFamily:"monospace",outline:"none",boxSizing:"border-box" }}/>
          <button onClick={handleAnalyze} disabled={step>0&&step<4} style={{ background:step>0&&step<4?"#333":"linear-gradient(135deg,#ff3366,#b44fff)",border:"none",borderRadius:10,color:"#fff",padding:"0 18px",fontSize:12,fontWeight:700,cursor:step>0&&step<4?"not-allowed":"pointer",display:"flex",alignItems:"center",gap:8,flexShrink:0 }}>
            {step>0&&step<4?<Spinner color="#fff"/>:"解析"}
          </button>
        </div>
        <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
          {[{label:"AKB48",url:"https://www.youtube.com/watch?v=KnMGrCDLVXo"},{label:"乃木坂46",url:"https://www.youtube.com/watch?v=2G2iZxnHFO0"},{label:"BABYMETAL",url:"https://www.youtube.com/watch?v=cK3NMZAUKGw"}].map(ex=>(
            <button key={ex.label} onClick={()=>setUrl(ex.url)} style={{ padding:"4px 10px",background:"#ffffff08",border:"1px solid #ffffff14",borderRadius:8,color:"#888",fontSize:10,cursor:"pointer" }}>{ex.label} ▸</button>
          ))}
        </div>
      </div>

      {error&&<div style={{ background:"#ff336611",border:"1px solid #ff336644",borderRadius:10,padding:"12px 14px",fontSize:12,color:"#ff9999" }}>⚠️ {error}</div>}

      {log.length>0&&(
        <div style={{ background:"#06060f",border:"1px solid #ffffff08",borderRadius:12,padding:12,fontFamily:"monospace",fontSize:11,maxHeight:140,overflowY:"auto",display:"flex",flexDirection:"column",gap:4 }}>
          {log.map((l,i)=>(
            <div key={i} style={{ display:"flex",gap:8 }}>
              <span style={{ color:"#333",flexShrink:0 }}>{l.t}</span>
              <span style={{ color:l.color,lineHeight:1.5 }}>{l.msg}</span>
            </div>
          ))}
          {step>0&&step<4&&<div style={{ display:"flex",gap:6,alignItems:"center",color:"#555" }}><Spinner color="#555" size={12}/><span>処理中...</span></div>}
        </div>
      )}

      {step===4&&ytData&&aiResult&&(
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
          <div style={{ background:"#0d0d1e",border:"1px solid #ff336633",borderRadius:14,overflow:"hidden" }}>
            {ytData.thumbnail&&<img src={ytData.thumbnail} alt="" style={{ width:"100%",height:160,objectFit:"cover",display:"block",opacity:.8 }}/>}
            <div style={{ padding:14 }}>
              <div style={{ fontSize:14,fontWeight:900,marginBottom:4,lineHeight:1.3 }}>{ytData.title}</div>
              <div style={{ fontSize:11,color:"#888",marginBottom:10 }}>{ytData.channel} · {ytData.publishedAt}</div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8 }}>
                {[{label:"YouTube再生数",value:ytData.viewCount.toLocaleString(),color:"#ff3366"},{label:"高評価",value:ytData.likeCount.toLocaleString(),color:"#ffd700"}].map(s=>(
                  <div key={s.label} style={{ background:"#06060f",borderRadius:8,padding:"8px 10px",textAlign:"center" }}>
                    <div style={{ fontSize:9,color:"#555",marginBottom:3 }}>{s.label}</div>
                    <div style={{ fontSize:14,fontWeight:900,color:s.color }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background:"linear-gradient(135deg,#0d0020,#0a0018)",border:`1px solid ${aiResult.isIdol?"#b44fff44":"#555"}`,borderRadius:14,padding:16 }}>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14 }}>
              <div style={{ width:36,height:36,borderRadius:10,background:aiResult.isIdol?"#b44fff22":"#333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20 }}>{aiResult.isIdol?"🎤":"🤔"}</div>
              <div>
                <div style={{ fontSize:13,fontWeight:900,color:aiResult.isIdol?"#b44fff":"#aaa" }}>{aiResult.isIdol?"アイドル楽曲と判定":"アイドル楽曲ではない可能性"}</div>
                <div style={{ fontSize:10,color:"#666" }}>AI確信度: {Math.round(aiResult.confidence*100)}%</div>
              </div>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10 }}>
              {[{label:"楽曲名",value:aiResult.songTitle||"不明",color:"#ff3366"},{label:"アーティスト",value:aiResult.artistName||"不明",color:"#ff6b35"},{label:"グループ",value:aiResult.groupName||"不明",color:"#ffd700"},{label:"ジャンル",value:aiResult.genre||"不明",color:"#00d4ff"},{label:"雰囲気",value:aiResult.mood||"不明",color:"#b44fff"},{label:"対象年齢",value:aiResult.targetAge||"不明",color:"#00ff9f"}].map(s=>(
                <div key={s.label} style={{ background:"#06060f",borderRadius:8,padding:"8px 10px" }}>
                  <div style={{ fontSize:9,color:"#555",marginBottom:3 }}>{s.label}</div>
                  <div style={{ fontSize:12,fontWeight:700,color:s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
            {aiResult.reason&&<div style={{ background:"#ffffff06",borderRadius:8,padding:"8px 10px",fontSize:11,color:"#aaa",lineHeight:1.6,borderLeft:"2px solid #b44fff" }}>💡 {aiResult.reason}</div>}
          </div>

          <div style={{ background:"#0d0d1e",border:"1px solid #ffffff0a",borderRadius:14,padding:16 }}>
            <div style={{ fontSize:12,fontWeight:700,color:"#aaa",marginBottom:4 }}>🗾 どこで聴かれてる？全国会場マップ</div>
            <div style={{ fontSize:10,color:"#555",marginBottom:12 }}>YouTube再生数をもとにAIが推定した会場別再生数/日</div>

            {/* Tokyo Map */}
            <svg viewBox="110 145 80 65" style={{ width:"100%",maxHeight:240,display:"block",marginBottom:12,background:"#0a0a18",borderRadius:10 }}>
              <defs><pattern id="gr" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M 5 0 L 0 0 0 5" fill="none" stroke="#ffffff06" strokeWidth=".4"/></pattern></defs>
              <rect x="110" y="145" width="80" height="65" fill="url(#gr)"/>

              {/* エリアラベル */}
              {[
                {label:"池袋",    x:148, y:156},{label:"高田馬場",x:141, y:160},
                {label:"中野",    x:133, y:161},{label:"秋葉原",  x:168, y:160},
                {label:"新宿",    x:148, y:170},{label:"原宿",    x:141, y:175},
                {label:"渋谷",    x:141, y:179},{label:"恵比寿",  x:144, y:183},
                {label:"目黒",    x:144, y:187},{label:"赤坂",    x:150, y:177},
                {label:"六本木",  x:150, y:180},{label:"下北沢",  x:137, y:185},
              ].map(r=>(
                <text key={r.label} x={r.x} y={r.y} textAnchor="middle" fontSize="3" fill="#ffffff25">{r.label}</text>
              ))}

              {/* 会場ドット - エリアごとに集計 */}
              {[
                {region:"渋谷",    x:142, y:180, color:"#ff3366"},
                {region:"下北沢",  x:138, y:186, color:"#b44fff"},
                {region:"新宿",    x:148, y:172, color:"#00d4ff"},
                {region:"秋葉原",  x:168, y:162, color:"#00ff9f"},
                {region:"池袋",    x:148, y:158, color:"#ffd700"},
                {region:"高田馬場",x:142, y:162, color:"#ff6b35"},
                {region:"中野",    x:134, y:162, color:"#ff6b35"},
                {region:"恵比寿",  x:145, y:184, color:"#ff3366"},
                {region:"目黒",    x:145, y:186, color:"#ff3366"},
                {region:"原宿",    x:142, y:176, color:"#00ff9f"},
                {region:"赤坂",    x:150, y:178, color:"#b44fff"},
                {region:"六本木",  x:150, y:180, color:"#b44fff"},
              ].map(dot=>{
                const regionVenues = venueData.filter(v=>v.region===dot.region);
                if(!regionVenues.length) return null;
                const totalPlays = regionVenues.reduce((s,v)=>s+v.plays,0);
                const r = 2.5+(totalPlays/maxPlays)*7;
                return (
                  <g key={dot.region} style={{ cursor:"pointer" }}>
                    <circle cx={dot.x} cy={dot.y} r={r*1.8} fill={dot.color} opacity=".08"/>
                    <circle cx={dot.x} cy={dot.y} r={r} fill={dot.color} opacity=".85"
                      style={{ filter:`drop-shadow(0 0 3px ${dot.color})` }}/>
                    <text x={dot.x} y={dot.y+1} textAnchor="middle" fontSize="3" fill="#000" fontWeight="900" opacity=".9">
                      {totalPlays>999?`${(totalPlays/1000).toFixed(1)}k`:totalPlays}
                    </text>
                    <text x={dot.x} y={dot.y+r+5} textAnchor="middle" fontSize="3" fill={dot.color}>{dot.region}</text>
                  </g>
                );
              })}

              {/* 凡例 */}
              <text x="113" y="207" fontSize="3" fill="#ffffff30">🗾 東京ライブハウスマップ</text>
            </svg>

            {/* Bar list */}
            {venueData.map((v,i)=>(
              <div key={v.city} style={{ marginBottom:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4 }}>
                  <span style={{ color:i===0?"#fff":"#aaa" }}>
                    <span style={{ color:v.color,marginRight:6 }}>#{i+1}</span>
                    {v.city}
                    <span style={{ color:"#555",fontSize:10,marginLeft:4 }}>— {v.venue}</span>
                  </span>
                  <span style={{ color:v.color,fontWeight:700 }}>{v.plays.toLocaleString()} 回/日</span>
                </div>
                <div style={{ background:"#1a1a2e",borderRadius:4,height:5 }}>
                  <div style={{ width:`${(v.plays/maxPlays)*100}%`,height:"100%",borderRadius:4,background:`linear-gradient(90deg,${v.color}66,${v.color})`,transition:"width 1s ease" }}/>
                </div>
              </div>
            ))}

            <div style={{ marginTop:12,padding:"8px 10px",background:"#ffffff06",borderRadius:8,fontSize:10,color:"#666",lineHeight:1.6 }}>
              💡 ドットの大きさ＝推定再生数。AIが人気都市と再生数から算出しています。
            </div>
          </div>
          <button onClick={reset} style={{ width:"100%",padding:12,background:"transparent",border:"1px solid #ffffff18",borderRadius:12,color:"#888",fontSize:12,cursor:"pointer" }}>別のURLを解析する</button>
        </div>
      )}
    </div>
  );
}

// ─── Share Modal ───────────────────────────────────────
function ShareModal({ song, onClose }) {
  const [copied, setCopied] = useState(false);
  const url = `https://idolwave.app/song/${song.id}`;
  const text = `🎵 今これ聴いてる！\n「${song.title}」/ ${song.artist}\n全国${song.city}の会場でも大人気🔥\n#IDOLWAVE`;

  const share = async (target) => {
    if(target==="copy"){ try{ await navigator.clipboard.writeText(url); }catch{} setCopied(true); setTimeout(()=>setCopied(false),2000); return; }
    if(navigator.share){ try{ await navigator.share({title:song.title,text,url}); }catch{} }
    else { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,"_blank"); }
  };

  return (
    <div style={{ position:"fixed",inset:0,background:"#060610ee",backdropFilter:"blur(8px)",zIndex:150,display:"flex",flexDirection:"column",justifyContent:"flex-end" }}>
      <div style={{ background:"#0d0d1e",borderRadius:"20px 20px 0 0",border:"1px solid #ffffff0a",padding:"20px 16px 32px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
          <div style={{ fontSize:14,fontWeight:900 }}>「{song.title}」をシェア</div>
          <button onClick={onClose} style={{ background:"#ffffff14",border:"none",borderRadius:"50%",width:28,height:28,color:"#888",fontSize:16,cursor:"pointer" }}>×</button>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
          {[{id:"x",label:"Xでシェア",icon:"✕",bg:"#0a0a0a"},{id:"line",label:"LINEでシェア",icon:"💬",bg:"#003318"},{id:"copy",label:"リンクをコピー",icon:"🔗",bg:"#0d0d1e"}].map(s=>(
            <button key={s.id} onClick={()=>share(s.id)} style={{ display:"flex",alignItems:"center",gap:12,padding:"12px 14px",background:s.bg,border:"1px solid #ffffff14",borderRadius:12,cursor:"pointer",width:"100%" }}>
              <div style={{ width:32,height:32,borderRadius:9,background:"#ffffff12",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,color:"#fff",fontWeight:900,flexShrink:0 }}>{s.icon}</div>
              <span style={{ fontSize:13,fontWeight:700,color:"#fff" }}>{s.label}</span>
              {s.id==="copy"&&copied&&<span style={{ marginLeft:"auto",fontSize:10,color:"#00ff9f",fontWeight:700 }}>コピー済</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Map Screen ────────────────────────────────────────
function MapScreen() {
  const [sel, setSel] = useState(null);
  const [pulse, setPulse] = useState(0);
  useEffect(()=>{ const t=setInterval(()=>setPulse(p=>p+1),2000); return ()=>clearInterval(t); },[]);
  const maxP = Math.max(...VENUES.map(v=>v.plays));
  const selV = VENUES.find(v=>v.id===sel);
  return (
    <div>
      <svg viewBox="80 70 200 260" style={{ width:"100%",maxHeight:280,display:"block" }} onClick={()=>setSel(null)}>
        <defs><pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ffffff04" strokeWidth=".5"/></pattern></defs>
        <rect x="80" y="70" width="200" height="260" fill="url(#g)"/>
        <ellipse cx="215" cy="185" rx="28" ry="48" fill="#0f0f22" stroke="#1e1e40" strokeWidth="1.2"/>
        <ellipse cx="185" cy="215" rx="22" ry="18" fill="#0f0f22" stroke="#1e1e40" strokeWidth="1"/>
        <ellipse cx="165" cy="232" rx="18" ry="10" fill="#0f0f22" stroke="#1e1e40" strokeWidth="1"/>
        <ellipse cx="130" cy="268" rx="20" ry="26" fill="#0f0f22" stroke="#1e1e40" strokeWidth="1"/>
        <ellipse cx="238" cy="104" rx="26" ry="20" fill="#0f0f22" stroke="#1e1e40" strokeWidth="1.2"/>
        {VENUES.map(v=>{
          const r=8+(v.plays/maxP)*20, isSel=sel===v.id;
          return (
            <g key={v.id} onClick={e=>{e.stopPropagation();setSel(v.id);}} style={{ cursor:"pointer" }}>
              <circle cx={v.x} cy={v.y} r={r+4+(pulse%2)*4} fill="none" stroke={v.color} strokeWidth="1" opacity={isSel?.5:.15}/>
              <circle cx={v.x} cy={v.y} r={r} fill={v.color} opacity={isSel?1:.7} style={{ filter:isSel?`drop-shadow(0 0 8px ${v.color})`:`drop-shadow(0 0 3px ${v.color}66)` }}/>
              <text x={v.x} y={v.y+2} textAnchor="middle" fontSize="6" fill="#000" fontWeight="900" opacity=".85">{v.plays>999?`${(v.plays/1000).toFixed(1)}k`:v.plays}</text>
              <text x={v.x} y={v.y+r+8} textAnchor="middle" fontSize="5.5" fill={isSel?v.color:"#aaa"}>{v.city}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ padding:"0 16px 16px" }}>
        {selV?(
          <div style={{ background:"#0d0d1e",border:`1px solid ${selV.color}44`,borderRadius:14,padding:14 }}>
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:10 }}>
              <div>
                <div style={{ fontSize:10,color:selV.color,fontWeight:700,marginBottom:4 }}>📍{selV.city}</div>
                <div style={{ fontSize:14,fontWeight:900 }}>{selV.name}</div>
              </div>
              <button onClick={()=>setSel(null)} style={{ background:"transparent",border:"none",color:"#555",fontSize:18,cursor:"pointer" }}>×</button>
            </div>
            {selV.songs.map((s,i)=>(
              <div key={s.title} style={{ marginBottom:8 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:3 }}>
                  <span style={{ color:i===0?"#fff":"#aaa" }}><span style={{ color:selV.color,marginRight:6 }}>#{i+1}</span>{s.title}</span>
                  <span style={{ color:selV.color,fontWeight:700 }}>{s.plays}</span>
                </div>
                <div style={{ background:"#1a1a2e",borderRadius:3,height:3 }}>
                  <div style={{ width:`${(s.plays/selV.songs[0].plays)*100}%`,height:"100%",background:`linear-gradient(90deg,${selV.color}88,${selV.color})`,borderRadius:3 }}/>
                </div>
              </div>
            ))}
          </div>
        ):(
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {[...VENUES].sort((a,b)=>b.plays-a.plays).map((v,i)=>(
              <div key={v.id} onClick={()=>setSel(v.id)} style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 12px",background:"#0d0d1e",border:"1px solid #ffffff08",borderRadius:10,cursor:"pointer" }}>
                <div style={{ width:24,height:24,borderRadius:"50%",background:`${v.color}22`,border:`1px solid ${v.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:v.color,flexShrink:0 }}>{i+1}</div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontSize:12,fontWeight:700,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{v.name}</div>
                  <div style={{ fontSize:10,color:"#666" }}>{v.city}</div>
                </div>
                <div style={{ fontSize:13,fontWeight:900,color:v.color,flexShrink:0 }}>{v.plays.toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Root App ──────────────────────────────────────────
const TABS = [
  { id:"radio",   icon:"📻", label:"ラジオ" },
  { id:"youtube", icon:"▶",  label:"YouTube" },
  { id:"map",     icon:"🗾", label:"マップ" },
];

export default function App() {
  const [tab, setTab] = useState("radio");
  const [shareTarget, setShareTarget] = useState(null);

  return (
    <div style={{ minHeight:"100vh",background:"#060610",color:"#fff",fontFamily:"'Hiragino Sans','Yu Gothic','Noto Sans JP',sans-serif",paddingBottom:64 }}>
      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(1.5)}}
        @keyframes wv0{from{height:4px}to{height:22px}}@keyframes wv1{from{height:10px}to{height:20px}}
        @keyframes wv2{from{height:3px}to{height:24px}}@keyframes wv3{from{height:14px}to{height:17px}}
        @keyframes wv4{from{height:7px}to{height:21px}}
        *{box-sizing:border-box;} input,button{font-family:inherit;}
      `}</style>

      {shareTarget&&<ShareModal song={shareTarget} onClose={()=>setShareTarget(null)}/>}

      <div style={{ padding:"14px 16px",background:"#09091888",backdropFilter:"blur(12px)",borderBottom:"1px solid #ffffff0a",display:"flex",justifyContent:"space-between",alignItems:"center",position:"sticky",top:0,zIndex:50 }}>
        <div>
          <span style={{ fontSize:16,fontWeight:900,color:"#ff3366" }}>IDOL</span>
          <span style={{ fontSize:16,fontWeight:900 }}>WAVE</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:6,fontSize:9,color:"#ff3366",fontWeight:700 }}>
          <div style={{ width:5,height:5,borderRadius:"50%",background:"#ff3366",animation:"pulse 1s infinite" }}/>ON AIR
        </div>
      </div>

      <div style={{ maxWidth:480,margin:"0 auto" }}>
        {tab==="radio"   && <RadioScreen onShare={setShareTarget}/>}
        {tab==="youtube" && <YouTubeScreen/>}
        {tab==="map"     && <MapScreen/>}
      </div>

      <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#09091fee",backdropFilter:"blur(16px)",borderTop:"1px solid #ffffff0a",display:"flex",zIndex:100 }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{ flex:1,padding:"10px 0 12px",background:"transparent",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3 }}>
            <span style={{ fontSize:20,filter:tab===t.id?"drop-shadow(0 0 6px #ff3366)":"none",transition:"filter .2s" }}>{t.icon}</span>
            <span style={{ fontSize:9,fontWeight:tab===t.id?"800":"400",color:tab===t.id?"#ff3366":"#555",transition:"color .2s" }}>{t.label}</span>
            {tab===t.id&&<div style={{ width:20,height:2,borderRadius:2,background:"#ff3366",marginTop:1 }}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
