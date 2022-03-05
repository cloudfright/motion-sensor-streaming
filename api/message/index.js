
const azureStorage = require('azure-storage');
const tableName = "motioncap";
const tableService = azure.createTableService();

module.exports = async function (context, req) {

    // Adding PartitionKey & RowKey as they are required for any data stored in Azure Table Storage
    const item = req.body;
    item.PartitionKey = data.person;
    item.RowKey = data.timestamp;

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


// https://docs.microsoft.com/en-us/azure/storage/common/storage-samples-javascript#table-samples-v11

//https://docs.microsoft.com/en-us/javascript/api/overview/azure/data-tables-readme?view=azure-node-latest

// https://medium.com/medialesson/azure-functions-crud-with-table-storage-javascript-nodejs-9ce694dfcf76

