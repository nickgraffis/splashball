import { Handler } from '@netlify/functions';
import { Call, Client, Collection, Create, Function } from 'faunadb';
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

  const { name, id, emails, team } = JSON.parse(event.body)
  const client = new Client({
    secret: FAUNADB_SERVER_SECRET,
  });
  
  const member = await client.query(
    Create(
      Collection("members"),
      {
        data: {
          name, id,
          emails: emails ? emails.split(",") : [],
          ...(team) && { team }
        }
      }
    )
  );

  console.log(member)

  return {
    statusCode: 200,
    body: JSON.stringify(member)
  }
}

module.exports = { handler }
