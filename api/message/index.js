module.exports = async function (context, req) {

    context.log(context.req.body);

    context.res.json({
        text: "Hello from the API"
    });
};

