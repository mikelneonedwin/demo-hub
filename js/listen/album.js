function IR(){
    let alid; 
    const url = new URL(location);
    const id = ms.get("id") || {};
    if(!url.searchParams.get("id")) return AJAX("/");
    else {
        alid = url.searchParams.get("id");
        if(alid.ed() == undefined) return AJAX("/");
        else {
            document.title = `${alid.ed('name')} | AudHub`;
        }
    }
    function SA(){
        const [more, smore] = useState(false);
        let list = Object.values(ms.get('alid')).filter(a => a.alid != alid).filter(a => {
            let states = []
            if(Array.isArray(a.aid)) if(Array.isArray(alid.ed('aid'))) states.push(a.aid.some(a => alid.ed('aid').includes(a))); else states.push(a.aid.includes(alid.ed('aid')));
            else if(Array.isArray(alid.ed('aid'))) states.push(alid.ed('aid').includes(a.aid)); else states.push(alid.ed('aid') == a.aid);
            states.push(a.gid == alid.ed('gid'));
            return states.some(a => a == true);
        });
        if(list.length == 0) return undefined;
        return [
            <p className="category" onClick={() => smore(!more)}>Suggestions <span className="symbol">{more ? "step_out" : "step_into"}</span></p>,
            <div className={`list new artists ${more ? "normal" : ''}`}><MAI level="al" data={list} limit={more ? Infinity : 7}/></div>
        ]
    }
    function T(){
        const img = useRef(0);
        let date = new Date();
        date.setTime(alid.ed('age'));
        date = date.toDateString();
        const mobile = [
            [<th>Name</th>, <td>{alid.ed('name')}</td>],
            [<th>Artist</th>, <td>{alid.ed('names')}</td>],
            [<th>Plays</th>, <td>{alid.ed('streams') + (2 * alid.ed('downloads'))}</td>],
            [<th>Gain</th>, <td>{alid.ed('recent')}</td>],
            [<th>Genre</th>, <td>{alid.edg('name')}</td>],
            [<th>Uploaded</th>, <td>{date} By {alid.edu('name')}</td>],
            [<td colspan="2" onClick={() => {
                if(id.aid == alid.ed('owner')) return upd();
                else return AJAX('/listen/artist?id='+alid.ed('owner'));
            }}><button>{id.aid == alid.ed('owner') ? "Delete" : alid.ed('owner').ad('name')}</button></td>,<td colspan="2" onClick={() => PT(alid.ed('sid'))}><button>Listen</button></td>]
        ]
        const desktop = mobile.reduce((a,b,c) => {
            if(c % 2 == 0){
                a.push([...b]);
            } else {
                a[a.length -1].push(...b);
            }
            return a;
        }, [])
        const result = (wide ? desktop : mobile).map(a => <tr>{a}</tr>);
        async function upd(){
            const x = await cw(<section>Are you sure you want to delete <b>{alid.ed('name')}</b></section>, <button val={true}>Yes</button>, <button val={false}>No</button>)
            if(x) await rtdb.del('al', alid);
        }
        return [
            <nav style={{backgroundImage: `url('${alid.ed('img')}')`}}><img ref={img} src={alid.ed('img')}/></nav>,
            <div>
                    <table>
                        <tbody>{result}</tbody>
                    </table>
            </div>,
            <div className="list charts"><LAS data={alid.ed('sid')} chart={false} list={true}/></div>,
            <SA/>
        ]
    }
    return render(<T/>, display);
}