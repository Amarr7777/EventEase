const amqp = require('amqplib');

async function requestUser(userId) {
  let connection;
  let channel;

  try {
    connection = await amqp.connect('amqp://backend-rabbitmq-1:5672');
    channel = await connection.createChannel();
    const requestQueue = 'userRequestQueue';
    const responseQueue = 'userResponseQueue';

    await channel.assertQueue(requestQueue, { durable: true });
    await channel.assertQueue(responseQueue, { durable: true });

    const correlationId = generateUuid();

    // Send the request to the queue
    channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify({ userId })), {
      correlationId,
      replyTo: responseQueue
    });

    return new Promise((resolve, reject) => {
      const handleResponse = (msg) => {
        if (msg.properties.correlationId === correlationId) {
          const response = JSON.parse(msg.content.toString());
          if (response.error) {
            reject(new Error(response.error));
          } else if (response.name) {
            resolve(response);
          } else {
            reject(new Error('Unexpected response format'));
          }
          channel.ack(msg);
          // channel.close();
          // connection.close();
        }
      };

      channel.consume(responseQueue, handleResponse, { noAck: false });

      setTimeout(() => {
        reject(new Error('Request timed out'));
        channel.close();
        connection.close();
      }, 5000); // 5 seconds timeout
    });
  } catch (error) {
    console.error('Error in requestUser:', error.message);
    if (channel) await channel.close();
    if (connection) await connection.close();
    throw new Error(`RequestUser failed: ${error.message}`);
  }
}

function generateUuid() {
  return Math.random().toString() + Math.random().toString() + Math.random().toString();
}

module.exports = requestUser;
