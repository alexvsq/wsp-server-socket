const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


const auth = () => {
    const client = new Client({
        authStrategy: new LocalAuth({
            dataPath: 'user'
        })
    });

    return client;
}

module.exports = {
    auth: auth
};


/*  const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'user'
    })
}); */

/* client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.initialize();

// Listening to all incoming messages
client.on('message_create', message => {
    console.log(message);

});
 */
