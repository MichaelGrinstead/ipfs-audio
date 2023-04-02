import {create} from 'ipfs-http-client'
import {Buffer} from 'buffer'
import fs from 'fs'
import * as dotenv from "dotenv";

dotenv.config();


const ID = process.env.INFURA_PROJECT_ID
const SECRET = process.env.INFURA_PROJECT_SECRET

const auth = 'Basic ' + Buffer.from(ID + ':' + SECRET).toString('base64');
const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
        authorization: auth,
    }
})


const fileDir = './audio_metadata'

console.log(fs.readdirSync(fileDir))

const returnFile = () => {
    const audio_metadata = fs.readdirSync(fileDir)
    for(let metadata of audio_metadata){
        const data = fs.readFileSync(`${fileDir}/${metadata}`)
        const jsonData = JSON.parse(data.toString())
        console.log(jsonData)
        const added = client.add(jsonData)
        console.log(added.path)
    }
}


returnFile()

// const handleUpload = async () => {
//     const audio_metadata = fs.readdirSync(fileDir)
//     let url
//     let uploads = []
//     for(let metadata of audio_metadata){
//         const upload = fs.readFileSync(`${fileDir}/${metadata}`)
//         const added = await client.add(upload, { duplex: "true" })
//         url = `https://personal-project-storage.infura-ipfs.io/ipfs/${added.path}`
//         uploads.push(url)
//         console.log(url)
//         console.log(metadata)

//         fs.writeFile(`./audio_metadata_${metadata}.txt`, uploads.join('\n'), e => {
//             if (e) {
//                 console.error(e);
//             }
//         })
      
//     }

//     console.log(uploads)
    
// }

// handleUpload()
