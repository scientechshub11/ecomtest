const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
// const { v4: uuidv4 } = require("uuid");


const client = new DynamoDBClient({ region: "ap-south-2" });
const dynamo = DynamoDBDocumentClient.from(client);
const TABLE = process.env.WALLET_TABLE;

module.exports.createWallet = async (event) => {
  const body = JSON.parse(event.body || "{}");

  const item = {
    userId: body.userId || '123546446564##$$$',
    balance: 0,
    createdAt: new Date().toISOString()
  };

  await dynamo.send(
    new PutCommand({
      TableName: TABLE,
      Item: item
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify(item)
  };
};

module.exports.creditWallet = async (event) => {
  const { userId, amount } = JSON.parse(event.body || "{}");

  const result = await dynamo.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { userId },
      UpdateExpression: "SET balance = balance + :amt",
      ExpressionAttributeValues: {
        ":amt": Number(amount)
      },
      ReturnValues: "UPDATED_NEW"
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ userId, ...result.Attributes })
  };
};

module.exports.debitWallet = async (event) => {
  const { userId, amount } = JSON.parse(event.body || "{}");

  const result = await dynamo.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { userId },
      UpdateExpression: "SET balance = balance - :amt",
      ExpressionAttributeValues: {
        ":amt": Number(amount)
      },
      ReturnValues: "UPDATED_NEW"
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ userId, ...result.Attributes })
  };
};