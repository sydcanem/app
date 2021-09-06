import { useEffect } from 'react';
import { Loader } from './components/Loader';
import { authStore } from './stores/auth';
import { Cart } from './screens/Cart';

// Protected App
function App() {
  const { isAuthenticated, isLoading, initialized, initStore } = authStore();
  
  useEffect(() => {
    if (!initialized) {
      initStore({ redirectOnDeny: '/login' });
    }
  }, [initialized]);

  if (isLoading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return null;
  }

  return(
    <div className="h-screen bg-gray-300">
      <div className="py-12">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
          <div className="md:flex ">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
