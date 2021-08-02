import { useContext } from 'react';
import { useQuery, UseQueryResult } from "react-query";
import { AppContext } from "../App";
import netlifyIdentity from 'netlify-identity-widget'
import axios from 'axios';

export const useMembers = (): UseQueryResult<any, unknown> => {
  const { session } = useContext(AppContext);
  
  return useQuery(['members', session], () => axios.get(
      `/api/members/${session}`,
      {
        headers: {
          //@ts-ignore
          Authorization: `Bearer ${netlifyIdentity?.currentUser()?.jwt()}`
        }
      }
    ).then((res) => {
      console.log(res);
      return res.data.records;
    })
  );
};