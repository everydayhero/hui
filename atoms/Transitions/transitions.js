export const revealVertical = {
  enter: {
    animation: { maxHeight: 300 },
    style: { overflow: 'hidden' },
    easing: 'ease-in',
    duration: 480
  },
  leave: {
    animation: { maxHeight: 0 },
    style: { overflow: 'hidden' },
    easing: 'ease-out',
    duration: 480
  }
}

export const fade = {
  enter: {
    animation: { opacity: 1 },
    easing: 'ease-in',
    duration: 180
  },
  leave: {
    animation: { opacity: 0 },
    easing: 'ease-out',
    duration: 180
  }
}
