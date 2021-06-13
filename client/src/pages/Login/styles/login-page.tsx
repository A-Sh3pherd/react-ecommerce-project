import styled from 'styled-components';
import {Col, Container, Row} from "react-bootstrap";


// Container
export const SContainer = styled(Container)`
  height: 100vh;
  background: radial-gradient(50% 50% at 50% 50%, #CDCDCD 0%, #737373 100%) no-repeat;
  object-fit: cover;
`

// Row
export const SRow = styled(Row)`
  display: flex;
  align-items: center;
`

// Column
export const SCol = styled(Col)`
  align-items: center;
`