function IR(){
    let aid; 
    const url = new URL(location);
    if(!url.searchParams.get("id")) return AJAX("/");
    else {
        aid = url.searchParams.get("id");
        if(aid.ad() == undefined) return AJAX("/");
        else {
            document.title = `${aid.ad('name')} | AudHub`;
            if(aid.ad('sid').length > 0){
                const pick = aid.ad('sid').map(a => a.sd()).sort((a,b) => b.age - a.age).map(a => a.sid);
                //...
                //playThis(pick[0], pick);
            }
        }
    }
    function Lv1(){
        const nav = useRef(0);
        useEffect(() => {
            try {
                let index = 0;
                nav.current.style.backgroundImage = `url('${img[index]}')`;
                setInterval(() => {
                    try {
                        index++;
                        if(index == img.length) index = 0;
                        nav.current.style.backgroundImage = `url('${img[index]}')`;   
                    }catch{}
                }, 890)
            } catch{};
        })
        const text = aid.ad('sid').map(a => a.sd('img')).reduce((a,b) => {if(!a.includes(b)) a.push(b); return a}, []);
        const img = text.length > 0 ? text : [aid.ad('img')];
        return [
            <nav ref={nav}>
                <img src={aid.ad('img')}/>
            </nav>,
            <div>
                <table>
                    <tbody>{<TCA/>}</tbody>
                </table>
            </div>,
            <AS/>,
            <CO/>,
            <AL/>,
            <SA/>,
            <GS/>
        ]
    }
    function CO(){
        const [m, sm] = useState(false);
        const list = aid.ad('sid').filter(a => Array.isArray(a.sd('aid')) && a.sd('owner') != aid);
        if(list.length == 0) return undefined;
        return [
            <p className="category" onClick={() => sm(!m)}>Collabs <span className="symbol">{m ? "step_out" : "step_into"}</span></p>,
            <div className="list charts"><LAS limit={m ? Infinity: 5} data={list}/></div>
        ]
    }
    function AL(){
        const [more, smore] = useState(false);
        const list = aid.ad('alid');
        if(list.length == 0) return undefined;
        return [
            <p className="category" onClick={() => smore(!more)}>Albums <span className="symbol">{more ? "step_out" : "step_into"}</span></p>,
            <div className={`list new artists ${more ? 'normal' : ''}`}><MAI level="al" data={list} limit={more ? Infinity : 7}/></div>
        ]
    }
    function GS(){
        const [more, smore] = useState(false);
        if(!aid.ad('genre').indb('gid')) return undefined;
        const list = aid.ad('genre').indb('gid', 'sid').filter(a => !aid.ad('sid').includes(a));
        if(list.length == 0) return undefined;
        return [
            <p className="category" onClick={() => smore(!more)}>{aid.ad('genre')} <span className="symbol">{more ? "step_out" : "step_into"}</span></p>,
            <div className={more ? "list charts" : "list new artists"}>{more ? <LAS data={list} chart={false} limit="20"/> : <MAI data={list} level="s" limit="10"/>}</div>
        ]
    }
    function SA(){
        const [more, smore] = useState(false);
        const list = Object.values(ms.get("aid")).map(a => a.name).sort().map(a => a.indb('aid')).filter(a => a.genre == aid.ad('genre') && a.aid != aid);
        if(list.length == 0) return undefined;
        return [
            <p className="category" onClick={() => smore(!more)}>Similar Artists <span className="symbol">{more ? "step_out" : "step_into"}</span></p>,
            <div className={more ? "list new artists normal" : "list new artists"}>{more ? <MAI data={list} limit="10" level="ar"/> : <MAI data={list} level="ar"/>}</div>
        ]
    }
    function AS(){
        const [more, smore] = useState(false);
        const list = aid.ad('sid').filter(a => {
            if(Array.isArray(a.sd('aid'))){
                return aid == a.sd('owner');
            } else return a;
        });
        if(list.length == 0) return undefined;
        return [
            <p className="category" onClick={() => smore(!more)}>Songs <span className="symbol large">{more ? "step_out" : "step_into"}</span></p>,
            <div className="list charts"><LAS chart={true} limit={more ? Infinity : 5} data={list}/></div>
        ]
    }
    function TCA(){
        let date = new Date();
        date.setTime(aid.ad('age'));
        date = date.toDateString();
        const singles = aid.ad('sid').filter(a => a.sd('alid') == undefined).length;
        const plays = aid.ad('streams') + (2 * aid.ad('downloads'));
        const mobile = [
            [<th>Name</th>, <td>{aid.ad('name')}</td>],
            [<th>Genre</th>,<td>{aid.ad('genre')}</td>],
            [<th>Career Plays</th>, <td>{plays}</td>],
            [<th>Gain</th>,<td>{aid.ad('recent')}</td>],
            [<th>Singles</th>, <td>{singles}</td>],
            [<th>Albums</th>, <td>{aid.ad('alid').length}</td>],
        ];
        const desktop = mobile.reduce((a,b,c) => {
            if(c % 2 == 0){
                a.push([...b]);
            } else {
                a[a.length -1].push(...b);
            }
            return a;
        }, [])
        const result = wide ? desktop : mobile;
        return result.map(a => <tr>{a}</tr>);
    }
    return render(<Lv1/>, document.querySelector("display"));
}