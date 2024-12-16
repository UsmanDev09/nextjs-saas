import type { SvgIconProps } from '@mui/material/SvgIcon';

export interface ISvgProps extends SvgIconProps {
  direction?: 'up' | 'down' | 'left' | 'right';
  disabled?: boolean;
  unselect?: boolean;
  newUpdate?: boolean;
}
