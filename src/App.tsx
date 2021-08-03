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
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    netlifyIdentity.init();
    if (netlifyIdentity.currentUser()) {
      setAuthenticated(true)
      netlifyIdentity.close()
    }
    else netlifyIdentity.open()
    netlifyIdentity.on('login', () => {
      setAuthenticated(true);
    });
    netlifyIdentity.on('logout', () => {
      setAuthenticated(false);
    });
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
    <div className="w-full h-screen bg-gradient-to-b from-[#201F37] to-[#335575] text-white">
      { authenticated ?
        <AppContext.Provider value={{
          authenticated: true,
          session: 'August'
        }}>
          <QueryClientProvider client={queryClient}>
            <Members />
            <ReactQueryDevtools initialIsOpen={true} />
          </QueryClientProvider>
        </AppContext.Provider> :
        <>
          
        </>
      }
    </div>
  )
}