import merge from 'lodash/merge'

const RAY_SIZE = 1000

const spin = {
  animationName: 'spin',
  animationDuration: '40000ms',
  animationIterationCount: 'infinite',
  animationTimingFunction: 'linear',
  '@keyframes spin': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  }
}

export const rays = merge({}, spin, {
  background: 'url(../images/spinning_rays.png) 0 0 no-repeat',
  opacity: 0.1,
  position: 'absolute',
  backgroundSize: 'cover',
  top: '25%',
  left: '50%',
  marginLeft: RAY_SIZE * -0.5,
  marginTop: RAY_SIZE * -0.5,
  width: RAY_SIZE,
  height: RAY_SIZE,
  zIndex: 0,
  pointerEvents: 'none'
})
