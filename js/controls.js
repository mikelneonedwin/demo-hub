const display = document.querySelector("display"); const Z = globalThis;
const progress = document.createElement("progress");
progress.id = "progress";
progress.value = 0;
document.body.appendChild(progress);
const {useState, useRef, useEffect, memo} = React;
const {render} = ReactDOM;
const unmount = ReactDOM.unmountComponentAtNode;
let wide = Z.innerWidth > Z.innerHeight;
Z.onresize = () => {
    if(wide != Z.innerWidth > Z.innerHeight) location.href = location.href;
}
Z.interval = undefined;
const cr = setInterval(() => {
    if(typeof rtdb != "undefined"){
        clearInterval(cr);
        rtdb.start();
    }
})
Array.prototype.shuffle = function(){
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
}
Math.range = function(n, end = false){
    if(end){
        return Array((end+1) - n).fill(n).map((a,b) => a+b);
    } else {
        return Array(n+1).fill(0).map((a,b) => a+b);
    }
}
function CTRL({psid, pplay = true, xes, C = undefined}){
    const c = localStorage.getItem("c") ? JSON.parse(localStorage.getItem("c")) : null;
    const [sid, ssid] = useState(psid);
    const [play, sp] = useState(pplay);
    const [loop, slp] = useState(c ? c.l : false);
    const [shuffle, ssh] = useState(c ? c.s : false);
    const [vol, svl] = useState(c ? c.v : 1);
    const [currentTime, sct] = useState(0);
    const [C1, setC1] = useState(true);
    const [pv, sv] = useState(vol != 0 ? vol : c ? c.pv : 1);
    const inputRef = useRef(0);
    const ar = useRef(0);
    const progRef = useRef(0);
    const [indexes, sxes] = useState(xes);
    window.y = useState(function(){
        return indexes.map(a => {
            const x = {};
            x[a] = 0;
            return x;
        });
    })[0];
    window.Q = function(d, m){
        if(m == "add"){
            const a = {};
            a[d] = 0;
            y.splice(mE("i")+1, 0, a);
            sxes(y.map(a => Object.keys(a)[0]));
        }
    }
    window.mE = useState(function(){
        let i = indexes.indexOf(sid);
        if(i == -1) i = indexes.indexOf(String(sid));
        if(i == -1) i = indexes.indexOf(Number(sid));
        y[i][indexes[i]]++;
        return function(s){
            function cs(n){
                if(n == sid) ar.current.currentTime = 0;
                ssid(n);
            }
            if(indexes.length == 1 && s == "l") return PT(sid, indexes);
            if(s == "n"){
                i++;
                if(!indexes[i]) i = 0;
                y[i][indexes[i]]++;
                return cs(indexes[i]);
            }
            if(s == "i") return i;
            if(s == "b"){
                i--;
                if(!indexes[i]) i = indexes.length -1;
                y[i][indexes[i]]++;
                return cs(indexes[i]);
            }
            if(s == "s"){
                const min = Math.min(...y.map(a => Object.values(a)[0]));
                const list = Object.values(y).map(a => Object.entries(a)[0]).filter(a => a[1] == min).map(a => a[0]);
                let n = Math.round(Math.random()/1*list.length);
                while(!list[n]){n = Math.round(Math.random()/1*list.length)}
                const r = {};
                r[list[n]] = min;
                i = y.map(a => JSON.stringify(a)).indexOf(JSON.stringify(r));
                y[i][indexes[i]]++;
                return cs(indexes[i]);
            }
        }
    })[0];
    useEffect(() => {
        localStorage.setItem("c", JSON.stringify({v: vol, s: shuffle, l: loop, pv: pv}));
    }, [loop, vol, shuffle])
    useEffect(() => {
        ar.current.ontimeupdate = (e) => {
            if(e.target.currentTime == Infinity || e.target.duration == Infinity || isNaN(Number(e.target.currentTime)) || isNaN(Number(e.target.duration))) return false;
            sct(e.target.currentTime);
            const crt = Math.floor(e.target.currentTime % 60);
            const drt = Math.floor(e.target.duration % 60);
            let mt = `${Math.floor(e.target.currentTime / 60)}:${crt < 10 ? `0${crt}` : crt}`;
            let ct = `${Math.floor(e.target.duration / 60)}:${drt < 10 ? `0${drt}` : drt}`;
            document.querySelector("input").placeholder = `${mt}~${ct}`;
            (async function(){
                let r = await idb.get("queue");
                if(!r) r = {};
                if(e.target.currentTime >= 1){
                    r.c = e.target.currentTime;
                    await idb.set("queue", r);
                }
            })();
        };
        ar.current.onplaying = async(e) => {
            if(e.target.duration == Infinity || isNaN(Number(e.target.duration))) await new Promise((resolve,reject) => setTimeout(resolve,1000));
            progRef.current.max = Math.floor(e.target.duration);
            inputRef.current.max = Math.floor(e.target.duration);
        }
        ar.current.onerror = () => sp(false);
        ar.current.onplay = (e) => {
            if(C && C1) {
                const RS = setInterval(() => {
                    e.target.currentTime = C;
                    C = undefined;
                    clearInterval(RS);
                })
            }
            interval = setInterval(() => {
                elapsed++;
                if(elapsed >= 30){
                    clearInterval(interval);
                    rtdb.update('streams', sid);
                    elapsed = 0;
                    ar.current.onplay = () => undefined;
                }
            }, 1000)
        };
        ar.current.onpause = () => {
            clearInterval(interval);
        };
        ar.current.onerror = () => ar.current.onpause();
        ar.current.onabort = () => ar.current.onpause();
        (async () => {
            const tx = await idb.get("queue") || {c: 0};
            idb.set("queue", {psid: sid, queue: indexes, c: tx.c});
        })()
        play ? ar.current.play() : ar.current.pause();
        navigator.mediaSession.metadata = new MediaMetadata({
            title: sid.sd('name'),
            artist: sid.sd('names'),
            album: sid.sd('alid') ? sid.sde('name') : undefined,
            artwork: [{ src: sid.sd('img'), sizes: '512x512', type: 'image/' + (function(){const t = sid.sd('img').split('.').pop(); if(t.startsWith("jp")) return "jpeg"; else return t})()}]
        });
        navigator.mediaSession.setActionHandler('play', function(){sp(true)});
        navigator.mediaSession.setActionHandler('pause', function(){sp(false)});
        navigator.mediaSession.setActionHandler('nexttrack', () => mE("n"));
        navigator.mediaSession.setActionHandler('previoustrack', () => mE("b"));
        setC1(false);
    }, [sid])
    useEffect(() => {
        ar.current.volume = vol;
        if(vol != 0) sv(vol);
        Z.onkeypress = (e) => {
            if(e.target.tagName == "INPUT" || e.ctrlKey || e.altKey || e.altKey) return undefined;
            let vl = vol * 100;
            if(e.key == "]"){
                e.preventDefault();
                const val = (vl+1)/100;
                svl(val >= 1 ? 1 : val); 
            } else if(e.key == "["){
                e.preventDefault();
                const val = (vl-1)/100;
                svl(val <= 0 ? 0 : val);
            }
        }
    }, [vol])
    useEffect(() => {
        play ? ar.current.play() : ar.current.pause();
    }, [play])
    useEffect(() => {
        ar.current.onended = () => {
            if(loop) mE("l");
            else if(shuffle) mE("s");
            else mE("n");
        }
    }, [shuffle, loop, sid]);
    let elapsed = 0;
    async function s0(){
        let f = await idb.get("queue");
        f.c = 0;
        idb.set("queue", f);
    }
    sessionStorage.setItem("q", JSON.stringify(indexes));
    function download(){
        rtdb.update('downloads', sid);
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.href = sid.sd('url');
        link.setAttribute("download", "");
        link.click();
        document.body.removeChild(link);
    }
    Z.onkeydown = (event) => {
        if(!Boolean(event.target.tagName == "INPUT"  || event.ctrlKey || event.altKey || event.shiftKey)){
            if(event.key.toLowerCase() == " "){
                event.preventDefault();
                sp(!play);
            }
            if(event.key.toLowerCase() == "arrowleft"){
                event.preventDefault();
                if((ar.current.currentTime - 10) >= 0) ar.current.currentTime -=10
                else mE("b");
            }
            if(event.key.toLowerCase() == "arrowright"){
                event.preventDefault();
                if((ar.current.currentTime + 10) < ar.current.duration) ar.current.currentTime += 10;
                else mE("n");
            }
            if(event.key.toLowerCase() == "n"){
                event.preventDefault();
                mE("n");
            }
            if(event.key.toLowerCase() == "b"){
                event.preventDefault();
                mE("b");
            }
            if(event.key.toLowerCase() == "d"){
                event.preventDefault();
                download();
            }
            if(event.key.toLowerCase() == "s"){
                event.preventDefault();
                ssh(!shuffle);
            }
            if(event.key.toLowerCase() == "l"){
                event.preventDefault();
                slp(!loop);
            }
            if(event.key.toLowerCase() == "m"){
                event.preventDefault();
                svl(vol == 0 ? pv : 0);
            }
        }
    }
    return [
        <input key="1" onChange={(e) => ar.current.currentTime = e.target.value} type="range" min="0" ref={inputRef}/>,
        <progress key="2" value={currentTime} ref={progRef} min="0"></progress>,
        <SC sid={sid} key="3" vol={vol} svl={svl} download={download} mE={mE} play={play} pv={pv} ssh={ssh} shuffle={shuffle} slp={slp} loop={loop} sp={sp}/>,
        <audio ref={ar} key="4" src={sid.sd('url')}></audio>
    ]
}
const SC = memo(({sid, vol, svl, download, play, ssh, shuffle, slp, loop, sp, pv}) => {
    window.span = useRef(0);
    if(wide){
        return (
            <div>
                <div>
                    <img src={sid.sd('img')}/>
                    <div>
                        <span>{sid.sd('name')} {sid.sd('feat') ? `(feat. ${sid.sd('feat')})`: undefined}</span>
                        <span>{sid.sd('names')} {sid.sd('alid') ? `• ${sid.sde('name')}` : undefined}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="symbol" onClick={() => ssh(!shuffle)}>{shuffle ? 'shuffle_on' : 'shuffle'}</span>
                        <span className="symbol" onClick={() => mE("b")}>skip_previous</span>
                        <span className="symbol" onClick={() => sp(!play)}>{play ? 'pause_circle' : 'play_circle'}</span>
                        <span className="symbol" onClick={() => mE("n")}>skip_next</span>
                        <span className="symbol" onClick={() => slp(!loop)}>{loop ? 'repeat_on' : 'repeat'}</span>
                    </div>
                </div>
                <div>
                    <div>
                        <span className="symbol" onClick={() => {vol == 0 ? svl(pv) : svl(0)}}>{vol == 0 ? 'volume_off' : 'volume_up'}</span>
                        <input type="range" min="0" max="100" onChange={(e) => svl(e.target.value / 100)}/>
                        <progress min="0" value={vol * 100} max="100"></progress>
                        <span className="symbol" onClick={download}>download</span>
                    </div>
                </div>
            </div>
        )
    } else {
        return [
            <div key="1">
                <img src={sid.sd('img')}/>
                <div>
                    <span>{sid.sd('name')} {sid.sd('feat') ? `(feat. ${sid.sd('feat')})`: undefined}</span>
                    <span>{sid.sd('names')} {sid.sd('alid') ? `• ${sid.sde('name')}` : undefined}</span>
                </div>
                <span className="symbol" onClick={() => sp(!play)}>{play ? 'pause_circle' : 'play_circle'}</span>
                <span className="symbol" onClick={download} style={{opacity: 1}}>download</span>
            </div>,
            <nav key="2">
                <a href="/queue/"><span>Queue</span></a>
                <a href="/charts/"><span>Charts</span></a>
                <a href="/myaccount/"><span>Profile</span></a>
            </nav>
        ]
    }
})
const AJAX = (() => {
    const hscroll = {}; const ajaxbox = {}; const indexed = {};
    return async function(url){
        Z.IR = undefined;
        let txt;
        if(url instanceof URL) txt = url.pathname;
        else if(typeof url == "object") txt = url.pathname;
        else if(typeof url == "string" && url.includes(":")) txt = new URL(url).pathname;
        else txt = (url.startsWith("/") ? new URL(`${location.origin}${url}`) : new URL(`${location.origin}${location.pathname}${url}`)).pathname;
        txt = txt != "/" ? `/${txt.split('/').filter(a => a != '').join("/")}/` : "/"
        let vail;
        if(url instanceof URL) vail = url.href;
        else if(typeof url == "object") vail = url.href;
        else if(typeof url == "string" && url.includes(":")) vail = new URL(url).href;
        else vail = (url.startsWith("/") ? new URL(`${location.origin}${url}`) : new URL(`${location.origin}${location.pathname}${url}`)).href;
        hscroll[location.href] = scrollY;
        if(!ajaxbox[txt]){
            const max = [...ajaxpath.js[txt].toArray(true), ...(ajaxpath.css[txt] ? ajaxpath.css[txt].toArray(true) : [])].length * 100;
            progress.style.display = "block";
            progress.max = max;
            let count = 0;
            ajaxbox[txt] = {css:[], js:[]};
            for(const script of ajaxpath.js[txt].toArray(true)){
                if(script in indexed) ajaxbox[txt].js.push(indexed[script]);
                else {
                    await new Promise((resolve,_) => {
                        const xhr = new XMLHttpRequest;
                        xhr.open('GET', script, true);
                        xhr.onprogress = event => {
                            if (!event.lengthComputable) progress.value = (count + 100)  / max * 100;
                            else progress.value = ((event.loaded / event.total * 100) + count) / max * 100;
                        }
                        xhr.onload = () => {
                            ajaxbox[txt].js.push(xhr.responseText);
                            indexed[script] = xhr.responseText;
                            resolve(true);
                        }
                        xhr.send();
                    })
                }
                count += 100;
            }
            if(ajaxpath.css[txt]){
                for(const script of ajaxpath.css[txt].toArray(true)){
                    if(script in indexed) ajaxbox[txt].css.push(indexed[script]);
                    else {
                        await new Promise((resolve,_) => {
                            const xhr = new XMLHttpRequest;
                            xhr.open('GET', script, true);
                            xhr.onprogress = event => {
                                if (!event.lengthComputable) progress.value = (count + 100)  / max * 100;
                                else progress.value = ((event.loaded / event.total * 100) + count) / max * 100;
                            }
                            xhr.onload = () => {
                                ajaxbox[txt].css.push(xhr.responseText);
                                indexed[script] = xhr.responseText;
                                resolve(true);
                            }
                            xhr.send();
                        })
                    }
                    count += 100;
                }
            }
    
        }
        Array.from(document.getElementsByTagName("style")).forEach(a => a.parentElement.removeChild(a));
        const Allowed = ["/css/google-font.css", "/all.css", "/big.css", "/small.css", "css/google-font.css", "all.css", "big.css", "small.css"];
        Array.from(document.querySelectorAll("[rel=stylesheet]")).filter(a => !Allowed.includes(a.getAttribute("href"))).forEach(a =>  a.parentElement.removeChild(a));
        document.title = ajaxpath.title[txt];
        for(const script of ajaxbox[txt].js){document.head.appendChild(document.createElement("script")).textContent = Babel.transform(script, {presets: ['es2015'], plugins: ['transform-react-jsx']}).code;}
        for(const css of ajaxbox[txt].css){document.head.appendChild(document.createElement("style")).textContent = css;}
        const x = hscroll[location.href];
        window.scroll(0, x);
        history.pushState("", "", vail);
        IR();
        render(<NB/>, document.querySelector("navbar"));
        progress.style.display = "none";
        progress.value = "0";
    }
})()
Z.addEventListener("click", event => {
    const tree = [];
    let state = event.target;
    while(state.parentElement){
        tree.push(state.parentElement);
        state = state.parentElement;
    }
    if(tree.some(a => a.tagName == "A" && a.href && !a.getAttribute("class"))){
        event.preventDefault();
        for(const elem of tree){
            if(elem.tagName == "A" && elem.href && !elem.getAttribute("class")) return AJAX(elem.href);
        }
    }
});
Z.onpopstate = function(event){AJAX(event.target.location, true)};
async function idbload(){
    render(<NB/>, document.querySelector("navbar"));
    if(!wide) document.querySelector("navbar").onclick = () => document.querySelector("navbar").classList.remove("visible");
    render(<P/>, document.querySelector("panel"));
    IR();
    const data = await idb.get("queue");
    if(data && data.psid) PT(data.psid, data.queue, false, data.c);
}
function PT(sid, queue, pplay = true, C = false){ 
    if(typeof sid == "object"){
        queue = sid;
        sid = queue[0];
    }
    if(queue){
        if(typeof queue[0] == "object"){
            queue = queue.map(a => a.sid);
        }
    }
    if(queue) sessionStorage.setItem("q", JSON.stringify(queue)); else sessionStorage.setItem("q", JSON.stringify([sid]));
    unmount(document.querySelector("controls"));
    return render(<CTRL psid={sid} xes={queue} pplay={pplay} C={C}/>, document.querySelector("controls"));
}
function NB(){
    function U() {
        if(ms.get('id')){
            return (
                <div>
                    <img src={ms.get('id', 'img')}/>
                    <a><span>{ms.get('id', 'username')}</span></a>
                </div>
            )
        } else {
            return (
                <div>
                    <span className="icon">account_circle</span>
                    <a href="/login/" className="non-ajax"><span>Sign In</span></a>
                </div>
            )
        }
    }
    function urm(path){
        if(location.pathname == path) return undefined;
        else return path;
    }
    const Tab = ({icon,path,txt}) => <a href={location.pathname == path ? undefined : path}><span><i className="symbol">{icon}</i>{txt}</span></a>;
    return [
        <U/>,
        <div>
            <Tab icon="home" txt="Home" path="/"/>
            <Tab icon="explore" txt="Explore" path="/explore/"/>
            <Tab icon="bar_chart" txt="Charts" path="/charts/"/>
            <Tab icon="list" txt="Queue" path="/queue/"/>
            <Tab icon="podcasts" txt="Trending" path="/trending/"/>
            <Tab icon="layers" txt="Library" path="/library/"/>
            <Tab icon="insights" txt="Stats" path="/stats/"/>
            <Tab icon="perm_identity" txt="Profile" path="/myaccount/"/>
            <Tab icon="search" txt="Search" path="/search/"/>
            <Tab icon="open_in_new" txt="New" path="/new/"/>
            <Tab icon="upload" txt="Upload" path="/upload/"/>
            <Tab icon="mic" txt="Artist" path="/artists/"/>
            <Tab icon="album" txt="Albums" path="/albums/"/>
            <Tab icon="library_music" txt="Genres" path="/genres/"/>
            <Tab icon="radio" txt="Playlists" path="/playlists/"/>
            <Tab icon="info" txt="About" path="/about/"/>
        </div>
    ]
}
function P(){
    let inputRef = useRef(0);
    useEffect(() => {
        inputRef.current.onkeydown = (e) => {
            if(e.key == "Enter") return AJAX(`/search/?search=${inputRef.current.value}`);
        };
    })
    if(wide){
        return (
            <div>
                <div>
                    <img src="/favicon.png"/>
                    <span>AudHub</span>
                </div>
                <div>
                    <div>
                        <input ref={inputRef} type="search" placeholder="Search"/>
                    </div>
                </div>
                <div>
                    <div>
                        <a href="/charts/"><button>Charts</button></a>
                        <a href="/upload/"><button>Upload</button></a>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <span className="icon" onClick={() => document.querySelector("navbar").classList.add("visible")}>menu</span>
                <input ref={inputRef} type="search" placeholder="Search"/>
                <span className="icon">search</span>
            </div>
        )
    }
}
const AH = {
    P: function(){
        let ts = new Date().getTime();
        function FY(){
            if(!ms.get('likes')) return undefined;
            let key1 = Object.keys(ms.get('likes', 'sid')).map(a => a.sd()).filter(a => a);
            let key2 = [];
            let key2Temp = [];
            Object.values(ms.get('sid')).forEach(a => {
                key1.forEach(b => {
                    if(a.gid == b.gid) key2Temp.push(a.sid);
                    if(Array.isArray(b.aid)){
                        b.aid.forEach(c => {
                            if(a.feat) if(a.feat.includes(ms.get('aid', `${c}.name`))) key2Temp.push(a.sid);
                        })
                    } else {
                        if(a.feat) if(a.feat.includes(ms.get('aid')[b.aid].name)) key2Temp.push(a.sid);
                    }
                    if(b.feat) if(b.feat.includes(a.sid.sd('names'))) key2Temp.push(a.sid);
                    if(a.alid && b.alid) if(a.alid == b.alid) key2Temp.push(a.sid);

                    if(a.aid == b.aid) key2Temp.push(a.sid);
                })
            })
            //filter key2Temp;
            key2Temp = key2Temp.reduce((a, b) => {
                if (!a.includes(b)) {
                a.push(b);
                }
                return a;
            }, []);
            key2Temp = key2Temp.filter(a => {
                return !Object.keys(ms.get("likes").sid).includes(a);
            })
            key2 = key2Temp.map(a => ms.get('sid', a)).slice(0,50)[0];
            if(!key2) return undefined;
            return (
                <div onClick={() => AJAX(`/playlists/for-you/`)}>
                    <img src={key2.img}/>
                    <span>For You</span>
                    <span>Auto Playlist</span>
                </div>
            )
        }
        function L(){
            if(!ms.get('likes') || !Object.values(ms.get('likes/sid')).length) return undefined;
            let key1 = ms.get('sid')[Object.entries(ms.get('likes', 'sid')).filter(a => a[0].sd()).sort((a,b) => b[1] - a[1]).shift().shift()];
            return (
                <div onClick={() => AJAX('/library/')}>
                    <img src={key1.img}/>
                    <span>Library</span>
                    <span>Your History</span>
                </div>
            )
        }
        function YMAL(){
            if(!ms.get('likes')) return undefined;
            let key1 = Object.keys(ms.get('likes', 'sid')).map(a => a.sd()).filter(a => a);
            let key2 = key1.reduce((a,b) => {
                if(b.feat) {
                    let feats = b.feat.replaceAll(" & ", ",").replaceAll(", ", ",").split(",");
                    feats.forEach(c => {
                        if(!a.includes(c)) a.push(c);
                    })
                }
                return a;
            }, []);
            let key3 = [];
            Object.values(ms.get('aid')).forEach(a => {
                if(key2.includes(a.name)) {
                    if(!Object.keys(ms.get('likes', 'aid')).includes(a.aid)) key3.push(a);
                }
            });
            if(key3.length == 0){
                let key4 = Object.keys(ms.get('likes', 'aid')).map(a => ms.get('aid', a).name);
                Object.values(ms.get('sid')).forEach(a => {
                    if(a.feat) a.feat.replaceAll(" & ", ",").replaceAll(", ", ",").split(",").forEach(b => {
                        if(key4.includes(b)); key3.push(a.sid);
                    })
                })
                if(key3.length == 0){
                    return undefined;
                }
            }
            else {
                let key3Temp = [];
                key3.forEach(a => key3Temp.push(...a.sid));
                key3 = key3Temp;
            }
            key3 = key3.map(a => ms.get('sid', a));
            key3.forEach(a => {
                a.plays = a.streams + (2 * a.downloads);
                a.ts = (Math.abs(ts - a.age) / (1000 * 60 * 60 * 24));
            })
            let MA = Math.max(...key3.map((a) => a.ts));
            let MP = Math.max(...key3.map((a) => a.plays));
            let MR = Math.max(...key3.map((a) => a.recent));
            key3.forEach((a,b) => {
                a.ps = (((a.plays/MP) * (a.recent/MR)) / (a.ts/MA));
            })
            key3.sort((a,b) => b.ps - a.ps);
            key3 = key3.slice(0,50);
            key3 = key3[0];
            return (
                <div onClick={() => AJAX(`/playlists/ymal/`)}>
                    <img src={key3.img}/>
                    <span>You May also like</span>
                    <span>Auto Playlist</span>
                </div>
            )
        }
        function N(){
            //generates lists of new songs
            let key1 = Object.values(ms.get('sid')).map(a => {if (!a.alid) return a}).filter(a => {if(a) return a});
            key1.sort((a,b) => b.age - a.age);
            if(!key1.length) return undefined;
            key1 = key1[0];
            return (
                <div onClick={() => AJAX('/new/')}>
                    <img src={key1.img}/>
                    <span>New</span>
                    <span>Recently Added</span>
                </div>
            ) 
        }
        function T(){
            //songs on the website with high plays in recent times
            let key1 = Object.values(ms.get('sid'));
            key1.sort((a,b) => b.recent - a.recent);
            if(!key1.length) return undefined;
            key1 = key1[0];
            return (
                <div onClick={() => AJAX('/trending/')}>
                    <img src={key1.img}/>
                    <span>Trending</span>
                    <span>Most played this week</span>
                </div>
            ) 
        }
        function R(){
            //sorted by plays
            let key1 = Object.values(ms.get('sid'));
            key1.forEach(a => {
                a.plays = a.streams + (2 * a.downloads);
            });
            key1.sort((a,b) => b.plays - a.plays);
            if(!key1.length) return undefined;
            key1 = key1[0];
            return (
                <div onClick={() => AJAX('/playlists/hits/')}>
                    <img src={key1.img}/>
                    <span>Hits</span>
                    <span>Editor's Choice</span>
                </div>
            ) 
        }
        function MG(){
            if(!ms.get('likes')) return undefined;
            const av = Object.values(ms.get('likes', 'gid')).reduce((a,b) => a+b) / Object.values(ms.get('likes', 'sid')).length;
            const k1 = SRT(Object.entries(ms.get('likes', 'gid')).filter(a => a[1] >= av).sort((a,b) => b[1] - a[1]).map(a => a[0].gd('sid')).reduce((a,b) => {a.push(...b); return a}, []).slice(0,100), "s")[0];
            if(!k1) return undefined;
            return (
                <div onClick={() => AJAX('/playlists/my_genres/')}>
                    <img src={k1.img}/>
                    <span>My Genres</span>
                    <span>Similar Songs</span>
                </div>
            ) 
        };
        function C(){
            let key2 = Object.values(ms.get('sid'));
            key2.forEach(a => {
                a.plays = a.streams + (2 * a.downloads);
                a.ts = (Math.abs(ts - a.age) / (1000 * 60 * 60 * 24));
            })
            let MA = Math.max(...key2.map((a) => a.ts));
            let MP = Math.max(...key2.map((a) => a.plays));
            let MR = Math.max(...key2.map((a) => a.recent));
            key2.forEach((a,b) => {
                a.ps = (((a.plays/MP) * (a.recent/MR)) / (a.ts/MA));
            })
            key2.sort((a,b) => b.ps - a.ps);
            if(!key2.length) return undefined;
            key2 = key2[0];
            return (
                <div onClick={() => AJAX('/charts/')}>
                    <img src={key2.img}/>
                    <span>Music Charts</span>
                    <span>Auto Playlist</span>
                </div>
            )
        }
        function UN(){
            if(!ms.get("likes")) return undefined;
            let k1 = Object.keys(ms.get('sid')).filter(a => !Object.keys(ms.get("likes", "sid")).includes(a));
            if(k1.length == 0) return undefined;
            k1 = SRT(k1, "s")[0];
            return (
                <div onClick={() => AJAX('/playlists/untouched/')}>
                    <img src={k1.img}/>
                    <span>Untouched</span>
                    <span>Auto Playlist</span>
                </div>
            )
        }
        return [<C/>,<FY/>, <L/>, <YMAL/>, <N/>, <T/>, <MG/>, <R/>, <UN/>];
    },
    N: function(){
        let key1= Object.values(ms.get('sid')).map(a => {if (!a.alid) return a}).filter(a => {if(a) return a});
        let key2= Object.values(ms.get('alid') || {});
        let ts = new Date().getTime();
        let key = [];
        if(!key1.length && !key2.length) return undefined;
        key1.sort((a,b) => b.age - a.age);
        key2.sort((a,b) => b.age - a.age);
        key.push(...key1.slice(0,10), ...key2.slice(0,10));
        key.sort((a,b) => b.age - a.age);
        return key.map(a => {
            if(typeof a.sid != "object") return <MAI level="s" data={[a]}/>
            else return <MAI level="al" data={[a]} h={true}/>
        })
    },
    G: function(){
        //lists all the genres on the site
       return <MAI data={ms.get('gid')} type="obj" level="g" limit="10"/>
    },
    AL: function(){
        //lists all the albums on the charts
        return <MAI data={ms.get('alid')} type="obj" level="al" limit="10"/>
    },
    AR: function(){return <MAI level="ar" data={Object.values(ms.get('aid')).shuffle()} type="obj" limit="20" />}    
}
function LAS({data, chart = true, limit = 200, level, list, mode}){
    let temp;
    if(typeof data[0] != "object"){
        if(Array.isArray(data)) {
            if(level == "ar") temp = data.map(a => a.ad());
            else if(level == "al") temp = data.map(a => a.ed());
            else temp = data.map(a => a.sd());
        } else temp = Object.values(data);
    } else temp = [...data];
    if(chart){temp = SRT(temp, level)};
    if(level){
        if(level == "ar"){
            return temp.slice(0,limit).map((a,b) => {
                function hc(){
                   AJAX(`/listen/artist?id=${a.aid}`);
                }
                if(wide){
                    let age = new Date();
                    age.setTime(a.age);
                    age = age.toLocaleDateString();
                    return (
                        <div key={b} onClick={hc}>
                            <img src={a.img}/>
                            <i>{b + 1}.</i>
                            <span>{a.name}</span>
                            <span>{a.genre}</span>
                            <span style={{fontFamily: 'ui'}}>{a.streams + (2 * a.downloads)} P • {a.sid.length}S</span>
                            <span data-symbol={mode ? true : undefined} className="icon">{mode ? mode(a) : "workspaces"}</span>
                        </div>
                    )
                } else {
                    return (
                        <div key={b} onClick={hc}>
                                <img src={a.img}/>
                                <i>{b+1}.</i>
                                <div>
                                    <span>{a.name}</span>
                                    <span>{a.streams + (2 * a.downloads)} P • {a.genre}</span>
                                </div>
                        </div>
                    )
                }
            })
        }
        else if(level == "al"){
            return temp.slice(0,limit).map((a,b) => {
                function hc(){
                   AJAX(`/listen/album?id=${a.alid}`);
                }
                if(wide){
                    let age = new Date();
                    age.setTime(a.age);
                    age = age.toLocaleDateString();
                    return (
                        <div key={b} onClick={hc}>
                            <img src={a.img}/>
                            <i>{b + 1}.</i>
                            <span>{a.name}</span>
                            <span>{a.alid.ed('names')}</span>
                            <span>{a.gid.gd('name')}</span>
                            <span data-symbol={mode ? true : undefined} className="icon">{mode ? mode(a) : "workspaces"}</span>
                        </div>
                    )
                } else {
                    return (
                        <div key={b} onClick={hc}>
                                <img src={a.img}/>
                                <i>{b+1}.</i>
                                <div>
                                    <span>{a.name}</span>
                                    <span>{a.alid.ed('names')} • {a.gid.gd('name')}</span>
                                </div>
                        </div>
                    )
                }
            })
        }
    }
    return temp.slice(0,limit).map((a,b) => {
        function hc(){
            PT(a.sid,temp);
        }
        function download(event){
            event.stopPropagation();
            rtdb.update('downloads', a.sid);
            const link = document.createElement("a");
            document.body.appendChild(link);
            link.href = a.url;
            link.setAttribute("download", "");
            link.click();
        }
        if(wide) return (
                <div key={b} onClick={hc}>
                    <img src={a.img}/>
                    {chart || list ? <i>{b + 1}.</i> : undefined}
                    <span>{a.name}{a.feat ? ` (feat. ${a.feat})`: undefined}</span>
                    <span>{a.sid.sd('names')}</span>
                    <span>{a.alid ? a.alid.ed('name') : '--'}</span>
                    <span className="symbol" data-symbol={mode ? true : undefined} onClick={mode ? undefined : download}>{mode ? mode(a) : "download"}</span>
                    <span className="icon" onClick={(e) => {e.stopPropagation(); AJAX('/listen/song/?id='+a.sid)}}>workspaces</span>
                </div>
        )
        else return (
                <div key={b} onClick={hc}>
                    <img src={a.img}/>
                    {chart || list ? <i>{b + 1}.</i> : undefined}
                    <div>
                        <span>{a.name}{a.feat ? ` (feat. ${a.feat})`: undefined}</span>
                        <span>{a.sid.sd('names')}{a.alid ? ` • ${a.alid.ed('name')}` : undefined}</span>
                    </div>
                    <span className="symbol" data-symbol={mode ? true : undefined} onClick={mode ? undefined : download}>{mode ? mode(a) : "download"}</span>
                    <span className="icon" onClick={(e) => {e.stopPropagation(); AJAX('/listen/song/?id='+a.sid)}}>workspaces</span>
                </div>
        )
    })
}
function MAI({level, data, limit = Infinity, h}){
    if(typeof data[0] != "object"){
        if(typeof data[0] == "undefined"){
            data = Object.values(data);
        }
        else {
            if(level == "ar"){
                data = data.map(a => a.ad());
            } else if(level == "s") {
                data = data.map(a => a.sd());
            } else if(level == "g") {
                data = data.map(a => a.gd());
            } else if(level == "al") {
                data = data.map(a => a.ed());
            }
        }
    }
    if(level == "g") data = data.filter(a => a.sid);
    if(level == "ar"){
        return data.slice(0,limit).map((a,b) => 
                <div key={b} onClick={() => AJAX(`/listen/artist?id=${a.aid}`)}>
                    <img src={a.img}/>
                    <span>{a.name}</span>
                    <span>{a.streams + (2 * a.downloads)} P • {a.sid ? a.sid.length : 0}S</span>
                </div>
        )
    }
    else if(level == "g"){
        return data.slice(0,limit).filter(a => a.sid).map((a,b) => {
            let [MA, MP, MR] = Array(3).fill(0);
            if(!a.sid.length) return undefined;
            const img = a.sid.map(a => a.sd()).map(a => {
                a.ts = cts(a.age);
                a.plays = (a.streams+(2*a.downloads));
                MA = Math.max(MA,a.ts);
                MP = Math.max(MP,a.plays);
                MR = Math.max(MR,a.recent);
                return a;
            }).map(a => {
                a.ps = ((a.plays/MP) * (a.recent/MR)) / (a.ts/MA);
                return a;
            }).sort((a,b) => b.ps - a.ps)[0].img;
            return  (
                <div onClick={() => AJAX(`/listen/genres/?id=${a.gid}`)} key={b}>
                    <img src={img}/>
                    <span>{a.name}</span>
                    <span>{a.sid.map(a => a.sd()).map(a => a.streams + (2 * a.downloads)).reduce((a,b) => a+b, 0)} P • {a.sid.length}S</span>
                </div>
            ) 
        })
    } else if(level == "al"){
        return data.slice(0,limit).map((a,b) => 
            <div onClick={() => AJAX(`/listen/album/?id=${a.alid}`)} key={b}>
                <img src={a.img}/>
                <span>{a.name}</span>
                <span>{a.alid.ed('names')} • {a.streams + (2 * a.downloads)} P {h ? "Ω" : undefined}</span>
            </div>
        )
    } else if(level == "s"){
        return data.map(a => a.sid).slice(0,limit).map((a,b) => 
            <div key={b} onClick={() => AJAX('/listen/song?id=' + a)}>
                <img src={a.sd('img')}/>
                <span>{a.sd('name')}{a.sd('feat') ? ` (feat. ${a.sd('feat')})` : undefined}</span>
                <span>{a.sd('names')} • {a.sd('streams') + (a.sd('downloads') * 2)} P</span>
            </div>
        )
    }else if(level == "p"){
        return data.slice(0,limit).map((a,b) => 
            <div key={b} onClick={() => AJAX(`/playlists/user?id=${a.pid}`)}>
                <img src={ms.get('sid')[a.sid[0]].img}/>
                <span>{a.name}</span>
                <span>By {ms.get('uid')[a.uid].name} • {a.sid.length}S</span>
            </div>
        )
    }
}
function SRT(dx, lv, s){
    let dt;
    if(Array.isArray(dx)){
        if(typeof dx[0] != "object"){
            if(lv == "s") dt = dx.map(a => a.sd());
            else if(lv == "ar") dt = dx.map(a => a.ad());
            else if(lv == "al") dt = dx.map(a => a.ed());
        } else dt = Object.values(dx || {});
    } else dt = Object.values(dx || {});
    let nan = [];
    let ts = new Date().getTime();
    let [MA, MP, MR] = Array(3).fill(0);
    dt.forEach((e) => {
        e.ts = Z.cts(e.age);
        e.plays = e.streams + (e.downloads * 2);
        MA = Math.max(MA, e.ts);
        MR = Math.max(MR, e.recent);
        MP = Math.max(MP,e.plays);
    });
    dt.forEach((e,b) => {
        e.ps = (((e.plays/MP) * (Math.check(e.recent)/MR)) / (e.ts/MA));
        if(isNaN(e.ps)) {
            nan.push(dt[b]);
            delete dt[b];
        }
    })
    dt = dt.filter(a => a).sort((a,b) => b.ps - a.ps);
    dt.push(...nan);
    if(s) dt = dt.sort((a,b) => b[s] - a[s]);
    return dt;
}
function CSD({dt, stxt, itxt}){
    /* txt, lv, r, f, fm, d, s */
    const f = useRef(0);
    useEffect(() => {
        let i = 0;
        try{f.current.style.backgroundImage = `url('${img[i]}')`}catch{};
        setInterval(() => {
            i++;;
            if(!img[i]) i = 0;
            try{f.current.style.backgroundImage = `url('${img[i]}')`}catch{};
        }, 3000);
    })
    const m = Array(dt.length).fill(0).map(() => useState(false));
    const o = [];
    let img = [];
    dt.forEach((a,b) => {
        if(!a.r) throw new Error("Rendering mode is not specified");
        if(!a.d) throw new Error("No data was passed");
        if(!a.lv) throw new Error("Data level is not specified");
        const [tm, ts] = m[b];
        if(a.txt){
            o.push(
                <p key={o.length} className="category" onClick={() => {
                    if(a.f) ts(!tm);
                }}>{a.txt} {a.f && a.d.length > a.f ? <span className="symbol">{tm ? "step_out" : "step_into"}</span> : undefined}</p>
            );
        }
        if(typeof a.d == "object" && !Array.isArray(a.d)) {
            a.d = Object.values(a.d)
        }
        else if(typeof a.d[0] != "object"){
            if(a.lv == "ar") a.d = a.d.map(a => a.ad());
            if(a.lv == "s") a.d = a.d.map(a => a.sd());
            if(a.lv == "al") a.d = a.d.map(a => a.ed());
        }
        if(a.f && !tm){
            if(a.fm){
                if(!tm){
                    //fold
                    if(a.fm == "las"){
                        o.push(
                            <div key={o.length} className="list charts">
                                <LAS limit={a.f} data={a.d} chart={a.s == "charts" ? true : false} level={a.lv} list={a.s == "list" ? true : false}/>
                            </div>
                        )
                    } else if(a.fm == "mai"){
                        o.push(
                            <div key={o.length} className="list new artists">
                                <MAI limit={a.f} data={a.d} level={a.lv}/>
                            </div>
                        )
                    }
                }
            } else {
                if(a.r == "las"){
                    o.push(
                        <div key={o.length} className="list charts">
                            <LAS limit={a.f} data={a.d} chart={a.s == "charts" ? true : false} level={a.lv} list={a.s == "list" ? true : false}/>
                        </div>
                    )
                } else if(a.r == "mai"){
                    o.push(
                        <div key={o.length} className="list new artists">
                            <MAI limit={a.f} data={a.d} level={a.lv}/>
                        </div>
                    )
                }
            }
        } else { 
            if(a.r == "las"){
                o.push(
                    <div key={o.length} className="list charts">
                        <LAS data={a.d} chart={a.s == "charts" ? true : false} level={a.lv} list={a.s == "list" ? true : false}/>
                    </div>
                )
            } else if(a.r == "mai"){
                o.push(
                    <div key={o.length} className={`list new artists ${a.n ? "normal" : ""}`}>
                        <MAI data={a.d} level={a.lv}/>
                    </div>
                )
            }
        }
        if(a.f && !tm){
            let i;
            if(a.s == "charts") img.push(...SRT(a.d, a.lv).slice(0,a.fm).map(a => a.img));
            else img.push(...a.d.slice(0,a.f).map(a => a.img));
        } else {
            if(a.s == "charts") img.push(...SRT(a.d, a.lv).map(a => a.img));
            else img.push(...a.d.map(a => a.img));
        }
    })
    img = img.reduce((a,b) => {
        if(!a.includes(b)) a.push(b);
        return a;
    }, []).filter(a => !a.includes("favicon.png"));
    return [
        <div ref={f}><p>{stxt}</p></div>,
        itxt ? <p className="category" style={{textAlign: 'center'}}>
            <span className="symbol">info</span> {itxt} <span className="symbol">info</span>
        </p> : undefined, o
    ];
}
function w(txt){
    const cover = document.querySelector("info") || document.body.appendChild(document.createElement("info"));
    render(
        <div id="cover">
            <div className="cover"></div>,
            <div className="body">
                <p onClick={() => unmount(cover)}><span className="symbol">warning</span>
                    {txt}
                </p>
            </div>
        </div>,
        cover
    )
    return new Promise((resolve,_) => {
        setTimeout(() => {
            unmount(cover);
            resolve(true);
        }, 3000);
    })
}
function cw(txt, ...res){
    const cover = document.querySelector("info") || document.body.appendChild(document.createElement("info"));
    return new Promise((resolve,_) => {
        render(
            <div id="cover">
                <div className="cover"></div>,
                <div className="body">
                    <p><span className="symbol">warning</span>
                        {txt}<br/>
                        {res.map(a => {
                            a.props.onClick = () => resolve(a.props.val || true);
                            a.props.style = {display: "block", marginRight: "auto", marginLeft: "auto"};
                            return a;
                        })}
                    </p>
                </div>
            </div>,
            cover
        )
    }).then(resp => {
        unmount(cover);
        return resp;
    })
}
function PRG(){
    return {
        start(){
            this.info = document.querySelector("info") || document.body.appendChild(document.createElement("info"));
            const Cover = this.Cover;
            render(<Cover/>, this.info);
        },
        progress(val, txt){
            const Cover = this.Cover;
            render(<Cover val={val} txt={txt}/>, this.info);
        },
        close(){
            unmount(this.info);
        },
        Cover({val = 0, txt = ''}){
            return <div id="cover">
                <div className="cover"></div>
                <div className="body">
                    <progress value={val} min="0" max="100"></progress>
                    <span>{txt}</span>
                </div>
            </div>
        }
    }
}
const Genres = [
    <option value="">Select a genre</option>,
    <option value="Afro">Afro</option>,
    <option value="Afro/Rap">Afro/Rap</option>,
    <option value="Afrobeats">Afrobeats</option>,
    <option value="Alternative">Alternative</option>,
    <option value="Country">Country</option>,
    <option value="Drill">Drill</option>,
    <option value="Fuji">Fuji</option>,
    <option value="Gospel">Gospel</option>,
    <option value="Hip-Hop">Hip-Hop</option>,
    <option value="Hip-Hop/Rap">Hip-Hop/Rap</option>,
    <option value="Highlife">Highlife</option>,
    <option value="Indie">Indie</option>,
    <option value="Jazz">Jazz</option>,
    <option value="Makossa">Makossa</option>,
    <option value="Pop">Pop</option>,
    <option value="R&B">R&B</option>,
    <option value="R&B/Soul">R&B/Soul</option>,
    <option value="Rap">Rap</option>,
    <option value="Reggae">Reggae</option>,
    <option value="Rock">Rock</option>,
    <option value="Soul">Soul</option>,
    <option value="Trap">Trap</option>,
]