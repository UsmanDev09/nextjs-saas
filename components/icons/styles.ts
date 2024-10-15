const styles = {
  root: {
    fill: 'none',
    width: 'auto',
    height: 'auto',
  },
  up: {
    transform: 'rotate(0deg)',
  },
  right: {
    transform: 'rotate(90deg)',
  },
  down: {
    transform: 'rotate(180deg)',
  },
  left: {
    transform: 'rotate(270deg)',
  },
  mixBlend: {
    mixBlendMode: 'multiply',
  },
  tooltip: {
    display: 'flex',
    width: 'auto',
    padding: '12px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '8px',
    background: 'var(--White, #FFF)',
    color: '#3D3D3D',
    textAlign: 'center',
    fontSize: '10px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '16px',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.16)',
  },
  arrow: {
    '&:before': {
      background: 'var(--White, #FFF)',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.16)',
      borderRadius: '3px',
    },
    fontSize: '20px',
  },
} as const;
export default styles;
