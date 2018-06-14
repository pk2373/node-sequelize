module.exports = {
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify: () => {
        return async (ctx, next) => {
            console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);
            ctx.rest = (data) => {
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    data: data,
                    code: 'ok',
                };
            }
            try {
                await next();
            } catch (e) {
                console.log('Process API error...');
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    code: e.code || 'internal:unknown_error',
                    message: e.message || ''
                };
            }
        }
    }
};