import { Handler } from '@netlify/functions';
import { Call, Client, Function } from 'faunadb';
const { FAUNADB_SERVER_SECRET } = process.env;

const handler: Handler = async (event, context) => {
  if (!FAUNADB_SERVER_SECRET) return {
    statusCode: 500,
    body: "Internal Server Error - No Fauna Client."
  }

  const user = context?.clientContext?.user

  if (!user) return {
    statusCode: 401,
    body: "You are unauthorized."
  }
  
  if (!event.body) return {
    statusCode: 400,
    body: "Missing body."
  }

  const { id, practices } = JSON.parse(event.body)
  const client = new Client({
    secret: FAUNADB_SERVER_SECRET,
  });
  
  const members = await client.query(
    Call(Function('UpdateMemberSession'), [id, { practices }])
  );

  console.log(members)

  return {
    statusCode: 200,
    body: JSON.stringify(members)
  }
}

module.exports = { handler }