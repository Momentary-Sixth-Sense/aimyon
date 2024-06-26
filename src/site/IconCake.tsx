/* eslint-disable max-len */

const INTRINSIC_WIDTH = 24;
const INTRINSIC_HEIGHT = 24;

export default function IconCake({
  width = INTRINSIC_WIDTH,
}: {
  width?: number
  includeTitle?: boolean
}) {
  return (
    <svg
      width={width}
      height={INTRINSIC_HEIGHT * width / INTRINSIC_WIDTH}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="2"/>
      <path d="M7.2 7.9 3 11v9c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9c0-2-3-6-7-8l-3.6 2.6"/>
      <path d="M16 13H3"/>
      <path d="M16 17H3"/>
    </svg>
  );
};