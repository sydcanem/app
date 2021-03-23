import React from 'react';
import { Cart } from './screens/Cart';

function App() {
  return (
    <div className="h-screen bg-gray-300">
      <div className="py-12">
        <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
          <div className="md:flex ">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
