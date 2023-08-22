import {useState, forwardRef, useImperativeHandle} from 'react'
import {Button} from 'react-bootstrap'

const Toggle = forwardRef((props, references) => {
  const [visible, setVisible] = useState(false)

  const hideIfVisible = {display: visible ? 'none' : ''}
  const showIfVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(references, () => {
    return {
        toggleVisibility
    }
  })

  return (
    <div style={{paddingBottom: 10}}>
      <div style={hideIfVisible}>
        <Button onClick={toggleVisibility}>{props.label}</Button>
      </div>
      <div style={showIfVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </div>
  )
})

export default Toggle