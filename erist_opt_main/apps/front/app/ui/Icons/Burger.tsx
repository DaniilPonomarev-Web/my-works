import * as React from 'react';
import type { SVGProps } from 'react';
const SvgBurger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path stroke="#020202" strokeLinejoin="round" d="M2 8h12M2 4h12M2 12h12" />
  </svg>
);
export default SvgBurger;
