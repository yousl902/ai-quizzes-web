import React from 'react';

// Here we can import ShadCN components
// If we need any new shadcn components, we can download them using "npx shadcn@latest add name-of-component"
// After running tha command the component will be added to the components/ui folder


//import { Button } from '../components/ui/button';

const ExampleComp: React.FC = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-800">Example Component</h1>
      <p className="mt-2 text-gray-600">
        This is a template for a Next.js component using Tailwind CSS.
      </p>
      {/* <Button className="mt-4">Click me</Button> */}
    </div>
  );
};

export default ExampleComp;
