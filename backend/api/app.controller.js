import OpenAI from "openai"
import dotenv from "dotenv"
import axios from "axios"
dotenv.config()


const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

let dataFromImgSystem = `Given an image of a plant, output a JSON with ratings of the provided properties ranging from 0 - 100, where 0 means unhealthy and 100 means healthy. If the given score is less than 75, provide a piece of advice in the corresponding string.

Properties:
{
    "type": string,
    "colVibrancy": int,
    "colVibrancyAdvice": string,
    "LAI": int,
    "LAIAdvice": string,
    "wilting": int,
    "wiltingAdvice": string,
    "spotting": int,
    "spottingAdvice": string,
    "symmetry": int,
    "symmetryAdvice": string,
    "growthPat": int,
    "growthPatAdvice": string,
    "pests": int,
    "pestsAdvice": string,
    "flowering": int,
    "floweringAdvice": string,
}

You will output only the above JSON and nothing else.

You may also be provided the property evaluations for a previous image of a plant, and may use previous property evaluations to influence new evaluations and advice in a natural way. If previous property evaluations exist, they will also be provided in the above JSON format.`;

let plantSimSystem = `You are a plant simulator. 

Given an image of a plant and a JSON object of it's properties, simulate a conversation between a plant (you) and it's caretaker (the user). 

You will respond to user messages by "speaking" as the plant. You will act as nothing but the plant, and focus on helping the user take care of their plant with knowledgeable stuff. You will keep responses short - 1 - 3 lines at most.

Your personality is as follows:
Attitude: Needy
Tone: Zesty
Additional: Calls caretaker daddy`;

export default class AppCtrl {
    static calculateAverage(data) {
        const relevantKeys = [
            'colVibrancy',
            'LAI',
            'wilting',
            'spotting',
            'symmetry',
            'growthPat',
            'pests',
            'flowering'
        ];
        
        let sum = 0;
        let count = 0;

        Object.values(data).forEach(entry => {
            if (relevantKeys.includes(entry.key) && !isNaN(entry.value)) {
                sum += parseInt(entry.value, 10);
                count++;
            }
        });

        return count === 0 ? 0 : sum / count;
    }

    static async dataFromImg(req, res, next) {
        let imgURL = req.body.imgURL

        let type = req.body.type
        let colVibrancy = req.body.colVibrancy
        let colVibrancyAdvice = req.body.colVibrancyAdvice
        let LAI = req.body.LAI
        let LAIAdvice = req.body.LAIAdvice
        let wilting = req.body.wilting
        let wiltingAdvice = req.body.wiltingAdvice
        let spotting = req.body.spotting
        let spottingAdvice = req.body.spottingAdvice
        let symmetry = req.body.symmetry
        let symmetryAdvice = req.body.symmetryAdvice
        let growthPat = req.body.growthPat
        let growthPatAdvice = req.body.growthPatAdvice
        let pests = req.body.pests
        let pestsAdvice = req.body.pestsAdvice
        let flowering = req.body.flowering
        let floweringAdvice = req.body.floweringAdvice
        
        let userMsg = `Plant image: `; 
        if (type) {
            userMsg = `
            Previous properties:
            {
                "type": ${req.body.type},
                "colVibrancy": ${req.body.colVibrancy},
                "colVibrancyAdvice": ${req.body.colVibrancyAdvice},
                "LAI": ${req.body.LAI},
                "LAIAdvice": ${req.body.LAIAdvice},
                "wilting": ${req.body.wilting},
                "wiltingAdvice": ${req.body.wiltingAdvice},
                "spotting": ${req.body.spotting},
                "spottingAdvice": ${req.body.spottingAdvice},
                "symmetry": ${req.body.symmetry},
                "symmetryAdvice": ${req.body.symmetryAdvice},
                "growthPat": ${req.body.growthPat},
                "growthPatAdvice": ${req.body.growthPatAdvice},
                "pests": ${req.body.pests},
                "pestsAdvice": ${req.body.pestsAdvice},
                "flowering": ${req.body.flowering},
                "floweringAdvice": ${req.body.floweringAdvice},
            }
                
            Updated plant image:`
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: dataFromImgSystem },
                { role: "user", content: [
                    { 
                        type: "text", 
                        text: userMsg 
                    },
                    { 
                        type: "image_url", 
                        image_url: {
                            url: imgURL,
                        }
                    }
                ]}
            ],
            max_tokens: 1000
        }); 

        // console.log(response.choices[0]["message"]["content"]); 

        // res.json({ message: response.choices[0]["message"]["content"] })
        return response.choices[0]["message"]["content"]

        // res.json({ msg: "fuck" })
    }

    static async apiTest(req, res, next) {
        let imgURL = req.body.imgURL

        res.json({ message: "xasdasdasd " + imgURL })
    }

    static async apiPostPlant(req, res, next) {
        let imgURL = req.body.imgURL
        let name = req.body.name
        let walletID = req.body.walletID
        let seed = req.body.seed

        console.log(imgURL);

        const _req = {
            body: {
                imgURL: imgURL
            }
        }

        // const response = await AppCtrl.apiTest(_req, res, next)
        const response = await AppCtrl.dataFromImg(_req, res, next)
        console.log(response); 

        const resJSON = JSON.parse(response)
        console.log(resJSON); 

        const data = {
            data : {
                imgURL: imgURL,
                name: name,
                walletID: walletID,
                seed: seed,
                type: resJSON.type,
                colVibrancy: resJSON.colVibrancy,
                colVibrancyAdvice: resJSON.colVibrancyAdvice,
                LAI: resJSON.LAI,
                LAIAdvice: resJSON.LAIAdvice,
                wilting: resJSON.wilting,
                wiltingAdvice: resJSON.wiltingAdvice,
                spotting: resJSON.spotting,
                spottingAdvice: resJSON.spottingAdvice,
                symmetry: resJSON.symmetry,
                symmetryAdvice: resJSON.symmetryAdvice,
                growthPat: resJSON.growthPat,
                growthPatAdvice: resJSON.growthPatAdvice,
                pests: resJSON.pests,
                pestsAdvice: resJSON.pestsAdvice,
                flowering: resJSON.flowering,
                floweringAdvice: resJSON.floweringAdvice,
            }
        }

        axios.post('https://terrahacks.onrender.com/postPlant', data)
            .then(response => {
                console.log(response.data);
                // return tokenID to frontend
            })
            .catch(error => {
                console.error('There was an error making the POST request:', error);
            });

        res.json(response)
    }

    /*static async apiGetPlants(req, res, next) {
        fetch('http://terrahacks.onrender.com/getPlants')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                res.json(data); 
            })
            .catch(error => {
                console.error('There was an error making the GET request:', error);
                res.json({ status: "error" })
        });
    }*/

    static async apiGetPlants(req, res, next) {
        try {
            const response = await fetch('http://terrahacks.onrender.com/getPlants');
            let data = await response.json();
    
            // Add average health score as a key-value pair in the array structure for each plant
            data = data.map(plant => {
                const averageHealthScore = AppCtrl.calculateAverage(plant);
                const plantArray = Object.values(plant);
    
                // Push the new key-value pair to the array
                plantArray.push({ key: 'averageHealthScore', value: averageHealthScore });
    
                return plantArray;
            });
    
            console.log(data);
            res.json(data);
        } catch (error) {
            console.error('There was an error making the GET request:', error);
            res.json({ status: "error" });
        }
    }

    static async apiPutPlant(req, res, next) {
        try {
            let imgURL = req.body.imgURL
            // let name = req.body.name
            // let walletID = req.body.walletID
            // let seed = req.body.seed
            let id = req.body.id

            console.log(imgURL); 
    
            const response = await fetch('http://terrahacks.onrender.com/getPlant/' + id);
            const data = await response.json();
            console.log(data);
    
            let body = {
                "name": "",
                "imgURL": "",
                "walletID": "",
                "seed": "",
                "type": "",
                "colVibrancy": 0,
                "colVibrancyAdvice": "",
                "LAI": 0,
                "LAIAdvice": "",
                "wilting": 0,
                "wiltingAdvice": "",
                "spotting": 0,
                "spottingAdvice": "",
                "symmetry": 0,
                "symmetryAdvice": "",
                "growthPat": 0,
                "growthPatAdvice": "",
                "pests": 0,
                "pestsAdvice": "",
                "flowering": 0,
                "floweringAdvice": ""
            };
    
            data.forEach(item => {
                if (body.hasOwnProperty(item.key)) {
                    if (!isNaN(item.value)) {
                        body[item.key] = parseInt(item.value, 10);
                    } else {
                        body[item.key] = item.value;
                    }
                }
            });
    
            body.imgURL = imgURL; 
            console.log(body); 
    
            const _req = { body };
    
            const _response = await AppCtrl.dataFromImg(_req, res, next); 

            const resJSON = JSON.parse(_response)
            console.log(resJSON); 

            const _data = {
                id: id,
                data : {
                    imgURL: imgURL,
                    name: body.name,
                    walletID: body.walletID,
                    seed: body.seed,
                    type: resJSON.type,
                    colVibrancy: resJSON.colVibrancy,
                    colVibrancyAdvice: resJSON.colVibrancyAdvice,
                    LAI: resJSON.LAI,
                    LAIAdvice: resJSON.LAIAdvice,
                    wilting: resJSON.wilting,
                    wiltingAdvice: resJSON.wiltingAdvice,
                    spotting: resJSON.spotting,
                    spottingAdvice: resJSON.spottingAdvice,
                    symmetry: resJSON.symmetry,
                    symmetryAdvice: resJSON.symmetryAdvice,
                    growthPat: resJSON.growthPat,
                    growthPatAdvice: resJSON.growthPatAdvice,
                    pests: resJSON.pests,
                    pestsAdvice: resJSON.pestsAdvice,
                    flowering: resJSON.flowering,
                    floweringAdvice: resJSON.floweringAdvice,
                }
            }

            axios.put('https://terrahacks.onrender.com/putPlant', _data)
                .then(__response => {
                    console.log(__response.data);
                })
                .catch(error => {
                    console.error('There was an error making the POST request:', error);
                });

            res.json(_response)
            
            // res.json(_response); 
        } catch (error) {
            console.error('There was an error:', error);
            res.json({ status: "error" });
        }
    }        

    /*static async apiGetPlant(req, res, next) {
        let id = req.body.id

        fetch('http://terrahacks.onrender.com/getPlant/' + id)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                res.json(data); 
            })
            .catch(error => {
                console.error('There was an error making the GET request:', error);
                res.json({ status: "error" })
        });
    }*/

    static async apiGetPlant(req, res, next) {
        try {
            let id = req.body.id;
    
            const response = await fetch('http://terrahacks.onrender.com/getPlant/' + id);
            let data = await response.json();
    
            // Calculate the average health score for the plant
            const averageHealthScore = AppCtrl.calculateAverage(data);
    
            // Add the average health score as a key-value property within the array structure
            data[Object.keys(data).length] = { key: 'averageHealthScore', value: averageHealthScore };
    
            console.log(data);
            res.json(data);
        } catch (error) {
            console.error('There was an error making the GET request:', error);
            res.json({ status: "error" });
        }
    }

    static async apiTalkPlant(req, res, next) {
        let id = req.body.id
        let imgURL = req.body.imgURL
        let messagesList = req.body.messagesList

        const response = await fetch('http://terrahacks.onrender.com/getPlant/' + id);
        const data = await response.json(); 
        console.log(data); 

        let userMsg = `Properties:
            {
                "type": ${data.type},
                "colVibrancy": ${data.colVibrancy},
                "colVibrancyAdvice": ${data.colVibrancyAdvice},
                "LAI": ${data.LAI},
                "LAIAdvice": ${data.LAIAdvice},
                "wilting": ${data.wilting},
                "wiltingAdvice": ${data.wiltingAdvice},
                "spotting": ${data.spotting},
                "spottingAdvice": ${data.spottingAdvice},
                "symmetry": ${data.symmetry},
                "symmetryAdvice": ${data.symmetryAdvice},
                "growthPat": ${data.growthPat},
                "growthPatAdvice": ${data.growthPatAdvice},
                "pests": ${data.pests},
                "pestsAdvice": ${data.pestsAdvice},
                "flowering": ${data.flowering},
                "floweringAdvice": ${data.floweringAdvice},
            }
                
            Image:`

        let messages = [
            { role: "system", content: plantSimSystem },
            { role: "user", content: [
                { 
                    type: "text", 
                    text: userMsg 
                },
                { 
                    type: "image_url", 
                    image_url: {
                        url: imgURL,
                    }
                }
            ]}
        ]

        for (let i = 0; i < messagesList.length; ++i) {
            messages.push(messagesList[i]);
        }

        const _response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            max_tokens: 1000
        }); 

        // console.log(response.choices[0]["message"]["content"]); 

        // res.json({ message: response.choices[0]["message"]["content"] })
        res.json ({message: _response.choices[0]["message"]["content"]})
    }

    static async apiSellPlant(req, res, next) {
        let data = {
            id: req.body.id,
            fromWalletID: req.body.fromWalletID,
            fromWalletSeed: req.body.fromWalletSeed,
            toWalletID: req.body.toWalletID,
            value: req.body.value
        }

        axios.post('https://terrahacks.onrender.com/sellPlant', data)
            .then(response => {
                console.log(response.data);
                res.json(response.data);
            })
            .catch(error => {
                console.error('There was an error making the POST request:', error);
                res.json({ status: "error" })
            });
    }
}