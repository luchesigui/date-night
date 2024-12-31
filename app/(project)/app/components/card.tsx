import { HTMLAttributes, PropsWithChildren } from "react";

export const Card = ({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div
      role="button"
      className="rounded-lg p-10 bg-base-200 w-[300px] h-[420px] flex flex-col items-center justify-center bg-[#eb3b5a] outline outline-white outline-[1px] outline-offset-[-20px] text-white text-center"
      {...rest}
    >
      {children}
    </div>
  );
};
