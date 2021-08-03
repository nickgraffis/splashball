import { useContext } from 'react';
import { useMutation, useQuery, useQueryClient, UseQueryResult } from "react-query";
import { AppContext } from "../App";
import netlifyIdentity from 'netlify-identity-widget'
import axios from 'axios';

export const useMembers = (): UseQueryResult<any, unknown> => {
  const { session } = useContext(AppContext);

  return useQuery(['members', session], async () => {
      //@ts-ignore
      const token = await netlifyIdentity?.currentUser()?.jwt()
      return axios.get(
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
    }
  );
};

export const useUpdateMember = (id: string) => {
  const { session } = useContext(AppContext);
  const queryClient = useQueryClient()
  return useMutation(async (values: any) => {
      //@ts-ignore
      const token = await netlifyIdentity?.currentUser()?.jwt()
      return axios.post(
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
    },
    {
      onMutate: async (newMember) => {
        await queryClient.cancelQueries(['members', session])
        const previousMembers = queryClient.getQueryData(['members', session])
        
        queryClient.setQueryData(['members', session], (old: any) => {
          old.find((member: any) => member.dbid === id).practices = newMember.practices
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