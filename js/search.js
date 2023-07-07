function IR(){
    function S(){
        document.querySelector("[type=search]").placeholder = q;
        function AR(){
            let results = match(q, ms.get('aid'), 'aid', ["name"]);
            if(results.length == 0) return undefined;
            return [
                <p className="category"><a href={`artists/?search=${q}`}>Artists <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div className="list new artists"><MAI data={results} level="ar" limit="10"/></div>
            ]
        }
        function AL(){
            if(Object.values(ms.get("alid")).length > 0){
                let results = match(q, Object.values(ms.get("alid")).map(a => {
                    let ans = {id: a.alid};
                    ans.name1 = names(a.aid);
                    ans.name2 = a.name;
                    return ans;
                }), 'id', ['name1', 'name2']);
                if(results.length == 0) return undefined; 
                return [
                    <p className="category"><a href={`/albums?search=${q}`}>Albums <span className="symbol">arrow_forward_Ios</span></a></p>,
                    <div class="list new albums"><MAI data={results} limit={11} level="al"/></div>
                ]
            } else return undefined;
        }
        function G(){
            let results = match(q, ms.get("gid"), 'gid', ["name"]).filter(a => a.gd('sid').length);
            if(results.length == 0) return undefined; 
            return [
                <p className="category"><a href={`genres/?search=${q}`}>Genres <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div class="list new artists"><MAI level="g" data={results} limit="10"/></div>
            ]
        }
        function SS(){
            let results = match(q, Object.values(ms.get("sid")).map(a => {
                let ans = {id: a.sid};
                ans.name1 = a.name;
                if(Array.isArray(a.aid)){
                    ans.name2 = a.aid.map(a => a.ad('name')).join(", ");
                } else {
                    ans.name2 = a.aid.ad('name');
                }
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
            }), 'id', ["name1", "name2", "name3", "name4", "name5"]);
            if(results.length == 0) return undefined; 
            return [
                <p className="category"><a href={`songs/?search=${q}`}>Songs <span className="symbol">arrow_forward_Ios</span></a></p>,
                <div class="list charts"><LAS chart={false} data={results} limit="10"/></div>
            ]
        }
        return [<AR/>, <AL/>, <G/>, <SS/>]; 
    }
    let q;
    if(new URL(location.href).searchParams.get("search")){
        q = new URL(location.href).searchParams.get("search").toLowerCase();
        if(q) {
            render(<S/>, display);    
            if(display.children.length == 0){
                render(<p className="error">NO RESULTS FOUND</p>, display);
            }
        }
    } else render(<IS/>, display);
    function IS(){
        return [
            <nav style={{backgroundImage: `url('${SRT(ms.get('sid'), "s")[0].img}')`}}><img src="/favicon.png"/></nav>,
            <p className="category" style={{textAlign: 'center'}}><span className="symbol">info</span> Search Artists, Songs, Albums, Genres on AudHub <span className="symbol">info</span><br/><br/><span style={{fontSize: 'medium'}}>Tap the search bar to get started</span></p>
        ]
    }
}  