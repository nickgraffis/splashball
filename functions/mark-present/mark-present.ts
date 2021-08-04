import { Handler } from '@netlify/functions';
import { Call, Client, Collection, Create, Function, Ref, Update } from 'faunadb';
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

  const { id, practices, member, name, team, status, caId } = JSON.parse(event.body)
  const client = new Client({
    secret: FAUNADB_SERVER_SECRET,
  });

  let members; 
  let rawMembers;
  if ((name || caId) && member) {
    rawMembers = await client.query(
      Update(Ref(Collection("members"), member), {
        data: {
          ...(name) && { name },
          ...(team) && { team },
          ...(caId) && { id: caId },
        }
      })
    )
  }

  if (member && !id) {
      members = await client.query(
        Create(
          Collection("session_members"),
          {
            data: {
              member: Ref(Collection("members"), member),
              practices: practices || [],
              team: team || "",
              name,
              status: status || ""
            }
          }
        )
      );
  } else if ((!member && !practices) || (member && id)) {
      members = await client.query(
        Update(Ref(Collection("session_members"), id), {
          data: {
            ...(status) && { status },
            ...(team) && { team }
          }
        })
      )    
  } else {
      members = await client.query(
        Call(Function('UpdateMemberSession'), [id, { practices }])
    );
  }


  console.log(members)

  return {
    statusCode: 200,
    body: JSON.stringify(members)
  }
}

module.exports = { handler }