const projectName = window.location.host + '-';
//sessionStorage
export const session = {
    get:(key)=>{
        //当传入的值为number类型时
        if( typeof key === "number" ){
            const slength = Object.keys(sessionStorage)
            let arr = new Array()
            for(let i=0; i<slength.length; i++){
                let keys = projectName + Object.keys(sessionStorage)[i]
                let values = sessionStorage.getItem( projectName + keys )
                arr[i] = {
                    key:keys,
                    value:values
                }
                if(i == key-1){
                    return arr[i]
                }
            }
        }
        //否则
        try{
            return JSON.parse(sessionStorage.getItem( projectName + key ))
        }catch{
            return sessionStorage.getItem( projectName + key )
        }
    },
    set:(key,value)=>{
        if(Object.prototype.toString.call(value) && typeof value === "object"){
            return  sessionStorage.setItem( projectName + key ,JSON.stringify(value))
        }
        return sessionStorage.setItem( projectName + key ,value)
    },
    remove:(key)=>{
        sessionStorage.removeItem( projectName + key )
    },
    clear:()=>{
        sessionStorage.clear()
    },
    length:(()=>{
        const arr = Object.keys(sessionStorage)
        return arr.length
    })(),
    each:(callback)=>{
        let arr = new Array()
        for(let i=0; i<stroage.session.length; i++){
            let key = Object.keys(sessionStorage)[i].replace(projectName,'')
            let value = stroage.session.get( key )
            arr[i] = {
                key,value
            } 
        }
        return arr.forEach( (item,index) =>{
            callback(item,index)
        })
    }
}
//localStorage
export const local = {
    get:(key)=>{
        //当传入的值为number类型时
        if( typeof key === "number" ){
            const llength = localStorage.length
            let arr = new Array()
            for(let i=0; i<llength; i++){
                let keys = projectName + localStorage.key(i)
                let values = localStorage.getItem( projectName + keys )
                arr[i] = {
                    key:keys,
                    value:values
                }
                if(i == key-1){
                    return arr[i]
                }
            }
        }
        //否则
        try{
            return JSON.parse(localStorage.getItem( projectName + key ))
        }catch{
            return localStorage.getItem( projectName + key )
        }
    },
    set:(key,value)=>{
        if(Object.prototype.toString.call(value) && typeof value === "object" ){
            return  localStorage.setItem( projectName + key ,JSON.stringify(value))
        }
        return localStorage.setItem( projectName + key ,value)
    },
    remove:(key)=>{
        localStorage.removeItem( projectName + key )
    },
    clear:()=>{
        localStorage.clear()
    },
    length:localStorage.length,
    each:(callback)=>{
        let arr = new Array()
        for(let i=0; i<stroage.local.length; i++){
            let key = localStorage.key(i).replace(projectName,'')
            let value = localStorage.getItem(key)
            arr[i] = {
              key,value
            }
        }
        return arr.forEach( (item,index)=> {
            callback(item,index)
        })
    },
}
//cookit
export const cookie = {
    set:(key,value,time)=>{
        const date = new Date()
        let cnTime = 8 * 60 * 60 * 1000  
        date.setTime( date.getTime() + (Number(time) * 24 * 60 * 60 * 1000) + cnTime) 
        document.cookie = projectName + key+'='+value+ ';expires=' +date.toUTCString(); 
    },
    get:(key)=>{
        const cookies = document.cookie;
        const cookieArr = cookies.split(';');
        const cookieObj = new Object();
        const numObj = new Object() //接收当key为number类型时
        cookieArr.forEach((item,index)=>{
            let newArr = item.split("=");
            cookieObj[newArr[0].trim()] = newArr[1]
            //当key为number类型时
            if(typeof key === "number" && key-1 === index){
                numObj[newArr[0].trim()] = newArr[1]
            }
        })
        //当key为number类型时
        if(typeof key === "number"){
            return numObj
        }
        //否则
        let strValue = ''
        for(let name in cookieObj){
            if(name == projectName + key){ 
                strValue = cookieObj[name]
            }
        }
        return strValue
    },
    remove:(key)=>{
        const date = new Date() 
        date.setTime(date.getTime()+ -1 *24*60*60*1000);
        document.cookie = projectName + key+'='+' ;expires=' +date.toUTCString();
    },
    clear:()=>{
        const date = new Date()
        date.setTime(date.getTime()+ -1 *24*60*60*1000);
        const cookies = document.cookie;
        const cookieArr = cookies.split(';');
        const cookieObj = new Object();
        cookieArr.forEach(item=>{
            let newArr = item.split("=");
            cookieObj[newArr[0].trim()] = newArr[1]
        })
        for(let key in cookieObj){
            document.cookie = key+'='+' ;expires=' +date.toUTCString();
        }
    },
    length:(()=>{
        const cookies = document.cookie;
        const cookieArr = cookies.split(';');
        return cookieArr.length
    })(),
    each:(callback)=>{
        const cookies = document.cookie;
        const cookieArr = cookies.split(';');
        const cookieObj = new Object();
        cookieArr.forEach((item,index)=>{
            let newArr = item.split("=");
            cookieObj[newArr[0].trim()] = newArr[1]
            return callback({
                key:newArr[0].trim().replace(projectName,''),
                value:newArr[1]
            },index)
        })
    }
}
const stroage = {
    session,
    local,
    cookie 
}
export default stroage


// //sessionStorage
// stroage.session.get(key || number)  //number从1开始
// stroage.session.set(key,value)
// stroage.session.remove(key)
// stroage.session.clear()
// stroage.session.length
// stroage.session.each((item,index) => {  })

// //localStorage
// stroage.loacl.get(key || number)  //number从1开始
// stroage.loacl.set(key,value)
// stroage.loacl.remove(key)
// stroage.loacl.clear()
// stroage.loacl.length
// stroage.loacl.each((item,index) => {  })

// //cookie
// stroage.cookie.get(key || number)  //number从1开始
// stroage.cookie.set(key,value,time)
// stroage.cookie.remove(key)
// stroage.cookie.clear()
// stroage.cookie.length
// stroage.cookie.each((item,index) => {  })