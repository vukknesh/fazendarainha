import { ReactComponent as LogoOriginalSvg } from "../assets/logooriginal.svg";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
      from {
        transform: rotate(0deg)
    
      }
      to{
        transform: rotate(360deg)
      }
    `;

const StyledSpinner = styled(LogoOriginalSvg)`
  animation: ${rotate} infinite 2s linear;
`;

export default StyledSpinner;
