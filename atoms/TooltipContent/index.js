import React, { PropTypes } from 'react'
import classNames from 'classnames'

let TooltipContent = ({ style, position, content, open }) => {
  const classes = classNames({
    'hui-TooltipContent': true,
    'hui-TooltipContent--open': open,
    'hui-TooltipContent--light': style === 'light',
    'hui-TooltipContent--dark': style === 'dark',
    'hui-TooltipContent--left': position === 'left',
    'hui-TooltipContent--center': position === 'center',
    'hui-TooltipContent--right': position === 'right'
  })

  return (
    <div className={ classes }>
      <div className="hui-TooltipContent__content">
        { content }
      </div>
    </div>
  )
}

TooltipContent.displayName = 'TooltipContent'
TooltipContent.propTypes = {
  open: PropTypes.bool.isRequired,
  style: PropTypes.oneOf(['light', 'dark']).isRequired,
  position: PropTypes.oneOf(['left', 'right', 'center']).isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node
  ]).isRequired
}

export default TooltipContent
