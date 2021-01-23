import styled, { css } from 'styled-components'

const RequiredStarAfter = css`
  &:after {
    content: '*';
    color: #de1616;
    font-size: 10px;
    margin-left: 2px;
  }
`

const StyledLabel = styled.label`
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.2px;
  margin: 8px 12px;
  position: ${props => (props.position ? props.position : 'absolute')};
  text-transform: uppercase;

  ${props => (props.required ? RequiredStarAfter : null)}
`

export default StyledLabel
