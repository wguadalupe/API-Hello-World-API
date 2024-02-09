// Require Express and set up the router
const express = require('express');
const languages = express.Router();

// Require the Mongoose model
const Language = require('../models/language');

// Seed Route
languages.get('/seed', (req, res) => {
    Language.insertMany([
        {
            "name": "english",
            "greeting": "Hello world",
            "pangram": "The quick brown fox jumps over the lazy dog",
            "filler": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            "name": "spanish",
            "greeting": "Hola mundo",
            "pangram": "Benjamín pidió una bebida de kiwi y fresa; Noé, sin vergüenza, la más exquisita champaña del menú"
        },
        {
            "name": "korean",
            "greeting": "세상아, 안녕",
            "pangram": "왠 초콜릿? 제가 원했던 건 녹두전과 의류예요. 예야, 왜 또 불평?"
        },
        {
            "name": "swedish",
            "greeting": "Hej världen",
            "filler": "Löksås ipsum äng miljoner både varit inom äng mjuka ordningens, vid sitt söka jäst ska stora miljoner ska vi varit, åker äng brunsås trätensilierna rännil precis tre där."
        },
        {
            "name": "hindi",
            "greeting": "नमस्ते दुनिया",
            "pangram": "राम ने राजा हरिश्चंद्र के राज्य में एक रसगुल्ला खाया।",
            "filler": "पेड़ा तरीके गुजरना स्वतंत्र सार्वजनिक जिम्मे अनुवाद दौरान पसंद दिये विश्व पुस्तक मुख्यतह भाति ध्वनि पहोचने तकनीकी उपलब्ध अधिकांश सोफ़्टवेर सहयोग भाषा दिये प्राण असक्षम विभाजनक्षमता पहोच।"
        },
        {
            "name": "swahili",
            "greeting": "Salamu, dunia"
        }
    ])
    .then(createdLanguages => {
        res.json({ message: "Seed successful!" });
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// Index Route
languages.get('/', (req, res) => {
    Language.find()
    .then(foundLanguages => {
        res.json(foundLanguages);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// Show Route
languages.get('/:name', (req, res) => {
    Language.findOne({ name: req.params.name.toLowerCase() })
    .then(foundLanguage => {
        res.json(foundLanguage);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
});

languages.get('/languages/random', (req, res) => {
    Language.countDocuments()
    .then(count => {
        // Generate a random offset
        const random = Math.floor(Math.random() * count);
        return Language.findOne().skip(random);
    })
    .then(foundLanguage => {
        res.json(foundLanguage);
    })
    .catch(error => {
        res.status(500).json({ error: error.message });
    });
});

// Export the router
module.exports = languages;
