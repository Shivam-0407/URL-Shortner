const generateShortId = require('ssid');
const URL = require("../models/url");

async function handleGenerateURL(req,res){
    const body = req.body
    if(!body.url){
        res.status(401).json({message:"URL not found"});
    }
    const shortId = generateShortId(9);
    const entry = await URL.create({
        shortUrl: shortId,
        redirectUrl:body.url,
        visitedHistory:[]
    })

    res.status(200).json({message:`URL created successfully ${shortId}`})
}

async function handleGiveShortURL (req, res){
    const shortUrl = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortUrl,
        },
        {
            $push: {
                visitedHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if(!entry){
        res.status(404).json({message:`Short URL not found`})
    }

    res.redirect("https://" + entry.redirectUrl);
}

async function handleAnalytics(req,res){
    const shortUrl = req.params.shortId;
    const entry = await URL.findOne({shortUrl})
    if(!entry){
        res.status(401).json({message:"short url not found"});
    }

    res.status(200).json({totalClicks:entry.visitedHistory.length,analytics:entry.visitedHistory})
}

module.exports = {handleAnalytics,handleGenerateURL,handleGiveShortURL}