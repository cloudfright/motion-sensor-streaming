
const storage = require('@azure/data-tables');
const client = TableClient.fromConnectionString(TABLE_STORAGE_CONNECTION_STRING, "motioncap");


module.exports = async function (context, req) {

    await client.createEntity(req.body);

    // Use { echoContent: true } if you want to return the created item including the Timestamp & etag
    tableService.insertEntity(tableName, item, { echoContent: true }, function (error, result, response) {
        if (!error) {
            // This returns a 201 code + the database response inside the body
            // Calling status like this will automatically trigger a context.done()
            context.res.status(201).json(response);
        } else {
            // In case of an error we return an appropriate status code and the error returned by the DB
            context.res.status(500).json({ error: error });
        }
    });
};

// https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tables/data-tables/MigrationGuide.md


// https://docs.microsoft.com/en-us/azure/storage/common/storage-samples-javascript#table-samples-v11

//https://docs.microsoft.com/en-us/javascript/api/overview/azure/data-tables-readme?view=azure-node-latest

// https://medium.com/medialesson/azure-functions-crud-with-table-storage-javascript-nodejs-9ce694dfcf76

