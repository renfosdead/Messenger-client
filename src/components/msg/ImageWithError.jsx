import styled from "styled-components";
import ImageLightBox from "./ImageLightBox";
import { useState } from "react";

const ImageWithError = ({ data }) => {
  const [isImageOpen, setImageOpen] = useState(null);
  const [isError, setIsError] = useState(false);

  if (isError) {
    return (
      <StyledImageWithError className="error-image">
        <img src="/icons/noimage.png" />
        Картинка испорчена
      </StyledImageWithError>
    );
  }

  return (
    <StyledImageWithError className="message-text">
      <img
        src={data.body.image}
        onClick={() => setImageOpen(data.date)}
        onError={() => setIsError(true)}
      />

      <ImageLightBox
        isOpen={isImageOpen}
        onHide={() => setImageOpen(null)}
        slides={[
          {
            src: data.body.image,
          },
        ]}
      />
    </StyledImageWithError>
  );
};

export default ImageWithError;

const StyledImageWithError = styled.div`
  &.error-image {
    font-size: ${({ theme }) => theme.fontSizeSM};
    color: ${({ theme }) => theme.borderColor};
    img {
      height: ${({ theme }) => theme.buttonImageHeight};
      vertical-align: middle;
      margin-right: ${({ theme }) => theme.paddingST};
    }
  }
`;
