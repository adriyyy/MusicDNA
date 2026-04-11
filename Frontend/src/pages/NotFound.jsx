import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white bg-gradient-to-b from-black to-gray-900 px-6 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>

      <p className="text-xl text-gray-300 mb-6">
        Ups... pagina pe care o cauți nu există.
      </p>

      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-semibold"
      >
        Înapoi la Acasă
      </Link>
    </div>
  );
};

export default NotFound;
