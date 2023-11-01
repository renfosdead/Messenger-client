import { getDateFormatted } from "@/utils/date_time";
import { useImages } from "@/hooks/useImages";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import ImageLightBox from "./msg/ImageLightBox";
import styled from "styled-components";

const ImagesViewer = ({ isOpen, toggle, events }) => {
  const themeContext = useContext(ThemeContext);
  const { slide, setSlide, images } = useImages(events);

  if (!isOpen) return null;

  const slides = images.map((img) => {
    return {
      src: img.body.image,
      description: getDateFormatted(img.date),
    };
  });

  const size = `calc(${window.innerWidth / 3}px - ${
    themeContext.paddingST
  } / 3 -  ${themeContext.paddingST} - 3 * ${themeContext.borderWidth})`;

  return (
    <StyledImagesViewer>
      <button className="close-btn" onClick={() => toggle(false)}>
        <div>X</div>
      </button>
      <div className="images-wrapper">
        {images.map((img, i) => (
          <div
            key={`img${i}`}
            className="image-wrapper"
            onClick={() => setSlide(i)}
            style={{
              width: size,
              height: size,
            }}
          >
            <img src={img.body.image} />
          </div>
        ))}
      </div>
      <ImageLightBox
        isOpen={slide !== -1}
        onHide={() => setSlide(-1)}
        slides={slides}
        index={slide}
        withCaption={true}
        withCounter={true}
        isInfinite={true}
      />
    </StyledImagesViewer>
  );
};

export default ImagesViewer;

const StyledImagesViewer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: ${({ theme }) => theme.buttonHeight};
  z-index: 10;
  border: ${({ theme }) => theme.borderWidth} solid
    ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.backgroundColor};

  .close-btn {
    position: absolute;
    right: 0;
    top: ${({ theme }) => theme.paddingST};
    width: ${({ theme }) => theme.buttonHeight};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .images-wrapper {
    position: absolute;
    top: ${({ theme }) => theme.buttonImageHeight};
    bottom: 0;
    overflow-y: auto;
    padding: ${({ theme }) => theme.paddingST};
    padding-right: 0;
    padding-top: 0;
    .image-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
      margin-top: ${({ theme }) => theme.paddingST};
      margin-right: ${({ theme }) => theme.paddingST};
      border: ${({ theme }) => theme.borderWidth} solid
        ${({ theme }) => theme.borderColor};
      border-radius: ${({ theme }) => theme.borderRadius};
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
`;
