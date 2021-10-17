import * as React from 'react';
import Menu from 'Common/Menu/Components/Menu';
import {QueryClientProvider, QueryClient} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import {AuthProvider} from '../../Modules/Authorisation/Auth';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }
);

/**
 * Главный компонент приложения.
 */
function Main() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ReactQueryDevtools initialIsOpen={false} />
                <Menu />
                <h1>Большая вкуснаz</h1>
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default Main;
