import React from 'react'
import Tooltip from '../../../atoms/Tooltip'
import Button from '../../../buttons/Button'

let TooltipExample = () => {
  const imgContent = (
    <div>
      <strong>Ol Billy Boy</strong>
      <img src="https://www.fillmurray.com/200/200" alt="Ol' Billy Boy" />
    </div>
  )

  return (
    <div>
      <h3 className="DemoPage__h3" id="FormRow">Tooltips</h3>

      <div className="DemoPage__content">
        <label>
          Sometimes you just need a hint <Tooltip content="I'll stay until you click away" />
        </label>
      </div>

      <div className="DemoPage__content">
        <Tooltip
          trigger="hover"
          style="light"
          position="center"
          content="I'll only stay visible while you hover.">
          <Button
            kind="cta"
            label="A component can also trigger a tooltip" />
        </Tooltip>
      </div>

      <div className="DemoPage__content">
        <p>Tooltips can contain rich content such as images as children. For example:</p>
        <Tooltip
          position="center"
          style="light"
          content={ imgContent }>
          <strong>Click to view an attractive human.</strong>
        </Tooltip>
      </div>

      <div className="DemoPage__content">
        <p>Tooltips come in both light and dark varities:</p>

        <Tooltip
          trigger="hover"
          style="dark"
          position="center"
          content="I'm a dark tooltip.">
          <Button
            kind="secondary"
            label="Hover to see a dark tooltip" />
        </Tooltip>

        <Tooltip
          trigger="hover"
          style="light"
          position="center"
          content="I'm a light tooltip.">
          <Button
            kind="secondary"
            label="Hover to see a light tooltip" />
        </Tooltip>
      </div>
    </div>
  )
}

TooltipExample.displayName = 'TooltipExample'

export default TooltipExample
