import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { cordovaSaveImageToGallery } from "../../utils/file_saver";

import { useState } from "react";
import { renderSuccess } from "../../utils/error";

const ImageLightBox = ({
  isOpen,
  withCaption,
  withCounter,
  isInfinite,
  onHide,
  slides,
  index,
}) => {
  const plugins = [Zoom, Download];
  if (withCaption) {
    plugins.push(Captions);
  }
  if (withCounter) {
    plugins.push(Counter);
  }

  const [isDownload, setIsDownload] = useState(false);
  const onDownload = async ({ index }) => {
    setIsDownload(true);
    const result = await cordovaSaveImageToGallery(slides[index].src);
    if (result) {
      renderSuccess("Сохранено");
    }
    setIsDownload(false);
  };

  return (
    <Lightbox
      styles={{
        toolbar: {
          opacity: isDownload ? 0.5 : 1,
          pointerEvents: isDownload ? "none" : "",
        },
      }}
      open={isOpen}
      close={onHide}
      slides={slides}
      plugins={plugins}
      index={index}
      zoom={{ maxZoomPixelRatio: 10 }}
      carousel={{ finite: !isInfinite }}
      on={{
        download: onDownload,
      }}
    />
  );
};

export default ImageLightBox;
