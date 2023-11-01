import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const ImageLightBox = ({
  isOpen,
  withCaption,
  withCounter,
  isInfinite,
  onHide,
  slides,
  index,
}) => {
  const plugins = [Zoom];
  if (withCaption) {
    plugins.push(Captions);
  }
  if (withCounter) {
    plugins.push(Counter);
  }

  return (
    <Lightbox
      open={isOpen}
      close={onHide}
      slides={slides}
      plugins={plugins}
      index={index}
      zoom={{ maxZoomPixelRatio: 10 }}
      carousel={{ finite: !isInfinite }}
    />
  );
};

export default ImageLightBox;
