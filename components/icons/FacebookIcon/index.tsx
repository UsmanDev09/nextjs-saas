import React from 'react';
import { ISvgProps } from '../types';

function FacebookIcon({
  viewBox = '0 0 24 24',
  width = '24',
  height = '24',
  disabled = false,
  direction = 'up',
  className = '',
  ...rest
} : ISvgProps) {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      className={`${className} ${direction === 'down' ? 'rotate-180' : ''} ${
        disabled ? 'opacity-50' : ''
      }`}
      {...rest}
    >
      <g clipPath="url(#clip0_16251_104746)">
        <path
          d="M2.75891 14.4923C2.75891 15.4069 2.96009 16.1091 3.22297 16.5339C3.56769 17.0903 4.08172 17.326 4.60588 17.326C5.28191 17.326 5.90038 17.1586 7.09213 15.5135C8.04697 14.1949 9.17206 12.344 9.929 11.1836L11.211 9.21778C12.1016 7.85254 13.1323 6.33488 14.3142 5.30611C15.2788 4.46643 16.3196 4 17.3669 4C19.1255 4 20.8005 5.01708 22.0826 6.92463C23.4855 9.01371 24.1666 11.6451 24.1666 14.3606C24.1666 15.9749 23.8479 17.1611 23.3053 18.0982C22.7812 19.0045 21.7596 19.91 20.0412 19.91V17.326C21.5126 17.326 21.8798 15.9766 21.8798 14.4323C21.8798 12.2316 21.3657 9.78919 20.2332 8.04416C19.4293 6.80627 18.3878 6.04996 17.2419 6.04996C16.0025 6.04996 15.0051 6.98283 13.8842 8.64646C13.2883 9.5302 12.6765 10.6073 11.9897 11.8225L11.2335 13.1595C9.7145 15.8475 9.32975 16.4597 8.57028 17.4701C7.23903 19.2395 6.10241 19.91 4.60588 19.91C2.83072 19.91 1.70806 19.1427 1.01291 17.9866C0.445345 17.0445 0.166626 15.8084 0.166626 14.3998L2.75891 14.4923Z"
          fill="#0081FB"
        />
        <path
          d="M2.21057 7.10699C3.39913 5.27869 5.1142 4 7.08135 4C8.2207 4 9.3532 4.33656 10.5359 5.3003C11.8294 6.35397 13.2082 8.08908 14.9283 10.9488L15.5452 11.9749C17.034 14.4506 17.8812 15.7242 18.3769 16.3249C19.0146 17.0961 19.4611 17.326 20.0412 17.326C21.5126 17.326 21.8798 15.9766 21.8798 14.4323L24.1666 14.3606C24.1666 15.9749 23.8479 17.1611 23.3054 18.0982C22.7812 19.0045 21.7596 19.91 20.0412 19.91C18.9729 19.91 18.0265 19.6784 16.9799 18.693C16.1753 17.9367 15.2347 16.593 14.511 15.3852L12.3585 11.7967C11.2786 9.99579 10.2879 8.6531 9.7146 8.04491C9.09791 7.39106 8.30498 6.60136 7.03973 6.60136C6.0157 6.60136 5.14598 7.31864 4.4182 8.41563L2.21057 7.10699Z"
          fill="url(#paint0_linear_16251_104746)"
        />
        <path
          d="M7.03963 6.60136C6.01559 6.60136 5.14588 7.31864 4.41809 8.41563C3.38909 9.96585 2.75891 12.2748 2.75891 14.4923C2.75891 15.4069 2.96009 16.1091 3.22297 16.5339L1.01291 17.9866C0.445345 17.0445 0.166626 15.8084 0.166626 14.3998C0.166626 11.8383 0.871063 9.16866 2.21056 7.10699C3.39913 5.27869 5.11419 4 7.08135 4L7.03963 6.60136Z"
          fill="url(#paint1_linear_16251_104746)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_16251_104746"
          x1="306.917"
          y1="893.909"
          x2="1957.46"
          y2="977.435"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0064E1" />
          <stop offset="0.4" stopColor="#0064E1" />
          <stop offset="0.83" stopColor="#0073EE" />
          <stop offset="1" stopColor="#0082FB" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_16251_104746"
          x1="375.74"
          y1="1161.84"
          x2="375.74"
          y2="553.772"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0082FB" />
          <stop offset="1" stopColor="#0064E0" />
        </linearGradient>
        <clipPath id="clip0_16251_104746">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.166626)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default FacebookIcon;
