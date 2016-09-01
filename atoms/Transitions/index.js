import React from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import { revealVertical, fade } from './transitions'

const T = (children, transition) => (
  <VelocityTransitionGroup { ...transition }>
    { children }
  </VelocityTransitionGroup>
)

export const SlideVertical = ({ children }) => T(children, revealVertical)

export const Fade = ({ children }) => T(children, fade)
