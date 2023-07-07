function IR(){
    function R(){
        let q = new URL(location.href).searchParams.get("search").toLowerCase();
        let results = match(q, ms.get("gid"), 'gid', ["name"]);
        if(results.length == 0) return (<p className="error">NO RESULTS FOUND</p>);
        return [
            <p className="category">Search Results</p>,
            <div className="list new artists normal"><MAI data={results} level="g"/></div>
        ]
    }
    return render(<R/>, display);    
}