import type { SVGProps } from "react";

export function VercelIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={256}
      height={222}
      viewBox="0 0 256 222"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="m128 0l128 221.705H0z"></path>
    </svg>
  );
}
