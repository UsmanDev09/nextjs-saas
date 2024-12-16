import type { ISvgProps } from '../types';

function LockIcon({
  viewBox = '0, 0, 12, 16',
  width = '24',
  height = '24',
  fill = 'currentColor',
  direction = 'up',
  ...rest
}:ISvgProps) {
  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      className={`
        ${fill}
        ${direction === 'up' ? '' : `rotate-${direction}`}
      `}
      {...rest}
    >
      <path
        d="M2.42188 15.8203C1.84896 15.8203 1.41146 15.6641 1.10938 15.3516C0.8125 15.0391 0.664062 14.5755 0.664062 13.9609V8.57812C0.664062 7.96354 0.8125 7.5026 1.10938 7.19531C1.41146 6.88281 1.84896 6.72656 2.42188 6.72656H9.57031C10.1432 6.72656 10.5781 6.88281 10.875 7.19531C11.1771 7.5026 11.3281 7.96354 11.3281 8.57812V13.9609C11.3281 14.5755 11.1771 15.0391 10.875 15.3516C10.5781 15.6641 10.1432 15.8203 9.57031 15.8203H2.42188ZM2.03125 7.32812V4.85938C2.03125 3.88021 2.21875 3.06771 2.59375 2.42188C2.97396 1.77604 3.46615 1.29427 4.07031 0.976562C4.67448 0.653646 5.3151 0.492188 5.99219 0.492188C6.67448 0.492188 7.31771 0.653646 7.92188 0.976562C8.52604 1.29427 9.01562 1.77604 9.39062 2.42188C9.77083 3.06771 9.96094 3.88021 9.96094 4.85938V7.32812H8.72656V4.6875C8.72656 4.03125 8.59896 3.47917 8.34375 3.03125C8.09375 2.58333 7.76042 2.24479 7.34375 2.01562C6.93229 1.78646 6.48177 1.67188 5.99219 1.67188C5.50781 1.67188 5.05729 1.78646 4.64062 2.01562C4.22917 2.24479 3.89844 2.58333 3.64844 3.03125C3.39844 3.47917 3.27344 4.03125 3.27344 4.6875V7.32812H2.03125Z"
      />
    </svg>
  );
}

export default LockIcon;
