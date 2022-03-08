import { QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router-dom';
import { getClient } from './queryClient';
import { routes } from './routes';
import { ReactQueryDevtools } from 'react-query/devtools';
import Gnb from './components/Gnb';

function App() {
  const element = useRoutes(routes);
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Gnb />
      {element}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
