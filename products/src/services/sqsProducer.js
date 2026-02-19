const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const REGION = "ap-south-2";
const QUEUE_URL = "https://sqs.ap-south-2.amazonaws.com/395512255733/order-processing-queue";

const sqs = new SQSClient({ region: REGION });

async function sendToQueue(payload) {
  const command = new SendMessageCommand({
    QueueUrl: QUEUE_URL,
    MessageBody: JSON.stringify(payload),
  });

  const result = await sqs.send(command);
  console.log("Message sent to SQS:", result.MessageId);
}

module.exports = sendToQueue;
