function IR(){
    const [aid, sid, alid, gid] = [ms.get('aid'), ms.get('sid'), ms.get('alid'), ms.get('gid')];
    function T(){
        return [
            aid ? [
                <p className="category"><a href="/artists/">Artists <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div className="list new artists"><AH.AR/></div>,
            ] : undefined,
            alid ? [
                <p className="category"><a href="/albums/">Albums <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div className="list new albums"><AH.AL/></div>
            ] : undefined,
            aid || sid || alid ? [
                <p className="category"><a href="/new/">New <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div className="list new"><AH.N/></div>,
            ] : undefined,
            gid ? [
                <p className="category"><a href="/genres/">Genres <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div className="list new genres"><AH.G/></div>,
            ] : undefined,
            aid || sid || alid ? [
                <p className="category"><a href="/playlists/">Playlists <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div className="list new playlist"><AH.P/></div>,
            ] : undefined,
            sid ? [
            <p className="category"><a href="/charts/songs">Top Songs <span className="symbol">arrow_forward_Ios</span></a></p>,
            <div className="list charts">
                <LAS data={ms.get("sid")} level="s" limit={5}/>
                <div data-old-grad onClick={() => AJAX('/charts/songs')}><p className="symbol nav">navigation</p></div>
            </div>
            ] : undefined
        ]
    }
    return render(<T/>, display);
}