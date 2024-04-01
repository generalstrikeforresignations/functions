// The function's dependencies.
const MongoClient = require('mongodb').MongoClient;

// Function starts here.
async function main() {

    // MongoDB client configuration.
    const uri = process.env['DATABASE_URL'];



    let client = new MongoClient(uri);
    console.log("made it here?");
    console.log(uri);
    // Instantiates a connection to the database and retrieves data from the `available-coffee` collection
    try {

        await client.connect();
        const contacts = await client.db("knowledge").collection("contacts").find().toArray();
        console.log(contacts);
        return {
            "body": contacts
        };
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem retrieving data." },
            "statusCode": 400
        };
    } finally {
        await client.close();
	}

}

// IMPORTANT: Makes the function available as a module in the project.
// This is required for any functions that require external dependencies.
module.exports.main = main;
