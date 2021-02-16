import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components'
import Label from './label.js'
import Guidance from './guidance.js'

const READ_ONLY_GRAY = 'gray'

const InitialValidityState = {
  valid: true,
  customError: '',
  badInput: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
}

const Input = ({
  id,
  className,
  autoComplete,
  readOnly,
  required,
  minLength,
  label,
  type,
  placeholder,
  initialValue = '',
  handleValidation = (validityState, value) => [
   validityState.valid,
   validityState.valid
     ? ''
     : `${value} is invalid. No custom error messaging configured!`,
  ],
  handleSuggestions = value => '',
}) => {
  const [value, setValue] = useState(initialValue)
  const [errors, setErrors] = useState('')
  const [suggestions, setSuggestions] = useState('')
  const [valid, setValid] = useState(false)
  const [validityState, setValidityState] = useState(InitialValidityState)
  const [pristine, setPristine] = useState(true)
  const delay = 350

  useEffect(() => {
    if (initialValue && initialValue !== value) {
      setValue(initialValue)
    }
  }, [initialValue])

  const generateMessaging = () => {
    const [isValid, errors] = handleValidation(validityState, value)
    setValid(isValid)
    setErrors(`${errors}`)
    setSuggestions(handleSuggestions(value))
  }

  // generate errors and suggestions immediately when pristine toggles,
  // this will immediately notify if a user leaves a required field and hasn't entered anything: onBlur= { () => setPristine(false) }
  useLayoutEffect(generateMessaging, [pristine])

  // debounce setting pristine to false when value and validityState this makes for less aggressive messaging
  // when a user is in the middle of entering information and pausing for feedback
  useLayoutEffect(() => {
    const debounce = setTimeout(() => {
      if (value.length) {
        setPristine(false)
      }
    }, delay)

    return () => clearTimeout(debounce)
  }, [value, validityState])

  // debounce updating the errors and suggestions when value and validity state change
  // this is also less aggressive and visually noisy when a user has paused for feedback
  // and then is correcting mistakes in the field
  useLayoutEffect(() => {
    const debounce = setTimeout(generateMessaging, delay)
    return () => clearTimeout(debounce)
  }, [value, validityState])

  return (
    <Container className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <StyledInput
        id={id}
        name={id}
        autoComplete={autoComplete}
        className={pristine ? 'pristine' : ''}
        type={type}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        value={value}
        valid={valid}
        onBlur={e => {
          setPristine(false)
          setValidityState(e.target.validity)
        }}
        onChange={e => {
          setValue(e.target.value)
          setValidityState(e.target.validity)
        }}
        onInvalid={() => {
          if (validityState.customError) {
            setErrors(
              `${errors}${document.getElementById(id).validationMessage}`,
            )
          }
        }}
        minLength={minLength}
      />
      <Guidance pristine={pristine} errors={errors} suggestions={suggestions} />
    </Container>
  )
}

export default Input

const Container = styled.div`
  display: flex;
  flex: 1 0 0;
  flex-flow: column;
`

const StyledInput = styled.input`
  // overrides the accessibility background color of an input box... :/
  background-color: rgb(254, 254, 254);
  box-shadow: rgb(254, 254, 254) 0 0 0 30px inset;
  // ================================================================:/
  border: 3px solid #ececec;
  font-size: 14px;
  flex: 0 0 auto;
  height: 60px;
  padding: 20px 0 0 10px;
  width: 100%;
  :invalid:not(.pristine):not(:focus) {
    border-color: #c93c34;
  }
  :read-only {
    background: ${READ_ONLY_GRAY};
    box-shadow: none;
    cursor: not-allowed;
  }
`
