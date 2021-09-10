import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const __dirname = path.resolve();

app.use(express.json());

const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 5000;

var Member = mongoose.model('Member', {
    position: String,
    name: String,
    status: String,
    bio: String,
    imgURL: String
});

var NexusEvent = mongoose.model('NexusEvent', {
    code: String,
    date: Date,
    location: String,

});

var EventDetails = mongoose.model('EventDetails', {
    code: String,
    date: Date,
    pageTitle: String,
    headerImageURL: String,
    introText: String,
    bodyText: String,
    changedText: String,
    originalText: String,
    scenarioText: String,
    bodyImgURL: String,
    notableChanges: Array

});


mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true  }, (err) => {
    console.log('mongo db connection', err)
});

app.get('/api/members', (req, res) => {
    Member.find({}, (err, members) => {
        res.status(200).json(members);
    })
});

app.get('/api/nexus-events', (req, res) => {
    NexusEvent.find({}, (err, events) => {
        res.send(events)
    })
})

app.get('/api/nexus-events/:code', (req, res) => {
    var code = req.params.code
    EventDetails.findOne({code: code}, (err, eventDetails) => {
        res.send(eventDetails)
    })
})

/*
const withDB = async ( operations, res ) => {

    try {
        const client = await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        // const db = client.db('tva-db');
        console.log('mongo db connection', err)
        // await operations(db);
        client.close();
    }
    catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
};

app.get('/api/nexus-events', async (req, res) => {

    withDB(async (db) => {
        const nexusEvents = await db.collection('nexusEvents').find({}).toArray();
        res.status(200).json(nexusEvents);
    }, res);

});

app.get('/api/threat/:name', async (req, res) => {

    withDB(async (db) => {
        const threatName = req.params.name;
        const threatInfo = await db.collection('threats').findOne({name:threatName});
        res.status(200).json(threatInfo);
    }, res);

});


app.get('/api/members', async (req, res) => {

    withDB(async (db) => {
        const memberList = await db.find({}).toArray();
        res.status(200).json(memberList);
    }, res);

});
*/


/*
app.get('/api/members/:name', async (req, res) => {

    withDB(async (db) => {
        const memberName = req.params.name;
        const memberInfo = await db.collection('members').findOne({name:memberName});
        res.status(200).json(memberInfo);
    }, res);

});
*/

/*
app.post('/api/threat/:name/threat-level', async (req, res) => {

    withDB(async (db) => {
        const threatName = req.params.name;

    
        const threatInfo = await db.collection('threats').findOne({ name: threatName });
    
        await db.collection('threats').updateOne({ name: threatName }, {
            '$set': {
                threatLevel: threatInfo.threatLevel + 1,
            },
        });
        const updatedThreatInfo = await db.collection('threats').findOne({ name: threatName });
    
        res.status(200).json(updatedThreatInfo);
        
    
    }, res);
        
    
});

app.post('/api/threat/:name/add-comment', async (req, res) => {
    const { username, text } = req.body;

    const threatName = req.params.name;

    withDB(async (db) => {
        const threatInfo = await db.collection('threats').findOne({ name: threatName });
        await db.collection('threats').updateOne({ name: threatName }, {
            '$set':{
                comments: threatInfo.comments.concat({ username, text }),
            },
        });
        const updatedThreatInfo = await db.collection('threats').findOne({ name: threatName });
        res.status(200).json(updatedThreatInfo);

    }, res);

});
*/

/*
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})
*/


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', '/index.html'));
    });
}
else {
    app.get('/', (req, res) => {
        res.send('API running');
    });
}


var server = app.listen(port, () => console.log('Listening on port ' + server.address().port));