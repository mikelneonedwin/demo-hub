function IR(){
    if(!ms.get("id")) return location.href = '/signup/';
    const id = ms.get("id");
    if(!id.aid) return w('You don\'t have an artist account').then(() => AJAX('/'));
    function T(){
        const ach = [];
        //chart, genres
        //calculate streams of all artists
        const aX = Object.values(ms.get("aid")).reduce((a,b) => {
            a[b.aid] = {id: b.aid, streams: b.streams + 2 * b.downloads, recent: b.recent};
            return a;
        }, {})
        const ss = Object.entries(aX).sort((a,b) => b[1].streams - a[1].streams).map(a => Number(a[0])).indexOf(Number(id.aid)) + 1;
        const sr = Object.entries(aX).sort((a,b) => b[1].recent - a[1].recent).map(a => Number(a[0])).indexOf(Number(id.aid)) + 1;
        const aid = id.aid.ad();
        function th(num){
            const t = String(num).split('').pop();
            const txt =["th", "st", "nd", "rd", ...Array(6).fill("th")];
            return  num + txt[t];
        }
        ach.push(`No. ${ss} Most Streamed Artist`);
        ach.push(`No. ${sr} Trending Artist`);
        if(aid.sid.length){
            const sid = aid.sid.map(a => a.sd()).filter(a => !a.alid).map(d => ({id: Number(d.sid), streams: d.streams + d.downloads * 2, recent: d.recent}))
            const allSid = Object.values(ms.get("sid")).filter(a => !a.alid).map(d => ({id: Number(d.sid), streams: d.streams + d.downloads * 2, recent: d.recent}));
            const msid = sid.sort((a,b) => b.streams - a.streams)[0].id;
            const tsid = sid.sort((a,b) => b.recent - a.recent)[0].id;
            const ma = allSid.sort((a,b) => b.streams - a.streams).map(a => a.id).indexOf(msid) + 1;
            const ta = allSid.sort((a,b) => b.recent - a.recent).map(a => a.id).indexOf(tsid) + 1;
            ach.push(`No. ${ma} Most Streamed Single (${msid.sd('name')})`);
            ach.push(`No. ${ta} Trending Single (${tsid.sd('name')})`);
        }
        if(aid.alid.length){
            const alid = aid.alid.map(a => {
                const d = a.ed();
                const c = {id: Number(d.alid), streams: d.streams + d.downloads * 2, recent: d.recent};
                return c;
            });
            const allAlid = Object.values(ms.get("alid")).map(d => ({id: Number(d.alid), streams: d.streams + d.downloads * 2, recent: d.recent}));
            const malid = alid.sort((a,b) => b.streams - a.streams)[0].id;
            const talid = alid.sort((a,b) => b.recent - a.recent)[0].id;
            const ma = allAlid.sort((a,b) => b.streams - a.streams).map(a => a.id).indexOf(malid) + 1;
            const ta = allAlid.sort((a,b) => b.recent - a.recent).map(a => a.id).indexOf(talid) + 1;
            ach.push(`No. ${ma} Most Streamed Album (${malid.ed('name')})`);
            ach.push(`No. ${ta} Trending Album (${talid.ed('name')})`);
        }
        const chartp = SRT(ms.get("aid"), "ar").map(a => Array.isArray(a.aid) ? a.aid.map(a => Number(a)) : [Number(a.aid)]);
        let pos;
        for(const data of chartp){
            if(data.includes(id.aid)) {
                pos = chartp.indexOf(data) + 1;
                break;
            }
        }
        ach.push(`No. ${pos} on Artist Chart`);
        const charts = SRT(ms.get("sid"), "s").map(a => Array.isArray(a.aid) ? a.aid.map(a => Number(a)) : [Number(a.aid)]);
        for(const data of charts){
            if(data.includes(id.aid)) {
                pos = charts.indexOf(data) + 1;
                break;
            }
        }
        ach.push(`No. ${pos} on Music Chart`);
        const charta = SRT(ms.get("alid"), "al").map(a => Array.isArray(a.aid) ? a.aid.map(a => Number(a)) : [Number(a.aid)]);
        for(const data of charta){
            if(data.includes(id.aid)) {
                pos = charta.indexOf(data) + 1;
                break;
            }
        }
        if(pos != 0) {
            ach.push(`No. ${pos} on Album Chart`)
            ach.push(`${aid.streams + aid.downloads * 2} All Time Streams`)
        };
        //find the contribution of all the songs and albums
        //streams, gain, progress
        const [mode1, smore1] = useState('progress');
        const [mode2, smore2] = useState('progress');
        return [
            <div style={{backgroundImage: `url('/6956144-cool-hd-music-wallpapers.jpg')`}}><p>Stats</p></div>,
            // <nav style={{backgroundImage: `url('/6956144-cool-hd-music-wallpapers.jpg')`}}><img src={id.img}/></nav>,
            <p className="category" style={{textAlign: "center"}}><span className="symbol">info</span> Achievements <span className="symbol">info</span></p>,
            <div>
                <table style={{display: "block", width: '100%', lineHeight: "2em", fontWeight: "bold"}}>
                    <tbody  style={{display: "block", width: '100%'}}>
                        {(() => {
                            const m = ach;
                            const d = m.reduce((a,b,c) => {
                                if(c % 2 == 0){
                                    a.push([<td style={{display: "inline-block", width: '45%'}}>{b}</td>]);
                                } else {
                                    a[a.length -1].push(<td style={{display: "inline-block", width: '45%'}}>{b}</td>);
                                }
                                return a;
                            }, []);
                            return (wide ? d : m).map(a => <tr style={{display: "block", width: '100%'}}>{a}</tr>)
                        })()}
                    </tbody>
                </table>
            </div>,
            // <div>{all}</div>,
            <p className="category" style={{display: "flex", alignItems: "center", justifyContent: "normal"}}>Song Performance
                <select onChange={(e) => smore1(e.target.value)}>
                    <option value="progress">Performance</option>
                    <option value="streams">Streams</option>
                    <option value="gain">Gain</option>;
                </select>
            </p>,
            <div className="stat">
                {(() => {
                    const sorted = SRT(aid.sid.map(a => a.sd()), "s");
                    let total; let print;
                    if(mode1 == "progress"){
                        total = sorted.reduce((a,b) => a + b.ps, 0);
                        print = sorted.map(a => Object.assign(a, {p: Math.round(a.ps / total * 100)}));
                    } else if(mode1 == "streams"){
                        total = sorted.reduce((a,b) => a + b.plays, 0);
                        print = sorted.map(a => Object.assign(a, {p: Math.round(a.plays / total * 100)}));
                    } else if(mode1 == "gain"){
                        total = sorted.reduce((a,b) => a+b.recent, 0);
                        print = sorted.map(a => Object.assign(a, {p: Math.round(a.recent / total * 100)}));
                    }
                    return print.sort((a,b) => b.p - a.p).slice(0,10).map(a => 
                        <div>
                            <img src={a.img}/>
                            <div>
                                <span>{a.name} {a.feat ? wide ? `(feat. ${a.feat})` : a.feat.length <= 10 ? `(feat. ${a.feat})` : `(feat. ${a.feat.split('').slice(0,10).join('')}...)` : ''}<i>{a.p}%</i></span>
                                <progress value={a.p} max="100" min="0"></progress>
                            </div>
                        </div>
                    )
                })()}
            </div>,
            <p className="category" style={{display: "flex", alignItems: "center", justifyContent: "normal"}}>Album Performance
                <select onChange={(e) => smore2(e.target.value)}>
                    <option value="progress">Performance</option>
                    <option value="streams">Streams</option>
                    <option value="gain">Gain</option>;
                </select>
            </p>,
            <div className="stat" style={{display: aid.alid.length ? undefined : "none"}}>
                {(() => {
                    const sorted = SRT(aid.alid.map(a => a.ed()), "al");
                    let total; let print;
                    if(mode2 == "progress"){
                        total = sorted.reduce((a,b) => a + b.ps, 0);
                        print = sorted.map(a => Object.assign(a, {p: Math.round(a.ps / total * 100)}));
                    } else if(mode2 == "streams"){
                        total = sorted.reduce((a,b) => a + b.plays, 0);
                        print = sorted.map(a => Object.assign(a, {p: Math.round(a.plays / total * 100)}));
                    } else if(mode2 == "gain"){
                        total = sorted.reduce((a,b) => a+b.recent, 0);
                        print = sorted.map(a => Object.assign(a, {p: Math.round(a.recent / total * 100)}));
                    }
                    return print.sort((a,b) => b.p - a.p).slice(0,10).map(a => 
                        <div>
                            <img src={a.img}/>
                            <div>
                                <span>{a.name} {a.feat ? wide ? `(feat. ${a.feat})` : a.feat.length <= 10 ? `(feat. ${a.feat})` : `(feat. ${a.feat.split('').slice(0,10).join('')}...)` : ''} <i>{a.p}%</i></span>
                                <progress value={a.p} max="100" min="0"></progress>
                            </div>
                        </div>
                    )
                })()}
            </div>
            
        ]
    }
    return render(<T/>, display);
}