import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const AuthenticationRender = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Skeleton height={30} width={220} />
        </div>

        <div className="space-y-5">
          <Skeleton height={45} />
          <Skeleton height={45} />
          <Skeleton height={45} />
        </div>

        <div className="pt-6">
          <Skeleton height={50} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default AuthenticationRender;
