import React from 'react'
import Transition from 'react-addons-css-transition-group'

const T = (children, name = 'fade', enter = 120, leave = 120) => (
  <Transition transitionName={ name } transitionEnterTimeout={ enter } transitionLeaveTimeout={ leave }>
    { children }
  </Transition>
)

export const SlideVertical = ({ children }) => T(children, 'slide', 480, 480)

export const Fade = ({ children }) => T(children, 'fade', 240, 240)
