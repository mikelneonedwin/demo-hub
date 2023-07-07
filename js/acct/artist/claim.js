function IR(){
    function T(){
        return Object.values(ms.get("aid")).map((a,b) => {
            async function fill(){
                const cover = document.querySelector("info") || document.body.appendChild(document.createElement("info"));
                const reply = await new Promise((resolve,_) => {
                    const context = encodeURIComponent(`Requesting passcode for ${a.aid} \n\nName: ${a.name}`);
                    function val(e){
                        resolve(e.target.previousElementSibling.value);
                    }
                    render(
                        <div id="cover">
                            <div className="cover"></div>,
                            <div className="body">
                                <p><span className="symbol">warning</span>
                                    Enter passcode for AID: {a.aid}
                                    <a href={`https://wa.me/2348076488738?text=${context}`}><small>Request for one</small></a>
                                    <input type="search"/>
                                    <button style={{display: "block", marginLeft: "auto", marginRight: "auto"}} onClick={val}>Submit</button>
                                </p>
                            </div>
                        </div>,
                        cover
                    )
                })
                unmount(cover);
                const ans = rtdb.check(a.aid, reply);
                if(ans) {
                    await rtdb.pair(ms.get("id/uid"), a.aid)
                    AJAX('/')
                } else await w('Wrong passcode!');
            }
            return (
                <div key={b} onClick={fill}>
                    <img src={a.img}/>
                    <span>{a.name}</span>
                    <span>{a.streams + (2 * a.downloads)} P • {a.genre}</span>
                </div>
            )
        })
    }
    if(ms.get('id')) {
        //if(ms.get('id').aid) warn('aid');
        /*else if (Object.keys(ms.get("aid")).length != 0)*/ render(<T/>, document.querySelector("div.artists"));
        //else warn('aid_0');
    } else warn('no_uid');
}