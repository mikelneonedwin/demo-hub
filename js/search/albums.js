function initializeRenders(){
    let ts = new Date().getTime();
    function Result(){
        let q = new URL(location.href).searchParams.get("search").toLowerCase().split(' ');
        let results = [];
        Object.values(ms.get('alid')).forEach(a => {
            q.forEach(b => {
                if(a.name.toLowerCase().includes(b)) if(!results.includes(a.alid)) results.push(a.alid);
                if(ms.get('aid')[a.aid].name.toLowerCase().includes(b))  if(!results.includes(a.alid)) results.push(a.alid);
            })
        })
        if(results.length == 0) return (<p className="error">NO RESULTS FOUND</p>);
        return results.map(a => ms.get('alid')[a]).shuffle().map((a,b) => {
            function img2(){
                let key1 = a.sid.map(c => ms.get('sid')[c]);
                key1.forEach(c => {
                    c.ts = (Math.abs(ts - c.age) / (1000 * 60 * 60 * 24));
                    c.plays = c.streams + (c.downloads * 2);
                })
                let MA = Math.max(...key1.map((e) => e.ts));
                let MP = Math.max(...key1.map((e) => e.plays));
                let MR = Math.max(...key1.map((e) => e.recent));
                key1.forEach(c =>{c.ps = ((c.plays/MP) * (Math.check(c.recent)/MR)) / (c.ts/MA)});
                key1.sort((a,b) => b.ps - a.ps)
                return key1[0].img;
            }
            function handleClick(){
                location.href = `/albums/listen?id=${a.alid}`
            }
            if(wide){
                return (
                    <div key={b} onClick={handleClick}>
                        <img src={img2()}/>
                        <span>{a.name}</span>
                        <span>{ms.get('aid')[a.aid].name}</span>
                        <span>{ms.get("gid")[a.gid[0]].name}</span>
                        <span className="icon">workspaces</span>
                    </div>
                )
            } else {
                return (
                    <div key={b} onClick={handleClick}>
                            <img src={img2()}/>
                            <div>
                                <span>{a.name}</span>
                                <span>{ms.get('aid')[a.aid].name} • {ms.get("gid")[a.gid[0]].name}</span>
                            </div>
                    </div>
                )
            }
        })
    }
    ReactDOM.render(<Result/>, document.querySelector("div.charts"));    
}