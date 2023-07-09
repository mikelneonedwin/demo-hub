function IR(){
    function TT(){
        const f = useRef(0);
        const TS = SRT(ms.get("sid"), "s");
        const T3M = TS.slice(0,5).map((a,b) => <tr><td>{b + 1}. {a.sid.sd('names')} - {a.name} {a.feat ? ` (feat. ${a.feat})`: undefined}</td></tr>)
        const T2M = TS.slice(0,3).map((a,b) => <tr><td>{b + 1}. {a.sid.sd('names')} - {a.name} {a.feat ? ` (feat. ${a.feat})`: undefined}</td></tr>)
        const TAL = SRT(ms.get("alid"), "al");
        const T3AL = TAL.slice(0,5).map((a,b) => <tr><td>{b + 1}. {a.alid.sd('names')} • {a.name} • {a.gid.gd('name')}</td></tr>)
        const T2AL = TAL.slice(0,3).map((a,b) => <tr><td>{b + 1}. {a.alid.sd('names')} • {a.name} • {a.gid.gd('name')}</td></tr>)
        const desktop = (
            <table>
                <tbody>
                    <tr>
                        <td onClick={() => AJAX('/charts/songs')}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td rowspan="6"><img src={TS[0].img}/></td>
                                        <th>Top Songs</th>
                                    </tr>
                                    {T3M}
                                </tbody>
                            </table>
                        </td>
                        <td onClick={() => AJAX('/charts/albums')}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td rowspan="6"><img src={TAL.length > 0 ? TAL[0].img : undefined}/></td>
                                        <th>Top Albums</th>
                                    </tr>
                                    {T3AL}
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
        const mobile = [
            <table>
                <tbody>
                    <tr onClick={() => AJAX('/charts/songs')}>
                        <td rowspan="4"><img src={TS[0].img}/></td>
                        <th>Top Songs</th>
                    </tr>
                    {T2M}
                </tbody>
            </table>,
            <br/>,
            <table>
                <tbody>
                    <tr onClick={() => AJAX('/charts/albums')}>
                        <td rowspan="4"><img src={TAL.length > 0 ? TAL[0].img : undefined}/></td>
                        <th>Top Albums</th>
                    </tr>
                    {T2AL} 
                </tbody>
            </table>
        ]
        return (
            <section>
                {wide ? desktop : mobile}
                <p className="category">Top Artists</p>
                <div ref={f} className="list charts">
                    <LAS data={ms.get('aid')} level="ar" limit="5"/>
                    <div data-old-grad onClick={() => AJAX('/charts/artists')}><p className="symbol nav">navigation</p></div>
                </div>
            </section>
        )
    }
    return render(<TT/>, display);
}