import React, { FC, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Members } from './Components/Members';
import netlifyIdentity from 'netlify-identity-widget'

type Props = { }

type ContextProps = { 
  authenticated: boolean,
  session: string
};

export const AppContext = React.createContext<Partial<ContextProps>>({});

export const App: FC<Props> = () => {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
      }
    }
  })

  return (
    <AppContext.Provider value={{
      authenticated: true,
      session: 'August'
    }}>
      <QueryClientProvider client={queryClient}>
        <Members />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </AppContext.Provider>
  )
}