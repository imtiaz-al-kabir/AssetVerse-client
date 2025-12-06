import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
      <BeatLoader size={18} margin={4} />

      <h2 className="text-xl font-semibold mt-6 text-primary">
        Loading, please wait...
      </h2>
    </div>
  );
};

export default Loading;
