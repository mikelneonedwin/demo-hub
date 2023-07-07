import {idb} from "./indexed.js";
const maindb = {};
const o = location.protocol.includes("https"); const Q = globalThis;
const config = {apiKey: "AIzaSyCkdtvsuS79NzK8QIRNJoleTBK8YgU8AUM",authDomain: "audhub-db.firebaseapp.com",databaseURL: "https://audhub-db-default-rtdb.firebaseio.com",projectId: "audhub-db",storageBucket: "audhub-db.appspot.com",messagingSenderId: "1001437617026",appId: "1:1001437617026:web:0d9c11299aeac9a70dcd9b",measurementId: "G-7JM1160W8E"};

//let [app, analytics] = [null, null];
const app = o ? (await import("https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js")).initializeApp(config) : null;
const analytics = o ? (await import("https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js")).getAnalytics(app) : null;
const {getDatabase, ref, remove, increment, get, set, update} = await import(o ? "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js" : "/firebase/database.js");
const db = getDatabase(app);
const storage = await import(o ? "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js" : "/firebase/storage.js");
const {getStorage, uploadBytes, uploadBytesResumable, deleteObject, getDownloadURL} = storage;
window.get = get; window.del = deleteObject;
const sref = storage.ref;
const sdb = getStorage(app);
String.prototype.event = function(callback){let ax = this; setInterval(() => {if(ax != this) {callback(), ax = this}}, 1)};
Q.divide = (1000 * 60 * 60 * 24);
Q.ts = new Date().getTime();
Q.cts = function(age){
    return (Math.abs(Q.ts - age) / Q.divide);
}
Number.prototype.val = function(){
    const n = this;
    if(n < 1000) return n;
    else if(n < 10000) {
        let r = Math.floor(n / 1000);
        let x = Math.floor((n - r * 1000) / 100);
        return `${r}${x == 0 ? '' : `.${x}`}K`
    }
    else if(n < 1000000) {
        return Math.floor(n / 1000) + "K";
    } else if(n < 10000000) {
        let r = Math.floor(n / 1000000);
        let x = Math.floor((n - r * 1000000) / 100000);
        return `${r}${x == 0 ? '' : `.${x}`}M`;
    } else if(n < 1000000000) {
        return Math.floor(n / 1000000) + "M";
    }
}
String.prototype.ud = function(txt){
    if(txt && this.ud()){
        return ms.get("uid", this)[txt];
    }
    return ms.get("uid", this);
};
Number.prototype.ud = function(txt){
    if(txt && this.ud()){
        return ms.get("uid", this)[txt];
    }
    return ms.get("uid", this);
};
String.prototype.sd = function(txt){
    if(txt && this.sd()){
        return ms.get("sid", this)[txt];
    }
    return ms.get("sid", this);
};
Number.prototype.sd = function(txt){
    if(txt && this.sd()){
        return ms.get("sid", this)[txt];
    }
    return ms.get("sid", this);
};
String.prototype.ad = function(txt){
    if(txt && this.ad()){
        return ms.get("aid", this)[txt];
    }
    return ms.get("aid", this);  
}
Number.prototype.ad = function(txt){
    if(txt && this.ad()){
        return ms.get("aid", this)[txt];
    }
    return ms.get("aid", this);  
}
String.prototype.gd = function(txt){
    if(txt && this.gd){
        return ms.get("gid", this)[txt];
    }
    return ms.get("gid", this);       
}
Number.prototype.gd = function(txt){
    if(txt && this.gd){
        return ms.get("gid", this)[txt];
    }
    return ms.get("gid", this);
}
String.prototype.ed = function(txt){
    if(txt && this.ed()){
        return ms.get("alid", this)[txt];
    }
    return ms.get("alid", this);  
}
Number.prototype.ed = function(txt){
    if(txt && this.ed()){
        return ms.get("alid", this)[txt];
    }
    return ms.get("alid", this);
}
String.prototype.sda = function(txt){
    const temp = this.sd('aid');
    if(Array.isArray(temp)){
        let result = [];
        temp.forEach(a => result.push(a.ad(txt)));
        return result;
    } else {
        return temp.ad(txt);
    }
};
Number.prototype.sda = function(txt){
    const temp = this.sd('aid');
    if(Array.isArray(temp)){
        let result = [];
        temp.forEach(a => result.push(a.ad(txt)));
        return result;
    } else {
        return temp.ad(txt);
    }
};
String.prototype.sdg = function(txt){
    return this.sd('gid').gd(txt);
};
Number.prototype.sdg = function(txt){
    return this.sd('gid').gd(txt);
};
String.prototype.edg = function(txt){
    return this.ed('gid').gd(txt);
};
Number.prototype.edg = function(txt){
    return this.ed('gid').gd(txt);
};
String.prototype.sde = function(txt){
    const temp = this.sd('alid');
    if(temp == undefined){
        return null;
    } else {
        return temp.ed(txt);
    }
}
Number.prototype.sde = function(txt){
    const temp = this.sd('alid');
    if(temp == undefined){
        return null;
    } else {
        return temp.ed(txt);
    }
}
String.prototype.sdu = function(txt){
    return this.sd('owner').ad(txt);
}
Number.prototype.sdu = function(txt){
    return this.sd('owner').ad(txt);
}
String.prototype.edu = function(txt){
    return this.ed('owner').ad(txt);
}
Number.prototype.edu = function(txt){
    return this.ed('owner').ad(txt);
}
String.prototype.indb = function(txt, sub){
    let ans = null;
    if(['aid', 'alid', 'gid', 'sid', 'pid', 'uid'].includes(txt)){
        const db = ms.get(txt);
        Object.values(db).forEach(a => {
            if(a.name.toLowerCase() == this.toLowerCase()) {
                ans = a;
                if(sub != undefined){
                    ans = ans[sub];
                }
            }
        })
    }
    return ans;
}
String.prototype.l = function(txt, sub){
    let ans = null;
    if(['aid', 'alid', 'gid', 'sid', 'pid', 'uid'].includes(txt)){
        const db = ms.get(txt);
        Object.values(db).forEach(a => {
            if(a.id == this) {
                ans = a;
                if(sub != undefined){
                    ans = ans[sub];
                }
            }
        })
    }
    return ans;
}
Number.prototype.l = function(txt, sub){
    let ans = null;
    if(['aid', 'alid', 'gid', 'sid', 'pid', 'uid'].includes(txt)){
        const db = ms.get(txt);
        Object.values(db).forEach(a => {
            if(a.id == this) {
                ans = a;
                if(sub != undefined){
                    ans = ans[sub];
                }
            }
        })
    }
    return ans;
}
String.prototype.toArray = function(){return [Number(this)]}
Number.prototype.toArray = function(){return [Number(this)]}
Array.prototype.toArray = function(){return this};
String.prototype.comma = function(){return this.ad('name')};
Number.prototype.comma = function(){return this.ad('name')};
Array.prototype.comma = function(){
    return this.map(a => a.ad('name')).join(", ");
}
//comma: result.aid.toArray().map(a => a.ad('name').join(", "))
Math.check = function(n){if(n == 0) return 1;else return n;}
Object.copy = function(...obj){let result = {};obj.forEach(a => {Object.assign(result, a);Object.assign(result, a);});return result;}
Q.idb = idb;
Q.ck = {
    // Function to get the value of a cookie by its name
    get: function(name) {
      const cookies = document.cookie.split('; ');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === name) {
          return cookie[1];
        }
      }
      return null;
    },
  
    // Function to set a cookie with a given name, value, and expiration date
    set: function(name, value, expires) {
      let cookie = `${name}=${value};`;
      if (expires) {
        cookie += `expires=${expires.toUTCString()};`;
      } else {
            const today = new Date();
            expires = new Date(today.setMonth(today.getMonth() + 2));
            cookie += `expires=${expires.toUTCString()};path=/`;
      }
      document.cookie = cookie;
    },  
    // Function to delete a cookie by its name
    delete: function(name) {
      const expires = new Date();
      expires.setTime(expires.getTime() - 1);
      document.cookie = `${name}=; expires=${expires.toUTCString()};`;
    },
    // Function to delete all cookies
    deleteAll: function() {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${Q.location.hostname};path=/`;
        }
    }      
};
Q.ms = {
    query(source, query){
        let result = null;
        source = source.split(".")
        result = ms.get(source.shift());
        query = query.split(".");
        let db = ms.get(query.shift());
        query.forEach(a => db = db[a]);
        result = result[db];
        source.forEach(a => result = result[a]);
        return result;
    },
    get(...path){
        const paths = path.reduce((a,b) => a + b + '/', '').split('/').filter(a => a != '');
        if(maindb[paths[0]]){
            let data;
            try{data = eval(`maindb${paths.map(a => `["${a}"]`).join('')}`)}catch{data = undefined}
            if(data && data.aid && data.gid && typeof data.gid != "object") Object.assign(data, {names: names(data.aid)});
            return data;
        } else return null;
    },
    async clear(){
        return await idb.del(jkl);
    }
}
Q.rtdb = {
    uid: async function(info){
        const monitor = PRG();
        await new Promise(async (resolve, reject) => {
            if(info.img){
                monitor.start();
                await deleteObject(ref(db, ms.get("id", "img")));
                const uploadTask = uploadBytesResumable(sref(sdb, `/uid/${ms.get("id", "uid")}/img`), info.img, {type: info.img.type});
                uploadTask.on('state_changed', snapshot => {
                    const status = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                    monitor.progress(status, `Uploading Image ${status}%`);
                }, error => {
                    reject(error);
                    throw error;
                }, async () => {
                    monitor.progress(100,"Finalizing");
                    info.img = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(true);
                });
            } else {
                delete info.img;
                resolve(true);
            };
        })
        monitor.start();
        monitor.progress(100,"Finalizing");
        await update(ref(db, `/uid/${ms.get("id", "uid")}`), info);
        monitor.close();
        return true;
    },
    update: async function (type, sid) {
        let ts = new Date().getTime();
        let likes = await idb.get("likes");
        if(likes) {
                likes.sid[sid] ? likes.sid[sid]++ : likes.sid[sid] = 1;
                if(Array.isArray(sid.sd('aid'))){
                    sid.sd('aid').forEach(a => {
                        likes.aid[a] ? likes.aid[a]++ : likes.aid[a] = 1;
                    })
                } else likes.aid[sid.sd('aid')] ? likes.aid[sid.sd('aid')]++ : likes.aid[sid.sd('aid')] = 1;
                likes.gid[sid.sd('gid')] ? likes.gid[sid.sd('gid')]++ : likes.gid[sid.sd('gid')] = 1;
                if(sid.sd('alid')) likes.alid[sid.sd('alid')] ? likes.alid[sid.sd('alid')]++ : likes.alid[sid.sd('alid')] = 1;
            }
        else {
                likes = {sid: {}, aid:{},alid:{},gid:{}};
                likes.sid[sid] = 1;
                if(Array.isArray(sid.sd('aid'))){
                    sid.sd('aid').forEach(a => {
                        likes.aid[a] = 1;
                    })
                } else likes.aid[sid.sd('aid')] = 1;
                likes.gid[sid.sd('gid')] = 1;
                if(sid.sd('alid')) likes.alid[sid.sd('alid')] = 1;
        }
        await idb.set("likes", likes);
        let recents = {};
        Object.values(ms.get('sid')).forEach(a => {
            if((Math.abs(ts - a.recent_time) / (1000 * 60 * 60 * 24)) >= 7){
                recents[`sid/${a.sid}/recent_time`] = ts;
                recents[`sid/${a.sid}/recent`]= 0;
            }
        })
        Object.values(ms.get('aid')).forEach(a => {
            if((Math.abs(ts - a.recent_time) / (1000 * 60 * 60 * 24)) >= 7){
                recents[`aid/${a.aid}/recent_time`] = ts;
                recents[`aid/${a.aid}/recent`]= 0;
            }
        })
        Object.values(ms.get('alid')).forEach(a => {
            if((Math.abs(ts - a.recent_time) / (1000 * 60 * 60 * 24)) >= 7){
                recents[`alid/${a.alid}/recent_time`] = ts;
                recents[`alid/${a.alid}/recent`]= 0;
            }
        })
        if(Object.keys(recents).length) await update(ref(db), recents);
        let data = {};
        let path = {sid: `sid/${sid}/${type}`};
        if(sid.sd('alid')) {
            path.alid = `alid/${sid.sd('alid')}/${type}`;
            const a = sid.sd('alid').ed('aid');
            for(const a of sid.sd('alid').ed('aid').toArray()){data[`aid/${a}/${type}`] = increment(1)};
        }
        for (const a of sid.sd('aid').toArray()){data[`aid/${a}/${type}`] = increment(1)};
        Object.values(path).forEach(a => {if(a) data[a] = increment(1)});
        let path2 = {sid: `sid/${sid}/recent`};
        if(sid.sd('alid')) path2.alid = `alid/${sid.sd('alid')}/recent`;
        if(type == 'streams') {
            Object.values(path2).forEach(a => {if(a) data[a] = increment(1)});
            for(const a of sid.sd('aid').toArray()){data[`aid/${a}/recent`] = increment(1)}
        } else {
            Object.values(path2).forEach(a => {if(a) data[a] = increment(2)});
            for(const a of sid.sd('aid').toArray()){data[`aid/${a}/recent`] = increment(2)};
        }
        await update(ref(db), data);
        if(type == "downloads"){
            let check = await idb.get(type);
            if(!check){
                await idb.set(type, [sid]);
            } else if(!check.includes(sid)) {
                check.push(sid);
                await idb.set(type, check);
            }
        }
    },
    start: async function (){
        await database('read');
        const check = setInterval(() => {
            if(idbload) {
                clearInterval(check);
                idbload();
            }
        }, 1000);
    },
    reload: async () => {await database("update"); return true},
    add: async function (info) {
        const state = PRG();
        state.start();
        state.progress(30, 'Processing...');
        const img = () => `data:image/svg+xml;base64,${btoa(`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#222"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-size="48" font-family="Arial" fill="#fff">${info.name.charAt(0).toUpperCase()}</text></svg>`)}`
        let resp = {error: [], id: '', success: undefined};
        let f = Object.values((await get(ref(db, 'uid'))).val());
        f.forEach(b => {
            if(b.username.toLowerCase() == info.username.toLowerCase()) {
                resp.error.push("Username already exists");
            }
            if(b.contact.toLowerCase() == info.username.toLowerCase()){
                if(!isNaN(info.contact)){
                    resp.error.push("Phone no. has already been used");
                }
            }
            if(!isNaN(Number(b.contact)) && !isNaN(Number(info.contact)) && b.contact == info.contact) {
                resp.error.push("Number has been used");
            }
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(regex.test(b.contact) && regex.test(info.contact) && b.contact.toLowerCase() == info.contact.toLowerCase()){
                resp.error.push("Email has already been used");
            }
        })
        state.progress(60, 'Processing');
        if(resp.error.length == 0){
            f = f.map(a => a.uid);
            let a = generateId();
            while(f.includes(a)) {a = generateId()}
            info.img = img();
            info.uid = a;
            state.progress(90, 'Processing...');
            await set(ref(db, `uid/${a}`), info).then(() => {resp.success = true; resp.id = a}).catch(() => {resp.error.push("Couldn't create account")});
        }
        state.close;
        ms.clear();
        return resp;
    },
    caid: async function (info){
        const state = PRG();
        state.start();
        state.progress(50, 'Processing...');
        const resp = {error: [], success: null};
        Object.values(((await get(ref(db, 'aid')))).val()).forEach(a => {
            if(a.name.toLowerCase() == info.name.toLowerCase()) resp.error.push("Artist already exists");
        })
        if(!resp.error.length){
            info.aid = (await cdb.aid([info.name], {genre: info.genre, owner: ms.get("id", "uid")}))[0];
            info.img = (await uploadBytes(sref(sdb, `aid/${info.aid}/img`), info.img, {type: info.img.type})).ref.getDownloadURL();
            const updates = {};
            updates[`/aid/${info.aid}/img`] = info.img
            updates[`/uid/${ms.get("id", "uid")}`] = {img: info.img, aid: info.aid};
            await update(ref(db), updates);
            await rtdb.reload();
            resp.success = true;
        }
        state.close();
        return resp;
    },
    usid: async function(info, t, x, exs = []){
        let [GID, SID] = Array(5).fill(null);
        let ts = t || new Date().getTime();
        Object.assign(info, {streams: 0, recent: 0, recent_time: ts, age: ts, downloads: 0, owner: ms.get("id", "aid")});
        info.aid = await cdb.aid(info.aid, {genre: info.genre});
        if(info.aid.length == 1) info.aid = info.aid[0];
        if(info.genre){
            if(info.gid) delete info.henre
            else {
                info.gid = await cdb.gid(info.genre);
                delete info.genre;
            }
        }
        GID = info.gid;
        SID = generateId();
        const present = exs.length ? exs : Object.keys((await get(ref(db, '/'))).val());
        while(present.includes(SID)){
            SID = generateId()
            exs.push(SID);
        };
        info.sid = SID;
        const state = !x ? PRG() : {progress: () => undefined, start: () => undefined, close: () => undefined};
        await new Promise((resolve,_) => {
            state.start();
            const uploadTask = uploadBytesResumable(sref(sdb, `sid/${SID}/audio`), info.url, {type: info.url.type});
            uploadTask.on('state_changed', snapshot => {
                const prg = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
                state.progress(prg, `Processing audio \n ${prg}%`);
            }, error => {
                state.progress(0, 'ERROR!');
                throw error;
            }, async() => {
                info.url = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(true);
            })
        })
        await new Promise((resolve,_) => {
            if(typeof info.img == "string") return resolve(true);
            const uploadTask = uploadBytesResumable(sref(sdb, `sid/${SID}/img`), info.img, {type: info.img.type});
            uploadTask.on('state_changed', snapshot => {
                const prg = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                state.progress(prg, `Processing image \n ${prg}%`);
            }, error => {
                state.progress(0, 'ERROR!');
                throw error;
            }, async() => {
                info.img = await getDownloadURL(uploadTask.snapshot.ref);
                state.progress(100, 'Finalizing...');
                resolve(true);
            })
        })
        const updates = {};
        updates[`/sid/${SID}`] = info;
        const xGid = (await get(ref(db, `gid/${GID}/sid`))).val() || [];
        xGid.push(SID);
        updates[`/gid/${GID}/sid`] = xGid;
        for(let cur of info.aid.toArray()){
            const availA = (await get(ref(db, `aid/${cur}/sid`))).val() || [];
            availA.push(SID);
            updates[`aid/${cur}/sid`] = availA;
        }
        await update(ref(db), updates);
        await rtdb.reload();
        state.close();
        if(!x) AJAX('/listen/song?id=' + SID); else return SID;
    },
    log: async function (info){
        let resp = {error: []};
        let f = Object.values((await get(ref(db, 'uid'))).val());
        for(const a of f){
            console.log(a);
            if(a.username == info.key || info.contact == info.key && a.pwd == info.pwd){
                resp.id = a.uid;
                resp.success = true;
                resp.username = a.username;
            }
        }
        if(!resp.success){
            resp.error.push("Wrong login or password");
        }
        return resp;
    },
    calid: async function(info){
        await rtdb.reload();
        const ex = Object.keys((await get(ref(db, '/alid/'))).val());
        let alid = generateId();
        while(ex.includes(alid)){alid = generateId()}
        const ts = new Date().getTime();
        const refined = {alid: alid, name: info.name, sid: [], gid: await cdb.gid(info.genre), streams: 0, recent: 0, recent_time: ts, age: ts, owner: ms.get("id", "aid"), downloads: 0};
        refined.aid = await cdb.aid(info.aid, {genre: info.genre});
        if(refined.aid.length == 1) refined.aid = refined.aid[0];
        const state = PRG();
        state.start();
        const standard = (info.e.length + 1) * 100;
        let length = 0;
        await new Promise((resolve,_) => {
            const uploadTask = uploadBytesResumable(sref(sdb, `/alid/${alid}/img`), info.img, {type: info.img.type});
            uploadTask.on('state_changed', snapshot => {
                const prg = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100);
                const lv = (length + prg) / standard * 100;
                state.progress(lv, `Processing Album Art \n ${prg}%`);
            }, error => {
                throw error;
            }, async() => {
                refined.img = await getDownloadURL(uploadTask.snapshot.ref);
                length+= 100;
                resolve(true);
            })
        })
        const exs = Object.keys((await get(ref(db, '/sid'))).val());
        const all = {};
        //handle all songs
        for(const log of info.e){
            refined.sid.push(await this.usid(Object.assign(log, {alid: refined.alid, img: refined.img, gid: refined.gid}), ts, true, exs));
            exs.push(refined.sid[refined.sid.length - 1]);
        }
        all[`/alid/${refined.alid}`] = refined;
        const xGid = (await get(ref(db, `/gid/${refined.gid}/alid`))).val() || [];
        xGid.push(refined.alid);
        all[`/gid/${refined.gid}/alid`] = xGid;
        for(const log of refined.aid.toArray()){
            const xA = (await get(ref(db, `/aid/${log}/alid`))).val() || [];
            xA.push(refined.alid);
            all[`/aid/${log}/alid`] = xA;
        }
        await update(ref(db), all);
        await rtdb.reload();
        state.close();
        AJAX('/listen/album?id=' + refined.alid);
    },
    del: function(lv, id){
        const module = {
            async al(id){
                //delete songs one by one
                const xA = (await get(ref(db, `/alid/${id}`))).val();
                this.process = true; //this.aid = xA.aid.toArray();
                const state = PRG();
                state.start();
                const total = xA.aid.toArray().length + xA.sid.length + 4;
                let length = 0; let track = 1
                function call(){
                    length++;
                    state.progress(length / total * 100, 'Processing...');
                }
                state.progress(0, `Deleting track ${track} of ${xA.sid.length}`);
                for(const log of xA.sid){
                    state.progress(length / total * 100, `Deleting track ${track} of ${xA.sid.length}`);
                    await this.s(log);
                    length++; track++;
                }
                for(const log of xA.aid.toArray()){
                    const avail = (await get(ref(db, `/aid/${log}/alid`))).val();
                    await set(ref(db, `/aid/${log}/alid`), avail.filter(a => a != id));
                    call();
                }
                const avail = (await get(ref(db, `gid/${xA.gid}/alid`))).val();
                await set(ref(db, `/gid/${xA.gid}/alid`), avail.filter(a => a != id));
                call();
                await remove(ref(db, `/alid/${id}`));
                call();
                const I = await idb.get('likes');
                if(I) {
                    delete I.alid[id];
                    await idb.set('likes', I);
                }
                call();
                await rtdb.reload();
                state.close();
                return AJAX('/');
            },
            async s(id){
                const xA = (await get(ref(db, `/sid/${id}`))).val();
                const state = !this.process ? PRG() : {progress: () => undefined, start: () => undefined, close: () => undefined};
                state.start();
                const total = 9 + xA.aid.length;
                let length = 0;
                function call(){
                    length++;
                    state.progress(length / total * 100, 'Processing...');
                }
                const all = {};
                if(xA.alid && !this.process){
                    const avail = (await get(ref(db, `/alid/${xA.alid}/sid`))).val();
                    const data = {
                        streams: increment(-xA.streams),
                        downloads: increment(-xA.downloads),
                        recent: increment(-xA.recent)
                    }
                    all[`/alid/${xA.alid}`] = data;
                    await set(ref(db, `/alid/${xA.alid}/sid`), avail.filter(a => a != id));
                }
                call();
                for(const log of xA.aid.toArray()){
                    const avail = (await get(ref(db, `/aid/${log}/sid`))).val();
                    const data = {
                        streams: increment(-xA.streams),
                        downloads: increment(-xA.downloads),
                        recent: increment(-xA.recent)
                    }
                    all[`aid/${log}/`] = data;
                    await set(ref(db, `aid/${log}/sid`), avail.filter(a => a != id));
                    call();
                }
                const avail = (await get(ref(db, `gid/${xA.gid}/sid`))).val();
                await set(ref(db, `gid/${xA.gid}/sid`), avail.filter(a => a != id));
                call();
                await deleteObject(sref(sdb, xA.img));
                call();
                await deleteObject(sref(sdb, xA.url));
                call();
                await remove(ref(db, `/sid/${id}`));
                call();
                await update(ref(db), all);
                call();
                const I = await idb.get('likes');
                if(I) {
                    delete I.alid[id];
                    await idb.set('likes', I);
                }
                call();
                const q = await idb.get('queue');
                if(q && q.psid == id){
                    idb.del('queue');
                }
                call();
                await rtdb.reload();
                state.close();
                if(!this.process) return AJAX('/');
            }
        }
        return module[lv](id);
    },
    check(id, entry){
        const array = [[], ...Array(26).fill(65).map((a,b) => a+b).map(a => String.fromCharCode(a).toLowerCase()), ' '];
        const main = ms.get(`/aid/${id}/name`).toLowerCase();
        let all = '';
        for(const log of main){all += array.indexOf(log)};
        return all == entry
    },
    async pair(uid, aid){
        await set(ref(db, `/uid/${uid}/aid`), aid);
        await rtdb.reload();
    }
}
function generateId() {
    let id = '';
    let char = Array(10).fill(0).map((a,b) => a+b);
    while(id.length < 6){
        let index = Math.round(Math.random() * (char.length - 1));
        if(char[index] == 0 && id.length == 0) continue;
        id += char[index];
    }
    return Number(id);
}
function property(obj, array){
    let result = Object();
    Object.values(array).forEach(a => {
        result[a] = obj[a];
    })
    return result;
}
function names(id){
    let result;
    if(Array.isArray(id)){
        id = id.map(a => ms.get(`aid/${a}/name`));
        result = id.splice(0, id.length -1, );
        if(result.length >= 2){
            result = result.join(", ");
        }
        else {
            result = result.join('');
        }
        result += " & " + id[0];
    }
    else {
        result = ms.get(`aid/${id}/name`);
    }
    return result;
}
Q.match = function(query, data, idIndex, stringIndexes) {
    if(!Array.isArray(data)) data = Object.values(data);
    function fuzzyMatch(pattern, string) {
        pattern = pattern.toLowerCase();
        string = string.toLowerCase();
        if (string.indexOf(pattern) !== -1) {
          return true;
        }
        const distances = Array(pattern.length + 1)
          .fill(null)
          .map(() => Array(string.length + 1).fill(null));
        for (let i = 0; i <= pattern.length; i++) {
          distances[i][0] = i;
        }
        for (let j = 0; j <= string.length; j++) {
          distances[0][j] = j;
        }
        for (let i = 1; i <= pattern.length; i++) {
          for (let j = 1; j <= string.length; j++) {
            const cost = pattern[i - 1] === string[j - 1] ? 0 : 1;
            distances[i][j] = Math.min(
              distances[i - 1][j] + 1, // Deletion
              distances[i][j - 1] + 1, // Insertion
              distances[i - 1][j - 1] + cost // Substitution
            );
          }
        }
        return distances[pattern.length][string.length] <= 2;
    }      
    const results = [];  
    data.forEach((object) => {
      let matchCount = 0;
      let isMatch = false;  
      for (let i = 0; i < stringIndexes.length; i++) {
        const stringIndex = stringIndexes[i];
        const string = object[stringIndex];
        if (fuzzyMatch(query, string)) {
          matchCount++;
          isMatch = true;
        }
      }  
      if (isMatch) {
        results.push({
          id: object[idIndex],
          matchCount: matchCount,
        });
      }
    });
    results.sort((a, b) => b.matchCount - a.matchCount);  
    return results.map((result) => result.id);
}
Q.filter = function(txt){
    let result = '';
    for(let i = 0; txt[i] != undefined; i++){
        if(i == 0 && txt[i] == " ") continue;
        else if(result[result.length - 1] == " " && txt[i] == " ") continue;
        else if(txt[i] == " " && result[result.length - 1] == " ") continue;
        else if(txt[i] == "," && result[result.length - 1] == ",") continue;
        else if(txt[i] == "&") continue;
        else {result += txt[i]}
    }
    return result;
}
function comma(txt){
    let array = [];
    let lv1 = "";
    for(let index = 0; index != txt.length; index++){
      if(txt[index] != ","){
        if(!(txt[index] == " " & lv1.endsWith(txt[index]))){
          lv1 += txt[index];
          if(lv1[0] == " "){
            lv1 = lv1.replace(" ", "");
          }
        }
      }
      else {
        array.push(lv1);
        lv1 = "";
      }
    }
    array.push(lv1);
    return array;
}
String.prototype.comma = function(){
    return comma(this);
}
const jkl = btoa('password');
const database = async (txt, sec) => {
    const module = {
        async read(){
            const state = await idb.get(jkl);
            if(state){
                const data = (await fetch(state)).json();
                const diff = new Date().getTime() - data.stamp
                if(diff > 3600000 || !data.data) return await this.update();
                else return data.data;
            } else return await this.update();
        },
        async update(){
            const context = (await get(ref(db))).val();
            Object.assign(maindb, property(context, ["aid", "sid", "alid", "gid"]));
            if(ck.get("id")) maindb.id = context.uid[ck.get("id")];
            Object.assign(maindb, {likes: await idb.get("likes"), queue: await idb.get("queue"), users: Object.keys(context.uid).length});
            await this.write(maindb);
            return maindb;
        },
        async write(data){
            const transfer = {stamp: new Date().getTime(), data}
            const file = new Blob([JSON.stringify(transfer)], {type: "application/json"});
            return new Promise((resolve,_) => {
                const reader = new FileReader;
                reader.onload = async() => {
                    await idb.set(jkl, reader.result);
                    resolve(true);
                }
                reader.readAsDataURL(file);
            })
        }
    }
    return module[txt](sec);
}
const cdb = {
    async gid(txt){
      const all = this.gidList || (await get(ref(db, '/gid/'))).val();
      if(!this.gidList) this.gidList = all;
      const avail = Object.values(all);
      let result;
      for(let data of avail){
        if(data.name.toLowerCase() == txt.toLowerCase()){
          result = data.gid;
          break;
        }
      }
      if(!result){
        let temp = generateId();
        while(temp in all){temp = generateId()}
        const ts = new Date().getTime();
        const data = {name: txt, gid: temp, alid: [], sid: []}
        await set(ref(db, `/gid/${temp}`), data);
        result = temp;
      }
      return result;
    },
    async aid(array, obj){
        const all = this.aidList || (await get(ref(db, '/aid/'))).val();
        if(!this.aidList) this.aidList = all;
        const avail = Object.values(all);
        const result = [];
        const uploads = {};
        const ts = new Date().getTime();
        for(let txt of array){
          let ans;
          for(let data of avail){
            if(data.name.toLowerCase() == txt.toLowerCase()){
              ans = data.aid;
              break;
            }
          }
          if(!ans){
            let temp = generateId();
            while(temp in all || result.includes(temp)){temp = generateId()}
            ans = temp;
            const data = {name: txt, genre: obj.genre, aid: temp, img: obj.img || '/favicon.png', alid: [], sid: [], age: ts, recent_time: ts, recent: 0, streams: 0, downloads: 0, owner : obj.owner || undefined}
            uploads[temp] = data;
          }
          result.push(ans);
        }
        if(Object.keys(uploads).length) await update(ref(db, '/aid/'), uploads);
        return result;
    }
}
