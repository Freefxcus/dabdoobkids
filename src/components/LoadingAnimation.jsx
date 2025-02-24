import * as React from "react";

import animationData from "../images/Teddy Bear.json";
import Lottie from "lottie-web";
const style = {
  width: 500,
  height: 500,
};

export default function LoadingAnimation() {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (animationData) {
      Lottie.loadAnimation({
        container: containerRef.current,
        ...defaultOptions,
      });
    }
  }, [animationData]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <div ref={containerRef} style={style}></div>;
}
