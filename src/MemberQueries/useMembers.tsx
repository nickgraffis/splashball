import axios from "axios";
import { useContext } from "react";
import { UseQueryResult, useQuery } from "react-query";
import { AppContext } from "../App";
import netlifyIdentity from "netlify-identity-widget";
import { getMembersBySession } from "./utils";

export const useMembers = (): UseQueryResult<any, unknown> => {
  const { session } = useContext(AppContext);

  return useQuery(['members', session], async () => {
      //@ts-ignore
      const token = await netlifyIdentity?.currentUser()?.jwt()
      return getMembersBySession(token, session)
    }
  );
};