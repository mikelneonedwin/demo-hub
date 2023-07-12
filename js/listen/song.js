function IR(){
    let sid;    
    let array;
    const url = new URL(location);
    if(!url.searchParams.get("id")) {
        return AJAX('/')
    } else {
        sid = url.searchParams.get("id");
        if(sid.sd() == undefined) {
            return AJAX('/');
        } else {
            document.title = `${sid.sd('name')} ${sid.sd('feat') ? ` (feat. ${sid.sd('feat')})` : ''} | AudHub`;
        }
    }
    if(Array.isArray(sid.sd('aid'))){
        array = sid.sda('sid').reduce((a,b) => {
            a.push(...b);
            return a;
        }, []).reduce((a,b) => {
            if(!a.includes(b)){
                a.push(b);
            } return a;
        }, []);
    } else {
        array = sid.sda('sid');
    }
    function MFA(){
        function PR({a}){
            return [
                <p className="category" style={{textAlign: "center", fontSize: "x-large", fontWeight: "bold"}} onClick={() => AJAX(`/listen/artist/?id=${a.id}`)}>{a.id.ad('name')}</p>,
                <div className="list charts"><LAS limit="5" data={a.sid} level="s"/></div>
            ]
        }
        const results = [];
        for(const log of sid.sd('aid').toArray()){
            const data = {id: log, sid: log.ad('sid').filter(a => a != sid)};
            if(data.sid.length) results.push(<PR a={data}/>);
        }
        return results;
    }
    function M1(){
        const [E, se] = useState(false);
        const img = useRef(0);
        const edit = Array(6).fill(0).map(useRef);
        const id = my_id || {};
        const mobile = [
            [<th>Name</th>,<td>{sid.sd('name')}</td>],
            [<th>Artist</th>,<td>{sid.sd('names')}</td>],
            [<th>Album</th>,<td>{sid.sd('alid') ? sid.sde('name') : sid.sd('name').toUpperCase() + ' - Single'}</td>],
            [<th>Featuring</th>,<td>{sid.sd('feat') ? sid.sd('feat') : '--'}</td>],
            [<th>Release Date</th>,<td>{(function(){let date = new Date(); date.setTime(sid.sd('age')); date = date.toDateString(); return date;})()}</td>],
            [<th>Uploaded By</th>,<td>{sid.sdu('name')}</td>],
            [<th>Length</th>,<td>{sid.sd('length') ? Math.floor(sid.sd('length') / 60) + ':' + (Math.floor(sid.sd('length') % 60) > 9 ? Math.floor(sid.sd('length') % 60) :  '0' + String(Math.floor(sid.sd('length') % 60))) : 'Unknown'}</td>],
            [<th>Genre</th>,<td>{sid.sdg('name')}</td>],
            [<th>Plays</th>,<td>{sid.sd('streams') + (sid.sd('downloads') * 2)}</td>],
            [<th>Weekly Gain</th>,<td>{sid.sd('recent')}</td>],
            [<td colSpan="2"><button onClick={() => {
                if(id.aid == sid.sd('owner')) return upd();
                else return AJAX(`/listen/artist?id=${sid.sd('owner')}`)
                }}>{id.aid == sid.sd('owner') ? "Delete" : sid.sd('owner').ad('name')}</button></td>,<td colSpan="2"><button onClick={download}>Save</button></td>],
            [<td colSpan="2"><button onClick={() => PT(sid,array)}>Listen</button></td>,<td colSpan="2"><button onClick={() => sid.sd('alid') ? AJAX(`/listen/album?id=${sid.sd('alid')}`) : undefined}>{sid.sd('alid') ? "Album" : "Share"}</button></td>]
        ]
        const desktop = mobile.reduce((a,b,c) => {
            if(c % 2 == 0){
                a.push([...b]);
            } else {
                a[a.length -1].push(...b);
            }
            return a;
        }, []);
        function download(){
            rtdb.update('downloads', sid);
            const link = document.createElement("a");
            link.href = sid.sd('url');
            link.setAttribute("download", "");
            link.click();
        }
        async function upd(){
            const x = await cw(<section>Are you sure you want to delete <b>{sid.ad('name')}</b></section>, <button val={true}>Yes</button>, <button val={false}>No</button>)
            if(x) await rtdb.del('s', sid);
        }
        return [
            <nav style={{backgroundImage: `url('${Array.isArray(sid.sd('aid')) ? sid.sdu('img') : sid.sda('img')}')`}}>
                    <img src={sid.sd('img')} ref={img} height="100%" />
            </nav>,
            <div>
                    <table>
                        <tbody>
                            {wide ? desktop.map(a => <tr>{a}</tr>) : mobile.map(a => <tr>{a}</tr>)}
                        </tbody>
                    </table>
            </div>,
            <MFA/>,
            <YMAL/>
        ]
    }
    function YMAL(){
        const [more, smore] = useState(false);
        let sidA = [];
        if(sid.sd('feat')){
            let array = filter(sid.sd('feat')).split(', ');
            array.forEach(a => {
                if(a.indb('aid')) sidA.push(...a.indb('aid', 'sid'));
            });
        }
        sidA.push(...sid.sdg('sid'));
        sidA.push(...ov_s.map(a => {return {feat: a.feat, sid: a.sid}}).filter(a => a.feat).map(a => {a.feat = filter(a.feat).split(', '); return a}).filter(a => a.feat.some(a => sid.sd('names').includes(a))).map(a => a.sid));
        sidA = sidA.filter(a => {
            let not = [];
            if(Array.isArray(sid.sd('aid'))){
                not.push(...sid.sda('sid').reduce((a,b) => {a.push(...b); return a}, []));
            } else {
                not.push(...sid.sda('sid'));
            }
            return !not.includes(a);
        })
        sidA = sidA.reduce((a,b) => {if(!a.includes(b)) a.push(b); return a}, []).filter(a => a != sid);
        if(sidA.length == 0) return undefined;
        array.push(...sidA);
        return [
            <p className="category" onClick={() => smore(!more)}>You May Also Like <span className="symbol">{more ? "step_out" : "step_into"}</span></p>,
            <div className={more ? "list charts" : "list new artists"}>{more ? <LAS data={sidA} limit="10" chart={false}/> : <MAI limit="10" data={sidA} level="s"/>}</div>
        ]
    }
    render(<M1/>, document.querySelector("display"));
}