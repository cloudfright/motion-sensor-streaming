module.exports = async function (context, req) {

    context.res.json({
        text: context.req.body
    });
};

