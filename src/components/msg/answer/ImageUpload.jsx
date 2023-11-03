import { useRef, useState } from "react";
import EventsApi from "@/api/events";
import styled from "styled-components";
import { convertBase64 } from "@/utils/data";
import { useSounds } from "../../../hooks/useSounds";
import UploadProgress from "./UploadProgress";

const ImageUpload = ({ refresh }) => {
  const imageUploadRef = useRef();
  const { playSound } = useSounds();

  const openFiles = () => {
    imageUploadRef.current.click();
  };

  const skipFiles = () => {
    imageUploadRef.current.value = "";
  };

  const sendFile = async (e) => {
    const images = e.target.files;
    const promises = [];
    let i = 0;
    for (let img of images) {
      progressValues.current.push(0);
      promises.push(sendImage(img, i));
      i++;
    }
    await Promise.all(promises);

    playSound("SendMsg");
    setProgress(0);
    progressValues.current = [];
    skipFiles();
    refresh();
  };

  const sendImage = async (img, index) => {
    const base64Image = await convertBase64(img);
    await EventsApi.sendImage(base64Image, (e) => onProgress(e, index));
  };

  const [progress, setProgress] = useState(0);
  const progressValues = useRef([]);

  const onProgress = (e, i) => {
    const imagesNumber = imageUploadRef.current.files.length;
    const percent = (e.loaded / e.total) * 100;
    progressValues.current[i] = percent / imagesNumber;
    const newProgress = progressValues.current.reduce((acc, a) => acc + a, 0);
    setProgress(newProgress);
  };

  return (
    <StyledImageUpload>
      <button className="button simple" onClick={openFiles}>
        <img src="/icons/folder.png" />
      </button>

      <input
        ref={imageUploadRef}
        type="file"
        multiple
        accept="image/*"
        onChange={sendFile}
      />
      <UploadProgress value={progress} />
    </StyledImageUpload>
  );
};

export default ImageUpload;

const StyledImageUpload = styled.div`
  display: flex;

  input {
    display: none;
  }
`;
