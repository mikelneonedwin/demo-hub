function IR(){
    function T(){
        const [c, cc] = useState('sid');
        const [s, ss] = useState('ps');
        useEffect(() => ss('ps'), [c]);
        const dt = SRT(ms.get(c), c == "sid" ? "s" : c == "aid" ? "ar" : "al", s);
        return [
            <section><p className={c == "aid" ? "color" : undefined} onClick={() => cc("aid")}>Artists</p><p  onClick={() => cc("sid")} className={c == "sid" ? "color" : undefined}>Songs</p><p className={c == "alid" ? "color" : undefined}  onClick={() => cc("alid")}>Albums</p></section>,
            <table>
                <tbody>
                    <tr>
                    <th>S/N</th>
                    <th>{c == "sid" ? "Song" : c == "aid" ? "Artist" : "Album"}</th>
                    <th onClick={() => ss("ps")}>Score</th>
                    <th onClick={() => ss("plays")}>Plays</th>
                    <th onClick={() => ss("recent")}>Gain</th>
                    <th onClick={() => ss("age")}>Age</th>
                    </tr>
                    {
                        dt.map((a,b) => 
                            <tr>
                                <td>{b+1}.</td>
                                <td>{c == "sid" ? `${wide ? `${a.sid.sd('names')} - `: ''}${a.name} ${a.feat && wide? ` (feat. ${a.feat})`: ''}` : c == "alid" ? `${a.alid.ed('names')} • ${a.name}` : a.name}</td>
                                <td>{Math.floor(a.ps * 1000)}</td>
                                <td>{a.plays}</td>
                                <td>{a.recent}</td>
                                <td>{Math.floor(a.ts)}d</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        ]
    }
    return render(<T/>, display)
}