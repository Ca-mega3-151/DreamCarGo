import { ReactNode, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
  title: ReactNode;
  description: ReactNode;
}

export const AuthLayout = ({ title, description }: Props) => {
  return (
    <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
      <div className="px-4 py-8 md:px-10 md:py-40">
        <Suspense fallback={null}>
          <div>
            <div className="mb-6 text-center">
              <img
                width={352}
                alt="Logo"
                className="inline-block w-full max-w-[352px]"
                src="/images/logo-vertical.png"
              />
            </div>
            <div className="mx-auto lg:max-w-[500px]">
              <Outlet />
            </div>
          </div>
        </Suspense>
      </div>
      <div className="relative hidden h-full flex-col items-center justify-center bg-yy-primary-bg p-8 md:flex">
        <div className="mb-4 lg:mb-8">
          <div className="mb-1 text-center font-medium text-yy-primary md:text-xl lg:text-2xl xl:text-4xl">{title}</div>
          <div className="text-center text-base lg:text-lg">{description}</div>
        </div>
        <img src="/images/welcome.png" className="w-full max-w-[500px]" alt="Welcome" width={500} />
        <div className="absolute bottom-10">© Powered by Lê Mạnh Tưởng</div>
      </div>
    </div>
  );
};
