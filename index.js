
const tick = Date.now()
const log = (v) => console.log(`${v} \n Elapsed : ${Date.now() - tick}ms`)

const users = [
    {
        name : 'Adnan Quazi',
        age : 19
    },
    {
        name : 'Java',
        age : 25
    },
    {
        name : 'Node',
        age : 12
    }
]

const delay = async (ms) =>{
    await new Promise(resolve => setTimeout(() => resolve(), ms));
}

const loopBlocker = async (name) => {
    if(!name) return Promise.reject('Err')
    
    await delay(1000)
    return Promise.resolve().then(_ => {
       
        for(const val of users){
            if(val.name === name){
                return val
            }
        }
        return 'Not Found'
    })  
}
// log('Sandwich')
// loopBlocker("Hi")
// .then(data => {
//     log(JSON.stringify(data))
// })
// .catch(err => log(err))
// log('Burger')

// const findUser = async () =>{

//     try{
//         const a = loopBlocker('Adnan Quazi')
//         const b = loopBlocker('Node')
//         const c = loopBlocker()
    
//         const res = await Promise.allSettled([a,b,c])
//         return JSON.stringify(res)
//     }catch(err){
//         console.log('Err Block', err)
//         return err
//     }

    
// }

// findUser().then(log)



const names = ["Adnan Quazi","Java"]

const getDetails = async () => {
    try {

        for(const name of names){
            // log(JSON.stringify(await loopBlocker(name)))
                // loopBlocker(name).then(data => log(JSON.stringify(data))).catch(log)
                console.log(await Promise.all([loopBlocker(name)]))
                log(Promise.all([loopBlocker(name)]))
        }
        
    }catch (error){
        console.log(error)
    }
 
}

getDetails()