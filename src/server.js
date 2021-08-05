import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '/build')))
app.use(express.json());

const withDB = async ( operations, res ) => {

    try {
        

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('tva-db');
    
        await operations(db);
      
        client.close();
    }
    catch (error) {
        res.status(500).json({ message: 'Error connecting to db', error });
    }
};

app.get('/api/threat/:name', async (req, res) => {

    withDB(async (db) => {
        const threatName = req.params.name;
        const threatInfo = await db.collection('threats').findOne({name:threatName});
        res.status(200).json(threatInfo);
    }, res);

});

app.get('/api/members', async (req, res) => {

    withDB(async (db) => {
        const memberList = await db.collection('members').find({}).toArray();
        res.status(200).json(memberList);
    }, res);

});

app.get('/api/members/:name', async (req, res) => {

    withDB(async (db) => {
        const memberName = req.params.name;
        const memberInfo = await db.collection('members').findOne({name:memberName});
        res.status(200).json(memberInfo);
    }, res);

});

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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
})

app.listen(8080, () => console.log('Listening on port 8080'));