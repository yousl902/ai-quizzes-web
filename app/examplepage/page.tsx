import React from 'react';
import ExampleComp from '../../components/ExampleComp';

// When the user write example.com/examplepage (the name of the folder), this page page will be displayed

const ExampleRoutePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ExampleComp />
    </div>
  );
};

export default ExampleRoutePage;