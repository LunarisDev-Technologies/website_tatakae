'use client';

export default function HaikeiBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none" aria-hidden="true">
      {/* Top right organic blob */}
      <svg
        className="absolute -top-32 -right-32 w-[650px] h-[650px] transition-transform duration-1000 ease-out"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M685 190.5C738 274.5 738.5 391 704 496.5C669.5 602 600 696.5 504 742C408 787.5 285.5 784 190 730.5C94.5 677 26 573.5 9 467C-8 360.5 26.5 251 101.5 174C176.5 97 292 52.5 407.5 48.5C523 44.5 632 106.5 685 190.5Z"
          fill="url(#paint0_radial)"
        />
        <defs>
          <radialGradient
            id="paint0_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(393.5 410) rotate(90) scale(374.5 393.5)"
          >
            <stop stopColor="#080B72" stopOpacity="0.12" />
            <stop offset="0.6" stopColor="#05062F" stopOpacity="0.04" />
            <stop offset="1" stopColor="#F7F7F5" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Mid-left organic wave */}
      <svg
        className="absolute top-[45%] -left-48 w-[750px] h-[750px]"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M725.5 212C787 298.5 793.5 423 752.5 530.5C711.5 638 623 728.5 517.5 765C412 801.5 289.5 784 189 725C88.5 666 10 565.5 1 459C-8 352.5 52.5 240 142 163.5C231.5 87 350 46.5 466.5 49.5C583 52.5 664 125.5 725.5 212Z"
          fill="url(#paint1_radial)"
        />
        <defs>
          <radialGradient
            id="paint1_radial"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(397 416) rotate(90) scale(369 397)"
          >
            <stop stopColor="#080B72" stopOpacity="0.08" />
            <stop offset="0.8" stopColor="#05062F" stopOpacity="0.02" />
            <stop offset="1" stopColor="#F7F7F5" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

