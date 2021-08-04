import axios from "axios";
import { useContext } from "react";
import { useQueryClient, useMutation } from "react-query";
import { AppContext } from "../App";
import netlifyIdentity from "netlify-identity-widget";
import { updateMemberSession } from "./utils";

export const useUpdateMember = (id: string) => {
  const { session } = useContext(AppContext);
  const queryClient = useQueryClient()
  return useMutation(async (values: any) => {
      //@ts-ignore
      const token = await netlifyIdentity?.currentUser()?.jwt()
      return updateMemberSession(token, values)
    },
    {
      onMutate: async (newMember) => {
        await queryClient.cancelQueries(['members', session])
        const previousMembers = queryClient.getQueryData(['members', session])
        
        queryClient.setQueryData(['members', session], (old: any) => {
          if (newMember.practices) old.find((member: any) => member.dbid === id).practices = newMember.practices
          if (newMember.team) old.find((member: any) => member.dbid === id).team = newMember.team
          if (newMember.name) old.find((member: any) => member.dbid === id).name = newMember.name
          if (newMember.caId) old.find((member: any) => member.dbid === id).id = newMember.caId
          if (newMember.status) old.find((member: any) => member.dbid === id).status = newMember.status
          return [...old]
        })

        return { previousMembers } 
      },
      onError: (err, _newMember, context: any) => {
        queryClient.setQueryData(['members', session], context.previousMembers)
      },
      onSettled: (member) => {
        queryClient.invalidateQueries(['members', session])
      }
    }
  );
}