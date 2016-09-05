export const normalizedValue = (e) => typeof e === 'object' && !!e.target ? e.target.value : e

export const inputPropsHelper = ({
  form = {},
  onChange = () => {},
  onFocus = () => {},
  onBlur,
  focused,
  input
}) => ({
  value: form[input],
  name: input,
  hasFocus: focused === input,
  onChange: (e) => onChange(input, normalizedValue(e)),
  onFocus: () => onFocus(input),
  onBlur: onBlur || onFocus
})
