exports.handler = async function(event, context) {
    // your server-side functionality
    return {
        statusCode: 200,
        body: JSON.stringify({
            name: 'ghkdsigm',
            age: 55,
            email: 'ghkdsigm3@gmail.com'
        })
    }
}