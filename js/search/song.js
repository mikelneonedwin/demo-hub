function IR(){
    function R(){
        let q = new URL(location.href).searchParams.get("search").toLowerCase();
        const refined = Object.values(ms.get("sid")).map(a => {
            let ans = {id: a.sid};
            ans.name1 = a.name;
            ans.name2 = names(a.aid);
            if(a.alid){
                ans.name4 = a.alid.ed('name');
            }
            if(a.feat){
                ans.name5 = a.feat;
            }
            ["name2", "name3", "name4", "name5"].forEach(a => {
                if(ans[a] == undefined) ans[a] = '';
            })
            return ans;
        })
        let results = match(q, refined, 'id', ["name1", "name2", "name3", "name4", "name5"]);
        if(results.length == 0) return (<p className="error">NO RESULTS FOUND</p>);
        return [
            <p className="category">Search Results</p>,
            <div className="list charts"><LAS data={results} chart={false}/></div>
        ]
    }
    render(<R/>, display);    
}