import ClipLoader from "react-spinners/ClipLoader";

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <ClipLoader size={14} color="#ffffff" className="mr-2" />
      </div>
    </div>
  );
}

export default LoadingFallback;
