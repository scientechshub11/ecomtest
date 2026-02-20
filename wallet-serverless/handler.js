const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE = process.env.WALLET_TABLE;

module.exports.createWallet = async (event) => {
  const body = JSON.parse(event.body || "{}");

  const item = {
    userId: body.userId || uuidv4(),
    balance: 0,
    createdAt: new Date().toISOString()
  };

  await dynamo.put({
    TableName: TABLE,
    Item: item
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(item)
  };
};

module.exports.creditWallet = async (event) => {
  const { userId, amount } = JSON.parse(event.body || "{}");

  const result = await dynamo.update({
    TableName: TABLE,
    Key: { userId },
    UpdateExpression: "SET balance = balance + :amt",
    ExpressionAttributeValues: {
      ":amt": Number(amount)
    },
    ReturnValues: "UPDATED_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ userId, ...result.Attributes })
  };
};

module.exports.debitWallet = async (event) => {
  const { userId, amount } = JSON.parse(event.body || "{}");

  const result = await dynamo.update({
    TableName: TABLE,
    Key: { userId },
    UpdateExpression: "SET balance = balance - :amt",
    ExpressionAttributeValues: {
      ":amt": Number(amount)
    },
    ReturnValues: "UPDATED_NEW"
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ userId, ...result.Attributes })
  };
};