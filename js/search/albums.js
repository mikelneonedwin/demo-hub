function IR(){ let q; try{ q = new URL(location.href).searchParams.get("search").toLowerCase(); if(!q) return AJAX('/'); }catch{return AJAX('/')}; function T(){ const result = match(q, ov_al.map(a => { let ans = {id: a.alid}; ans.name1 = a.alid.ed('names'); ans.name2 = a.name; return ans; }), 'id', ['name1', 'name2']); if(!result.length) return <p className="error">NO RESULTS FOUND</p>; return [ <p className="category">Search Results</p>, <div className="list new normal artists"><MAI level="al" data={result}/></div> ] } render(<T/>, display); }