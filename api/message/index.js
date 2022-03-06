
module.exports = async function (context, req) {

    context.bindings.tableBinding = [];
    context.bindings.tableBinding.push(req.body);
};

// https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/tables/data-tables/MigrationGuide.md


// https://docs.microsoft.com/en-us/azure/storage/common/storage-samples-javascript#table-samples-v11

//https://docs.microsoft.com/en-us/javascript/api/overview/azure/data-tables-readme?view=azure-node-latest

// https://medium.com/medialesson/azure-functions-crud-with-table-storage-javascript-nodejs-9ce694dfcf76

