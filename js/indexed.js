const handler = {
   async get(target,prop){
        return (await new Promise((res,rej) => {
            const functions = {};
            const request = indexedDB.open("AudHub", 1);
            request.onupgradeneeded = event => {
                const db = event.target.result
                if(!db.objectStoreNames.contains("user")){
                    db.createObjectStore("user")
                }
            }
            request.onsuccess = event => {
                const db = event.target.result
                const transaction = db.transaction("user", "readwrite");
                const objectStore = transaction.objectStore("user");
                functions.set = function(key, val){
                    return objectStore.put(JSON.stringify(val), key);
                }
                functions.get = function(key){
                    return new Promise((resolve, _) => {
                        const getRequest = objectStore.get(key);
                        getRequest.onsuccess = event => resolve(event.target.result);
                    })
                }
                functions.del = function(key){
                    return objectStore.delete(key);
                }
                functions.clear = function(){
                    return objectStore.clear();
                }
                res(functions);
            }
            request.onerror = event => rej(event);
            }))[prop]
    }
}
const proxy = new Proxy({}, handler)
export const idb = {
    async get(key){
        const ans = await(await proxy.get)(key)
        return ans ? JSON.parse(ans) : undefined;
    },
    async set(key, val){
        (await proxy.set)(key, val);
        return true;
    },
    async clear(){
        (await proxy.clear)();
        return true;
    },
    async del(key){
        (await proxy.del)(key);
        return true;
    }
}