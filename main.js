window.utils = {
  glitchInterval: "",
  randomRange: (max, min) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  createSVGElement: (svgBoundX, svgBoundY, svgClass) => {
    var svgParams = {
      viewBox: "0 0 " + svgBoundX + " " + svgBoundY,
      class: svgClass,
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      x: 0,
      y: 0,
      width: "100%",
      height: "100%",
      preserveAspectRatio: "xMinYMin",
    };

    return svgParams;
  },
  initGlitchBorder: (element, maximumWidth, position) => {
    let boxWidth = maximumWidth,
      rectMaxHeight = 15,
      rectMaxWidth = parseInt(boxWidth * 0.04),
      svgBoundX = boxWidth,
      svgBoundY = 40;

    const generateRectBorder = (maxWidth, w, svgObj) => {
        if (w >= maxWidth) return svgObj;

        const rectWidth = utils.randomRange(rectMaxWidth, 1),
          rectHeight = utils.randomRange(rectMaxHeight, 1),
          rectX = parseInt(w) + parseInt(rectWidth);

        svgObj.rect({
          width: rectWidth,
          height: rectHeight,
          x: rectX,
          y: 0,
          fill: "#181818",
        });

        generateRectBorder(maxWidth, rectX, svgObj);
      },
      getSvgParams = (position) => {
        return {
          viewBox: "0 0 " + svgBoundX + " " + svgBoundY,
          class: `glitch-border-${position}`,
          xmlns: "http://www.w3.org/2000/svg",
          version: "1.1",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
          width: "100%",
          height: "100%",
          preserveAspectRatio: "xMinYMin",
        };
      };

    switch (position) {
      case "top":
      case "bottom":
        let svgDiv = SVG().attr(getSvgParams(position)).addTo(`#${element}`);

        generateRectBorder(boxWidth, 0, svgDiv);
        break;
      default:
        break;
    }
  },
  isInViewport: (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  clearBorderGlitchInterval: () => {
    clearInterval(glitchInterval);
  },
  initBorderGlitch: (ele) => {
    glitchInterval = setInterval(() => {
      const element = document.getElementById(ele),
        width = element.getBoundingClientRect().width;

      element.innerHTML = "";

      window.utils.initGlitchBorder(ele, width, "top");
      window.utils.initGlitchBorder(ele, width, "bottom");
    }, 2000);

    return glitchInterval;
  },
};
