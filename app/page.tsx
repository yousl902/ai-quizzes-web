import ExampleComp from '../components/ExampleComp';


// When the user write example.com, this page will be displayed

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <ExampleComp />
    </div>
  );
}
