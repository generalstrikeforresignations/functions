const MongoClient = require('mongodb').MongoClient;

async function main(args) {
    const uri = process.env['DATABASE_URL'];
    let client = new MongoClient(uri);
    console.log(args);
    let new_contact = args;
    try {
        await client.connect();
        await client.db("knowledge").collection("contacts").insertOne(new_contact);
        console.log(`added ${new_contact} to database.`);
        return { ok: true };
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem adding the email address to the database." },
            "statusCode": 400
        };
    } finally {
        await client.close();
        }
    return {
        uri, args
    }
}

module.exports.main = main;
