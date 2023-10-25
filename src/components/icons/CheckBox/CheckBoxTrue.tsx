import React from 'react';

function CheckBoxTrue(): React.ReactElement {
   return (
      <svg
         width="27"
         height="27"
         viewBox="0 0 27 27"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
      >
         <g filter="url(#filter0_d_2722_8471)">
            <rect
               x="4"
               y="4"
               width="19"
               height="19"
               rx="5"
               fill="#9564D4"
               fill-opacity="0.1"
               shape-rendering="crispEdges"
            />
            <rect
               x="4.5"
               y="4.5"
               width="18"
               height="18"
               rx="4.5"
               stroke="#9564D4"
               shape-rendering="crispEdges"
            />
         </g>
         <path
            d="M9 13L12.5 16.5L19 10"
            stroke="#9564D4"
            stroke-linecap="round"
            stroke-linejoin="round"
         />
         <defs>
            <filter
               id="filter0_d_2722_8471"
               x="0"
               y="0"
               width="27"
               height="27"
               filterUnits="userSpaceOnUse"
               color-interpolation-filters="sRGB"
            >
               <feFlood flood-opacity="0" result="BackgroundImageFix" />
               <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
               />
               <feOffset />
               <feGaussianBlur stdDeviation="2" />
               <feComposite in2="hardAlpha" operator="out" />
               <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.585412 0 0 0 0 0.392157 0 0 0 0 0.831373 0 0 0 0.4 0"
               />
               <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2722_8471"
               />
               <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2722_8471"
                  result="shape"
               />
            </filter>
         </defs>
      </svg>
   );
}

export default CheckBoxTrue;
