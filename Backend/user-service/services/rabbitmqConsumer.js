const amqp = require('amqplib');
const User = require('../models/User');

async function consumeUserRequests() {
  const connection = await amqp.connect('amqp://backend-rabbitmq-1:5672');
  const channel = await connection.createChannel();
  const requestQueue = 'userRequestQueue';
  const responseQueue = 'userResponseQueue';

  await channel.assertQueue(requestQueue, { durable: true });
  await channel.assertQueue(responseQueue, { durable: true });

  channel.consume(requestQueue, async (msg) => {
    const { userId } = JSON.parse(msg.content.toString());

     // Log the userId for debugging
     console.log('\n\n\n\n\n\n\n\n Received userId:', userId);
    
    try {
      const user = await User.findById(userId).select('name'); // Only select the name field
      if (user) {
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ name: user.name })), {
          correlationId: msg.properties.correlationId
        });
      } else {
        // Handle case where user is not found
        channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ error: 'User not found' })), {
          correlationId: msg.properties.correlationId
        });
      }
    } catch (error) {
      // Handle any errors that occurred during the database operation
      console.error('Error fetching user:', error);
      channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify({ error: 'Error fetching user' })), {
        correlationId: msg.properties.correlationId
      });
    }

    channel.ack(msg);
  }, { noAck: false });
}

module.exports = consumeUserRequests;
