function IR(){
    function T(){
        const m = [
            [<th>Phone</th>,<td><a href="tel:2348076488738" className="underline">+234 807 6488 738</a></td>],
            [<th>Email</th>,<td><a href="mailto:mynameiswinneredwin@gmail.com" className="underline">mynameiswinneredwin@gmail.com</a></td>],
            [<th>Facebook</th>,<td><a style={{color: "blue"}} target="_blank" href="https://fb.me/mikelneonedwin">@mikelneonedwin</a></td>],
            [<th>WhatsApp</th>,<td><a style={{color: "lime"}} target="_blank" href="https://wa.me/2348076488738">2348076488738</a></td>],
            [<th>All Time Streams</th>, <td>{Object.values(ms.get('sid')).reduce((a,b) => a+(b.streams+2*b.downloads),0).val()}</td>],
            [<th>Streams from last 7days</th>, <td>{Object.values(ms.get('sid')).reduce((a,b) => a+b.recent,0).val()}</td>],
            [<th>Artists</th>,<td>{Object.values(ms.get('aid')).length.val()}</td>],
            [<th>Songs</th>, <td>{Object.values(ms.get('sid')).length.val()}</td>],
            [<th>Albums</th>, <td>{Object.values(ms.get('alid')).length.val()}</td>],
            [<th>Logged Users</th>, <td>{ms.get('users').val()}</td>]
        ];
        const d = m.reduce((a,b,c) => {
            if(c % 2 == 0){
                a.push([...b]);
            } else {
                a[a.length -1].push(...b);
            }
            return a;
        }, []);
        const tt = (wide ? d : m).map(a => <tr>{a}</tr>);
        return [
            <nav style={{backgroundImage: `url('/6956144-cool-hd-music-wallpapers.jpg')`}}>
                <img src="/favicon.png"/>
            </nav>,
            <p className="category">About Us:</p>,
            <div style={{fontSize: 'circula'}}>AudHub is an upstart music streaming platform dedicated specially to upcoming artists everywhere. We've been able to develop algorithms to organize a Music, Artist and Album Music Charts, create auto playlists based on user history, offer recommendations and lots more</div>,
            <p className="category">Details:</p>,
            <div>
                <table>
                    <tbody>{tt}</tbody>
                </table>
            </div>
        ]
    }
    return render(<T/>, display)
}
