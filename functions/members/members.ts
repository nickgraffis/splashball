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

  const params = event.queryStringParameters
  
  const client = new Client({
    secret: FAUNADB_SERVER_SECRET,
  });
  
  const members = await client.query(
    params?.session ? Call(Function('GetMembersOfSession'), params.session) : Call(Function('GetMembers'))
  );

  return {
    statusCode: 200,
    body: JSON.stringify(members)
  }
}

module.exports = { handler }
