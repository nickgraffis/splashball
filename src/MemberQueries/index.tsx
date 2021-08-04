import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "react-query";
import { AppContext } from "../App";
import netlifyIdentity from 'netlify-identity-widget'
import axios from 'axios';
import { useMembers as useMembersImport } from './useMembers';
import { useUpdateMember as useUpdateMemberImport } from './useUpdateMember';

export const useMembers = useMembersImport;
export const useUpdateMember = useUpdateMemberImport;

export const useCreateMember = () => {
  const { session } = useContext(AppContext);
  const queryClient = useQueryClient()
  return useMutation(async (values: any) => {
      //@ts-ignore
      const token = await netlifyIdentity?.currentUser()?.jwt()
      return axios.post(
        `/api/create-member`,
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
    },
    {
      onMutate: async (newMember) => {
        await queryClient.cancelQueries(['members', session])
        const previousMembers = queryClient.getQueryData(['members', session])
        
        queryClient.setQueryData(['members', session], (old: any) => {
          return [...old, newMember]
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