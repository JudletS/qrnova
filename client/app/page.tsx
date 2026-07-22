"use client";

import { FormEvent, useMemo, useState } from "react";

type Code = { id: number; name: string; target: string; scans: number; status: "Active" | "Paused" };
const initialCodes: Code[] = [
  { id: 1, name: "Summer Festival", target: "qrcevo.com/e/summer-festival", scans: 842, status: "Active" },
  { id: 2, name: "Cedar coffee menu", target: "qrcevo.com/menu/cedar", scans: 317, status: "Active" },
  { id: 3, name: "Volunteer check-in", target: "qrcevo.com/check-in/volunteers", scans: 96, status: "Paused" },
];

function Qr({ seed }: { seed: string }) {
  const squares = useMemo(() => {
    let n = [...seed].reduce((total, char) => total + char.charCodeAt(0), 19);
    return Array.from({ length: 441 }, (_, i) => {
      const r = Math.floor(i / 21), c = i % 21;
      const finder = ([0, 14].includes(r) && c < 7) || (r < 7 && [0, 14].includes(c));
      if (finder) { const x = r % 7, y = c % 7; return x === 0 || x === 6 || y === 0 || y === 6 || (x > 1 && x < 5 && y > 1 && y < 5); }
      n = (n * 48271 + i) % 2147483647; return n % 3 !== 0;
    });
  }, [seed]);
  return <div className="qr">{squares.map((on, i) => <i className={on ? "on" : ""} key={i} />)}</div>;
}

export default function Home() {
  const [tab, setTab] = useState("Overview");
  const [codes, setCodes] = useState(initialCodes);
  const [isOpen, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const create = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget);
    const name = String(form.get("name")); const target = String(form.get("target")).replace(/^https?:\/\//, "");
    setCodes([{ id: Date.now(), name, target, scans: 0, status: "Active" }, ...codes]); setOpen(false); setNotice("QR code created and ready to share."); setTimeout(() => setNotice(""), 3500);
  };
  return <main className="shell">
    <aside><a className="brand" href="#"><b>Q</b>QRCevo</a><nav>{["Overview", "QR codes", "Events", "Tickets", "Analytics"].map(item => <button key={item} className={tab === item ? "selected" : ""} onClick={() => setTab(item)}><span>{item === "Overview" ? "⌂" : item === "QR codes" ? "▦" : item === "Events" ? "◇" : item === "Tickets" ? "◫" : "⌁"}</span>{item}</button>)}</nav><div className="plan"><small>CURRENT PLAN</small><b>Free plan</b><p>842 of 1,000 scans used</p><div><i /></div><button>Upgrade plan</button></div><div className="profile"><strong>JD</strong><p><b>Jordan Davis</b><small>jordan@cedar.co</small></p><span>⌄</span></div></aside>
    <section className="workspace"><header><div><p>Workspace / Cedar &amp; Co.</p><h1>{tab}</h1></div><div className="actions"><button className="bell">♧<i /></button><button className="primary" onClick={() => setOpen(true)}>＋ Create QR code</button></div></header>
      {tab === "Overview" ? <>
        <section className="welcome"><div><small>GOOD MORNING, JORDAN</small><h2>Your links are doing the work.</h2><p>One place to create, manage, and understand every QR moment.</p><button className="light" onClick={() => setOpen(true)}>Create your next code&nbsp; →</button></div><figure><div><Qr seed="welcome" /></div><figcaption>Scan. Connect. Grow.</figcaption></figure></section>
        <section className="stats"><article><span>All scans</span><b>1,255</b><p className="green">↑ 18.2% <em>vs last month</em></p></article><article><span>Active QR codes</span><b>{codes.filter(c => c.status === "Active").length}</b><p>1 created this month</p></article><article><span>Upcoming events</span><b>2</b><p>Next: Summer Festival · Aug 3</p></article></section>
        <section className="grid"><article className="card activity"><div className="heading"><div><h3>Scan activity</h3><p>Last 7 days</p></div><button>This week⌄</button></div><div className="chart"><span>250</span><span>125</span><span>0</span><svg viewBox="0 0 640 190" preserveAspectRatio="none"><defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7064ee" stopOpacity=".25"/><stop offset="1" stopColor="#7064ee" stopOpacity="0"/></linearGradient></defs><path d="M0 180 L0 147 L107 122 L213 140 L320 84 L426 111 L533 46 L640 20 L640 180Z" fill="url(#fill)"/><path d="M0 147 L107 122 L213 140 L320 84 L426 111 L533 46 L640 20" fill="none" stroke="#7064ee" strokeWidth="4"/></svg><footer>Mon <i /> Tue <i /> Wed <i /> Thu <i /> Fri <i /> Sat <i /> Sun</footer></div></article><article className="card destination"><div className="heading"><div><h3>Top destination</h3><p>By scans this month</p></div><button className="dots">•••</button></div><div className="top-code"><div><Qr seed="festival" /></div><p><b>Summer Festival</b><small>qrcevo.com/e/summer-festival</small><strong>842 <em>scans</em></strong></p></div><button className="link" onClick={() => setTab("QR codes")}>View all QR codes&nbsp; →</button></article></section>
        <section className="card recent"><div className="heading"><div><h3>Recent QR codes</h3><p>Your newest links and their performance</p></div><button className="link" onClick={() => setTab("QR codes")}>View all&nbsp; →</button></div>{codes.slice(0, 4).map(code => <div className="code" key={code.id}><div className="tiny"><Qr seed={code.name} /></div><p><b>{code.name}</b><small>{code.target}</small></p><span className={code.status === "Active" ? "badge active" : "badge"}>{code.status}</span><strong>{code.scans.toLocaleString()}<small>scans</small></strong><button className="dots">•••</button></div>)}</section>
      </> : <section className="empty"><div>{tab === "QR codes" ? "▦" : tab === "Events" ? "◇" : "◫"}</div><h2>{tab} are ready for you</h2><p>Connect people to the right place, then understand every scan with QRCevo.</p><button className="primary" onClick={() => setOpen(true)}>Create QR code</button></section>}
    </section>
    {isOpen && <div className="overlay"><form onSubmit={create}><button type="button" className="close" onClick={() => setOpen(false)}>×</button><small>NEW QR CODE</small><h2>Where should it lead?</h2><p>Create a dynamic code you can update whenever you need.</p><label>Code name<input name="name" required autoFocus placeholder="e.g. Summer Festival" /></label><label>Destination URL<input type="url" name="target" required placeholder="https://your-site.com" /></label><button className="primary">Create QR code&nbsp; →</button></form></div>}
    {notice && <div className="notice">✓ {notice}</div>}
  </main>;
}
