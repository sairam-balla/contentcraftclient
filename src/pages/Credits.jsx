import { useSelector } from "react-redux";

const Credits = () => {
  const { userDetails } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen overflow-auto flex justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-5xl p-4 sm:p-6 text-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Your Credits
        </h1>

        <p className="text-4xl sm:text-5xl font-extrabold text-green-500">
          {userDetails?.credits}
        </p>
        <p className="text-gray-500 mt-2 mb-6 text-sm sm:text-base">
          Available Credits
        </p>

        <h2 className="text-lg sm:text-2xl font-bold text-left mb-2">
          Credit Transactions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border text-sm sm:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">S.No</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Type</th>
                <th className="border px-2 py-1">Purpose</th>
                <th className="border px-2 py-1">Points</th>
              </tr>
            </thead>
            <tbody>
              {userDetails?.transactions?.map((each, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{each.date}</td>
                  <td className="border px-2 py-1">{each.type}</td>
                  <td className="border px-2 py-1">{each.purpose}</td>
                  <td className="border px-2 py-1">{each.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Credits;
