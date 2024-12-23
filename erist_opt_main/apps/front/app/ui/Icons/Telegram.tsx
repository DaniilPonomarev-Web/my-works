import * as React from 'react';
import type { SVGProps } from 'react';
const SvgTelegram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="#fff"
    viewBox="0 0 50 50"
    {...props}
  >
    <path d="M25 2C12.31 2 2 12.31 2 25s10.31 23 23 23 23-10.31 23-23S37.69 2 25 2m0 2c11.61 0 21 9.39 21 21s-9.39 21-21 21S4 36.61 4 25 13.39 4 25 4m9.088 10.035c-.684 0-1.453.159-2.352.483-1.396.503-17.815 7.474-19.683 8.267-1.068.454-3.057 1.299-3.057 3.313 0 1.335.782 2.29 2.322 2.84.828.295 2.795.89 3.936 1.205.484.133.998.2 1.527.2 1.035 0 2.077-.257 2.893-.712q-.012.253.017.508c.123 1.05.77 2.037 1.73 2.642.629.396 5.758 3.833 6.524 4.38 1.076.768 2.266 1.175 3.438 1.175 2.24 0 2.991-2.313 3.353-3.424.525-1.613 2.491-14.73 2.713-17.043.151-1.585-.51-2.89-1.767-3.492a3.65 3.65 0 0 0-1.594-.342m0 2c.275 0 .52.046.728.147.473.227.714.733.641 1.498-.242 2.523-2.203 15.329-2.621 16.613-.358 1.098-.735 2.043-1.453 2.043s-1.503-.252-2.276-.805c-.773-.552-5.906-3.994-6.619-4.443-.625-.394-1.286-1.376-.355-2.326.767-.782 6.585-6.43 7.082-6.926.37-.371.197-.818-.166-.818-.125 0-.275.052-.43.18-.608.496-9.084 6.168-9.818 6.624-.486.302-1.239.52-2.02.52-.333 0-.67-.04-.994-.13-1.128-.31-3.037-.89-3.795-1.16-.729-.26-.994-.508-.994-.954 0-.634.895-1.072 1.838-1.473.996-.423 18.23-7.742 19.578-8.227.624-.226 1.195-.363 1.674-.363" />
  </svg>
);
export default SvgTelegram;