import { useRef, useState } from "react";
import EventsApi from "@/api/events";
import styled from "styled-components";
import { convertBase64 } from "@/utils/data";

const ImageUpload = () => {
  const imageUploadRef = useRef();

  const openFiles = () => {
    imageUploadRef.current.click();
  };

  const skipFiles = () => {
    imageUploadRef.current.value = "";
  };

  const sendFile = async (e) => {
    const image = e.target.files[0];
    const base64Image = await convertBase64(image);
    EventsApi.sendImage(base64Image, onProgress);
  };

  const [progress, setProgress] = useState(0);
  const onProgress = (e) => {
    const percent = (e.loaded / e.total) * 100;
    setProgress(percent);
    if (percent === 100) {
      setProgress(0);
      skipFiles();
    }
  };

  return (
    <StyledImageUpload>
      <button className="button simple" onClick={openFiles}>
        <img src="/icons/folder.png" />
      </button>

      <input
        ref={imageUploadRef}
        type="file"
        accept="image/*"
        onChange={sendFile}
      />
      {progress ? (
        <div className="progress">
          <div style={{ width: `${progress}%` }}></div>
        </div>
      ) : null}
    </StyledImageUpload>
  );
};

export default ImageUpload;

const StyledImageUpload = styled.div`
  display: flex;

  input {
    display: none;
  }

  .progress {
    display: flex;
    align-items: center;
    width: calc(100vw - 3 * ${({ theme }) => theme.buttonHeight});
    > div {
      height: ${({ theme }) => theme.buttonImageHeight};
      border: ${({ theme }) => theme.borderWidth} solid
        ${({ theme }) => theme.borderColor};
      border-radius: ${({ theme }) => theme.borderRadius};
      background-color: ${({ theme }) => theme.borderColor};
    }
  }
`;
