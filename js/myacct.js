function IR(){
    if(!ms.get("id")) return location.href = '/signup/';
    const id = ms.get("id");
    const likes = ms.get("likes")
    function T(){
        const r = Array(5).fill(0).map(() => useState(false));
        const [E, se] = useState(false);
        const img = useRef(0);
        const editref = Array(5).fill(0).map(useRef);
        useEffect(() => {
            if(E) {
                img.current.onclick = () => editref[4].current.click();
                editref[4].current.onchange = (event) => {
                    const reader = new FileReader;
                    reader.onload = () => {
                        img.current.src = reader.result;
                    }
                    reader.readAsDataURL(event.target.files[0]);
                }
                editref[0].current.value = id.username;
                editref[1].current.value = id.contact;
                editref[2].current.value = id.pwd;
                editref[3].current.value = id.pwd;
            } else {
                img.current.src = id.img;
            }
        }, [E])
        const m = [
            [<th>User Name</th>, <td>{id.username}</td>],
            [<th>Contact</th>, <td>{id.contact}</td>],
            [<th>Profile ID</th>, <td>{id.uid}</td>],
            [<th>Account Status</th>, <td>{id.pro ? "Contributor Account" : id.aid ? "Artist Account" : "User Account"}</td>],
            [<td colSpan="2" onClick={() => se(true)}><button>Edit</button></td>, <td colSpan="2" onClick={() => {
                if(id.aid) AJAX('/listen/artist?id=' + id.aid);
                else AJAX('/myaccount/artist/claim');
            }}><button>{id.aid ? ms.query("aid.name", "id.aid") : "Upgrade Account"}</button></td>]
        ]
        const d = m.reduce((a,b,c) => {
            if(c % 2 == 0){
                a.push([...b]);
            } else {
                a[a.length -1].push(...b);
            }
            return a;
        }, []);
        const me = <form>
            <label>User Name</label>
            <input ref={editref[0]} type="username" placeholder="Username"/>
            <label>Contact</label>
            <input ref={editref[1]} type="email" placeholder="Email or Phone No."/>
            <label>Password</label>
            <input ref={editref[2]} type="password" placeholder="Password"/>
            <label>Confirm Password</label>
            <input ref={editref[3]} type="password" placeholder="Confirm Password"/>
            <label>Profile Picture</label>
            <input ref={editref[4]} type="file" accept="image/*"/>
            <button type="button" onClick={svc}>Save Changes</button>
        </form>
        async function svc(){
            const ref = editref.map(a => a.current);
            if(ref[0].value.length < 4) {
                error(ref[0], "Username must be at least four characters long");
                return false;
            } else if(ref[0].value.toLowerCase() != ref[0].value){
                error(ref[0], "Username must be in lowercase");
                return false;
            } else if(ref[0].value.includes(" ")){
                error(ref[0], "Username must not contain sapces");
                return false;
            }
            if(!isNaN(Number(ref[1].value))){
                if(ref[1].value.length < 11) {
                    error(ref[1], "Invalid Number");
                    return false;
                }
            } else {
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if(!regex.test(ref[1].value)){
                    error(ref[1], "Invalid Email");
                    return false;
                }
            }
            if(ref[2].value != ref[3].value){
                error(ref[3], "Passwords are not the same");
                return false;
            }
            if(img.current.naturalHeight != img.current.naturalWidth){
                error(ref[4], "Image must be a perfect square");
                return false;
            }
            function error(elem, txt){
                elem.style.outline = "blue solid 2px";
                elem.focus();
                elem.addEventListener("change", () => fixed());
                elem.addEventListener("keydown", () => fixed());
                const oldText = elem.previousElementSibling.innerText;
                elem.previousElementSibling.innerText = txt;
                function fixed(){
                    elem.previousElementSibling.innerText = oldText;
                    elem.style = "";
                }
            }
            const data = {username: ref[0].value, contact: ref[1].value, pwd: ref[2].value, img: ref[4].files[0]};
            await rtdb.uid(data);
            await rtdb.reload();
            IR();
            render(<NB/>, document.querySelector("navbar"));
        }
        const MA = !E ? <table><tbody>{(wide ? d : m).map(a => <tr>{a}</tr>)}</tbody></table> : me;
        return [
            <nav style={{backgroundImage: `url('/6956144-cool-hd-music-wallpapers.jpg')`}}><img ref={img} src={id.img}/></nav>,
            <div>{MA}</div>,
            !E ? [
                likes ? [
                    (() => {
                        //most listened songs
                        let data = likes;
                        if(!(data && data.sid)) return undefined;
                        data = Object.entries(data.sid).sort((a,b) => b[1] - a[1]);
                        if(!data.length) return undefined;
                        const [e, se] = useState(false);
                        return [
                            <p className="category" onClick={() => data.length > 5 ? se(!e) : undefined}>Most Listened Songs {data.length > 5 ? <span className="symbol">{e ? "step_out" : "step_into"}</span> : undefined}</p>,
                            <div className="list charts"><LAS data={data.map(a => a[0])} level="s" limit={e ? Infinity : 5} chart={false} list={true} mode={(info) => {
                                info = info.sid;
                                return Number(data[data.map(a => a[0]).indexOf(String(info))][1]).val() + "P";
                            }}/></div>
                        ]
                    })(),
                    (() => {
                        //Most streamed albums
                        const [e, se] = useState(false);
                        let data = likes;
                        if(!data.alid) return undefined;
                        data = Object.entries(data.alid).sort((a,b) => b[1] - a[1]);
                        if(!data.length) return undefined;
                        return [
                            <p className="category" onClick={() => data.length > 5 ? se(!e) : undefined}>Most Listened Albums {data.length > 5 ? <span className="symbol">{e ? "step_out" : "step_into"}</span> : undefined}</p>,
                            <div className="list charts"><LAS data={data.map(a => a[0])} level="al" limit={e ? Infinity : 5} chart={false} list={true} mode={(info) => {
                                info = info.alid;
                                return Number(data[data.map(a => a[0]).indexOf(String(info))][1]).val() + "P";
                            }}/></div>
                        ]
                    })()
                ] : undefined,
                id.aid ? [
                    (() => {
                        //songs
                        const [e, se] = useState(false);
                        if(!id.aid) return undefined;
                        if(!id.aid.ad('sid')) return undefined;
                        const data = id.aid.ad('sid').map(a => a.sd()).filter(a => a.owner == id.aid);
                        if(!data.length) return undefined;
                        return [
                            <p className="category" onClick={() => data.length > 5 ? se(!e) : undefined}>Your Songs {data.length > 5 ? <span className="symbol">{e ? "step_out" : "step_into"}</span> : undefined}</p>,
                            <div className="list charts"><LAS data={data} level="s" limit={e ? Infinity : 5}/></div>
                        ]
                    })(),
                    (() => {
                        //collabs
                        const [e, se] = useState(false);
                        if(!id.aid) return undefined;
                        if(!id.aid.ad('sid')) return undefined;
                        const data = id.aid.ad('sid').map(a => a.sd()).filter(a => a.owner != id.aid);
                        if(!data.length) return undefined;
                        return [
                            <p className="category" onClick={() => data.length > 5 ? se(!e) : undefined}>Collaborations {data.length > 5 ? <span className="symbol">{e ? "step_out" : "step_into"}</span> : undefined}</p>,
                            <div className="list charts"><LAS data={data} level="s" limit={e ? Infinity : 5}/></div>
                        ]
                    })(),
                    (() => {
                        //albums
                        const [e, se] = useState(false);
                        if(!id.aid) return undefined;
                        if(!id.aid.ad('alid')) return undefined;
                        const data = id.aid.ad('alid').map(a => a.ed()).filter(a => a.owner == id.aid);
                        if(!data.length) return undefined;
                        data.sort((a,b) => b.age - a.age);
                        return [
                            <p className="category" onClick={() => data.length > 5 ? se(!e) : undefined}>Your Albums {data.length > 5 ? <span className="symbol">{e ? "step_out" : "step_into"}</span> : undefined}</p>,
                            <div className="list new artists"><MAI data={data} level="al" limit={e ? Infinity : 5}/></div>
                        ]
                    })(),
                    (() => {
                        //uploaded for you
                        const [e, se] = useState(false);
                        if(!id.aid) return undefined;
                        if(!id.aid.ad('alid')) return undefined;
                        const data = id.aid.ad('alid').map(a => a.ed()).filter(a => a.owner != id.aid);
                        if(!data.length) return undefined;
                        data.sort((a,b) => b.age - a.age);
                        return [
                            <p className="category" onClick={() => data.length > 5 ? se(!e) : undefined}>Your Albums (Co-Owned) {data.length > 5 ? <span className="symbol">{e ? "step_out" : "step_into"}</span> : undefined}</p>,
                            <div className="list charts"><MAI data={data} level="al" limit={e ? Infinity : 5}/></div>
                        ]
                    })()
                ] : undefined
            ] : undefined,
            id.aid && !E ? <button onClick={() => AJAX('/myaccount/stats/')}>Profile Stats</button> : undefined
        ]
    }
    return render(<T/>, display);
}