import axios from 'axios';

export const getMembersBySession = (token: string, session: string | undefined) => axios.get(
  `/api/members?session=${session}`,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
).then((res) => {
  console.log(res);
  return res.data.data;
}).catch(err => console.log(err))

export const updateMemberSession = (token: string, values: any) => axios.post(
  `/api/mark-present`,
  values,
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
).then((res) => {
  console.log(res);
  return res.data.data;
}).catch(err => {
  console.log(err)
  return err
})