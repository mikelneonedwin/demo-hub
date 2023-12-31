function IR(){
    function T(){
        const m = [
            [<th>Phone</th>,<td><a href="tel:2348076488738" className="underline">+234 807 6488 738</a></td>],
            [<th>Email</th>,<td><a href="mailto:mynameiswinneredwin@gmail.com" className="underline">mynameiswinneredwin@gmail.com</a></td>],
            [<th>Facebook</th>, <td><a target="_blank" className="underline" href="https://fb.me/mikelneonedwin" style={{color: "#0077ff"}}>@mikelneonedwin</a></td>],
            [<th>WhatsApp</th>, <td><a target="_blank" className="underline" href="https://wa.me/2348076488738" style={{color: "lime"}}>2348076488738</a></td>],
            [<th>All Time Streams</th>, <td>{ov_s.reduce((a,b) => a+(b.streams+2*b.downloads),0).val()}</td>],
            [<th>Streams from last 7days</th>, <td>{ov_s.reduce((a,b) => a+b.recent,0).val()}</td>],
            [<th>Artists</th>,<td>{ov_ar.length.val()}</td>],
            [<th>Songs</th>, <td>{ov_s.length.val()}</td>],
            [<th>Albums</th>, <td>{ov_al.length.val()}</td>],
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
            <div style={{fontSize: 'circula'}}>AudHub is a music streaming platform that gives new and undiscovered artists a platform to share their music to the world. The platform's Music Chart features up-and-coming artists, as well as the latest popular releases, and makes it easy for users to discover new music. The platform also offers a range of auto-generated playlists and allows artists to manually upload music. In addition, AudHub offers a variety of account features to help users personalize their experience. </div>,
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