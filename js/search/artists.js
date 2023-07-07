function IR(){
    let q;
    if(new URL(location.href).searchParams.get("search")){
        q = new URL(location.href).searchParams.get("search").toLowerCase();
    }
    if(!q) return undefined;
    //artists, albums, genres, playlists, songs
    document.querySelector("[type=search]").placeholder = q;
    let ts = new Date().getTime();
    function R(){
        let results = match(q, ms.get('aid'), 'aid', ["name"]);
        if(results.length == 0) return (<p className="error">NO RESULTS FOUND</p>);
        return [
            <p className="category">Search Results</p>,
            <div className="list new artists normal"><MAI data={results} level="ar"/></div>
        ]
    }
    return render(<R/>, display);    
}