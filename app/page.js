"use client";
import { useState, useEffect, useRef } from "react";

// ─── Data ──────────────────────────────────────────────
const SONGS = [
  { id:"neon-butterfly",     title:"Neon Butterfly",     artist:"夜空ハナ",  group:"NEON SISTERS",   img:"🦋", color:"#b44fff", plays:12480, venue:"TOKYO IDOL THEATER",        city:"秋葉原", rank:1, duration:188 },
  { id:"starlight-overture", title:"Starlight Overture", artist:"桜花ミル",  group:"SAKURA BLOOM",   img:"🌸", color:"#ff3366", plays:8470,  venue:"SHIBUYA PLEASURE PLEASURE", city:"渋谷",   rank:2, duration:214 },
  { id:"midnight-call",      title:"Midnight Call",      artist:"月城アイ",  group:"MOON PHASE",     img:"🌙", color:"#00d4ff", plays:9210,  venue:"SHELTER",                   city:"下北沢",  rank:3, duration:231 },
  { id:"summer-parade",      title:"Summer Parade",      artist:"陽菜リン",  group:"SUNSHINE GIRLS", img:"🌻", color:"#ffd700", plays:5340,  venue:"SHINJUKU BLAZE",            city:"新宿",   rank:4, duration:197 },
  { id:"heartbeat-drop",     title:"Heartbeat Drop",     artist:"桃瀬ユイ",  group:"PEACH RUSH",     img:"🍑", color:"#ff6b35", plays:5120,  venue:"LIQUID ROOM",               city:"恵比寿",  rank:5, duration:203 },
];

const VENUES = [
  { id:1,  name:"秋葉原",   city:"秋葉原",   x:185, y:100, plays:2203, color:"#b44fff", songs:[{title:"Neon Butterfly",plays:1203},{title:"Starlight Overture",plays:1000}] },
  { id:2,  name:"渋谷",     city:"渋谷",     x:125, y:152, plays:1847, color:"#ff3366", songs:[{title:"Starlight Overture",plays:847},{title:"Summer Parade",plays:1000}] },
  { id:3,  name:"下北沢",   city:"下北沢",   x:90,  y:162, plays:1721, color:"#00d4ff", songs:[{title:"Midnight Call",plays:921},{title:"Neon Butterfly",plays:800}] },
  { id:4,  name:"新宿",     city:"新宿",     x:128, y:102, plays:1534, color:"#ffd700", songs:[{title:"Summer Parade",plays:834},{title:"Heartbeat Drop",plays:700}] },
  { id:5,  name:"池袋",     city:"池袋",     x:88,  y:48,  plays:988,  color:"#00ff9f", songs:[{title:"Neon Butterfly",plays:588},{title:"Summer Parade",plays:400}] },
  { id:6,  name:"高田馬場", city:"高田馬場", x:113, y:72,  plays:810,  color:"#ff6b35", songs:[{title:"Midnight Call",plays:510},{title:"Neon Butterfly",plays:300}] },
  { id:7,  name:"中野",     city:"中野",     x:68,  y:90,  plays:760,  color:"#ff99cc", songs:[{title:"Starlight Overture",plays:460},{title:"Summer Parade",plays:300}] },
  { id:8,  name:"恵比寿",   city:"恵比寿",   x:140, y:172, plays:1210, color:"#00ccff", songs:[{title:"Heartbeat Drop",plays:710},{title:"Midnight Call",plays:500}] },
  { id:9,  name:"目黒",     city:"目黒",     x:133, y:192, plays:690,  color:"#99ff99", songs:[{title:"Heartbeat Drop",plays:390},{title:"Neon Butterfly",plays:300}] },
  { id:10, name:"原宿",     city:"原宿",     x:128, y:128, plays:920,  color:"#ffcc00", songs:[{title:"Starlight Overture",plays:520},{title:"Neon Butterfly",plays:400}] },
  { id:11, name:"赤坂",     city:"赤坂",     x:163, y:132, plays:840,  color:"#cc44ff", songs:[{title:"Midnight Call",plays:440},{title:"Summer Parade",plays:400}] },
  { id:12, name:"六本木",   city:"六本木",   x:168, y:152, plays:1100, color:"#ff4444", songs:[{title:"Heartbeat Drop",plays:600},{title:"Starlight Overture",plays:500}] },
];

const MOCK_VENUES_YT = [
  { city:"渋谷",    venue:"SHIBUYA PLEASURE PLEASURE", color:"#ff3366" },
  { city:"渋谷",    venue:"WWW",                        color:"#ff3366" },
  { city:"下北沢",  venue:"SHELTER",                    color:"#00d4ff" },
  { city:"下北沢",  venue:"GARDEN",                     color:"#00d4ff" },
  { city:"新宿",    venue:"SHINJUKU BLAZE",             color:"#ffd700" },
  { city:"新宿",    venue:"ACB HALL",                   color:"#ffd700" },
  { city:"秋葉原",  venue:"TOKYO IDOL THEATER",         color:"#b44fff" },
  { city:"秋葉原",  venue:"AKiBA CULTURES THEATER",     color:"#b44fff" },
  { city:"池袋",    venue:"BLACK HOLE",                 color:"#00ff9f" },
  { city:"池袋",    venue:"ZERO IKEBUKURO",             color:"#00ff9f" },
  { city:"高田馬場", venue:"AREA",                      color:"#ff6b35" },
  { city:"高田馬場", venue:"PHASE",                     color:"#ff6b35" },
  { city:"中野",    venue:"HEAVY SICK ZERO",            color:"#ff99cc" },
  { city:"中野",    venue:"THE CAGE",                   color:"#ff99cc" },
  { city:"恵比寿",  venue:"LIQUID ROOM",                color:"#00ccff" },
  { city:"恵比寿",  venue:"GARDEN HALL",                color:"#00ccff" },
  { city:"目黒",    venue:"BLUES ALLEY JAPAN",          color:"#99ff99" },
  { city:"目黒",    venue:"MEGURO LIVE STATION",        color:"#99ff99" },
  { city:"原宿",    venue:"LAFORET MUSEUM",             color:"#ffcc00" },
  { city:"原宿",    venue:"ASTRO HALL",                 color:"#ffcc00" },
  { city:"赤坂",    venue:"AKASAKA BLITZ",              color:"#cc44ff" },
  { city:"赤坂",    venue:"RED THEATER",                color:"#cc44ff" },
  { city:"六本木",  venue:"EX THEATER ROPPONGI",        color:"#ff4444" },
  { city:"六本木",  venue:"V2 TOKYO",                   color:"#ff4444" },
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
            <span>東京 #{song.rank}</span>
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
      setStep(1); addLog("📡 YouTube情報を取得中...", "#ffd700");
      const res = await fetch(`/api/youtube?videoId=${videoId}`);
      if(!res.ok){ const j=await res.json(); throw new Error(j.detail||j.error||"YouTube取得失敗"); }
      const yt = await res.json();
      setYtData(yt);
      addLog(`✅ 取得成功: 「${yt.title}」`, "#00ff9f");
      addLog(`👁 再生数: ${yt.viewCount.toLocaleString()}回`, "#00d4ff");

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

      setStep(3); addLog("🗼 東京会場マッピング中...", "#00d4ff");
      const base = Math.min(Math.floor(yt.viewCount/1000), 2000);
      const popular = ai.popularCities||[];
      const venues = MOCK_VENUES_YT.map(v=>({
        ...v,
        plays: Math.max(50, Math.floor(base*(popular.some(c=>v.city.includes(c)||c.includes(v.city))?1.6:1.0)*(0.4+Math.random()*0.6)))
      })).sort((a,b)=>b.plays-a.plays);
      setVenueData(venues);
      addLog(`✅ 東京${venues.length}会場マッピング完了！`, "#00ff9f");
      addLog("🎉 完了！", "#ff3366");
      setStep(4);
    } catch(e) { setError(e.message); setStep(0); addLog(`❌ ${e.message}`, "#ff6666"); }
  };

  const maxPlays = venueData.length ? Math.max(...venueData.map(v=>v.plays)) : 1;

  // エリア別集計
  const areaData = venueData.length ? Object.values(venueData.reduce((acc, v) => {
    if (!acc[v.city]) acc[v.city] = { city: v.city, plays: 0, color: v.color };
    acc[v.city].plays += v.plays;
    return acc;
  }, {})).sort((a,b) => b.plays - a.plays) : [];
  const maxArea = areaData.length ? Math.max(...areaData.map(a=>a.plays)) : 1;

  return (
    <div style={{ padding:"16px",display:"flex",flexDirection:"column",gap:14 }}>
      <div style={{ background:"#0d0d1e",border:"1px solid #ffffff0a",borderRadius:14,padding:16 }}>
        <div style={{ fontSize:11,color:"#888",marginBottom:10 }}>YouTube URLを入力して楽曲・東京会場データを解析</div>
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
            <div style={{ fontSize:12,fontWeight:700,color:"#aaa",marginBottom:12 }}>🗼 東京エリア別 推定再生数/日</div>
            {/* エリア別集計ドット */}
            <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginBottom:16,alignItems:"flex-end",justifyContent:"center" }}>
              {areaData.map(a => {
                const r = 14 + (a.plays/maxArea)*20;
                return (
                  <div key={a.city} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:3 }}>
                    <div style={{ width:r*2,height:r*2,borderRadius:"50%",background:`${a.color}33`,border:`1px solid ${a.color}88`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:a.color,fontWeight:700,textAlign:"center",lineHeight:1.2 }}>
                      {a.plays>999?`${(a.plays/1000).toFixed(1)}k`:a.plays}
                    </div>
                    <div style={{ fontSize:8,color:"#666" }}>{a.city}</div>
                  </div>
                );
              })}
            </div>
            {/* 個別会場リスト */}
            {venueData.map((v,i)=>(
              <div key={v.venue} style={{ marginBottom:10 }}>
                <div style={{ display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:4 }}>
                  <span style={{ color:i===0?"#fff":"#aaa" }}><span style={{ color:v.color,marginRight:6 }}>#{i+1}</span>{v.city} <span style={{ color:"#555",fontSize:10 }}>— {v.venue}</span></span>
                  <span style={{ color:v.color,fontWeight:700 }}>{v.plays.toLocaleString()} 回/日</span>
                </div>
                <div style={{ background:"#1a1a2e",borderRadius:4,height:5 }}>
                  <div style={{ width:`${(v.plays/maxPlays)*100}%`,height:"100%",borderRadius:4,background:`linear-gradient(90deg,${v.color}66,${v.color})`,transition:"width 1s ease" }}/>
                </div>
              </div>
            ))}
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
  const text = `🎵 今これ聴いてる！\n「${song.title}」/ ${song.artist}\n東京${song.city}の会場でも大人気🔥\n#IDOLWAVE`;

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
      <svg viewBox="45 25 165 185" style={{ width:"100%",maxHeight:280,display:"block" }} onClick={()=>setSel(null)}>
        <defs><pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ffffff04" strokeWidth=".5"/></pattern></defs>
        <rect x="45" y="25" width="165" height="185" fill="url(#g)"/>
        {/* 主要路線 */}
        <polyline points="88,48 113,72 128,102 128,128 125,152 140,172 133,192" fill="none" stroke="#1e1e40" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="128" y1="102" x2="185" y2="100" stroke="#1e1e40" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="128" y1="102" x2="68" y2="90" stroke="#1e1e40" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="125" y1="152" x2="90" y2="162" stroke="#1e1e40" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="128" y1="128" x2="163" y2="132" stroke="#1e1e40" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="163" y1="132" x2="168" y2="152" stroke="#1e1e40" strokeWidth="1.5" strokeDasharray="3,3"/>
        <line x1="163" y1="132" x2="185" y2="100" stroke="#1e1e40" strokeWidth="1.5" strokeDasharray="3,3"/>
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
            <div style={{ display:"flex",justifyContent:"space-between",marginBottom:6 }}>
              <div>
                <div style={{ fontSize:10,color:selV.color,fontWeight:700,marginBottom:4 }}>📍{selV.city}</div>
                <div style={{ fontSize:14,fontWeight:900 }}>{selV.name} エリア</div>
              </div>
              <button onClick={()=>setSel(null)} style={{ background:"transparent",border:"none",color:"#555",fontSize:18,cursor:"pointer" }}>×</button>
            </div>
            <div style={{ fontSize:10,color:"#555",marginBottom:10 }}>
              {MOCK_VENUES_YT.filter(v=>v.city===selV.city).map(v=>v.venue).join(" · ")}
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
                  <div style={{ fontSize:10,color:"#666" }}>{MOCK_VENUES_YT.filter(mv=>mv.city===v.city).map(mv=>mv.venue).join(" · ")}</div>
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
  { id:"map",     icon:"🗼", label:"マップ" },
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
          <span style={{ fontSize:10,color:"#555",marginLeft:8 }}>東京ライブハウス</span>
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
}export async function POST(request) {
  try {
    const body = await request.json();
    const { title, channel, description, tags, viewCount } = body;

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json({ error: "ANTHROPIC_API_KEY未設定" }, { status: 500 });
    }

    const prompt = `以下のYouTube動画がアイドル楽曲か判断し、JSON形式のみで回答してください。説明文不要。
タイトル: ${title}
チャンネル: ${channel}
再生数: ${viewCount}

{"isIdol":true,"confidence":0.95,"songTitle":"曲名","artistName":"アーティスト名","groupName":"グループ名","genre":"ジャンル","mood":"雰囲気","targetAge":"年齢層","popularCities":["東京","大阪"],"reason":"理由1文"}`;

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
    const raw = data.content.map(c => c.text || "").join("").replace(/```json|```/g, "").trim();
    return Response.json(JSON.parse(raw));

  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
