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

const fileDir = './audio_files'

const handleUpload = async () => {
    const audio_files = fs.readdirSync(fileDir)
    let url
    let uploads = []
    for(let audio_file of audio_files){
        const upload = fs.readFileSync(`${fileDir}/${audio_file}`)
        const added = await client.add(upload)
        url = `https://personal-project-storage.infura-ipfs.io/ipfs/${added.path}`
        uploads.push(url)
        console.log(url)
        console.log(audio_file)
      
    }
    fs.writeFile(`./upload-links/vending-image-uris.txt`, uploads.join('\n'), e => {
        if (e) {
            console.error(e);
        }
    })
}

handleUpload()
