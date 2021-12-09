const navBar = document.getElementById("nav");
const main = document.getElementById("main");

window.utils.initBorderGlitch("glitch-border-wrap");

window.onload = () => {
  const initHome = () => {
      gsap.to(".slide", {
        visibility: "hidden",
        opacity: 0,
      });
      gsap.to(".slide.right-wrap .home-img", {
        visibility: "hidden",
        opacity: 0,
        x: -300,
      });
      gsap.to(".slide.left-wrap .home-img", {
        visibility: "hidden",
        opacity: 0,
        x: 300,
      });
      gsap.to(".slide.right-wrap .projListTextWrap", {
        visibility: "hidden",
        opacity: 0,
        x: 300,
      });
      gsap.to(".slide.left-wrap .projListTextWrap", {
        visibility: "hidden",
        opacity: 0,
        x: -300,
      });
      gsap.to(".slide.right-wrap .project-big-num", {
        visibility: "hidden",
        opacity: 0,
        x: -300,
      });
      gsap.to(".slide.left-wrap .project-big-num", {
        visibility: "hidden",
        opacity: 0,
        x: 300,
      });
      gsap
        .timeline()
        .to(".heroHead, .logo", {
          visibility: "visible",
          opacity: 1,
          delay: 0.5,
          duration: 0.3,
        })
        .to(".homeHR", {
          visibility: "visible",
          opacity: 1,
          duration: 0,
        })
        .to(".projectNav, .homeViewAllProjs", {
          visibility: "visible",
          opacity: 1,
          duration: 0.2,
          y: 0,
        })
        .to(".toggleNav", {
          visibility: "visible",
          opacity: 1,
          duration: 0.2,
          y: 0,
        })
        .to("#videoURL0", {
          visibility: "visible",
          opacity: 1,
          duration: 0.2,
        });
      gsap.fromTo(
        "#home",
        {
          visibility: "hidden",
          opacity: 0,
        },
        {
          visibility: "visible",
          opacity: 1,
        }
      );
    },
    navCurtainAnimation = () => {
      gsap
        .timeline()
        .to("#curLeft", {
          scaleX: 1,
          ease: Power4.easeIn,
          duration: 0.3,
        })
        .to("#curLeft", {
          scaleX: 0,
          transformOrigin: "left center",
          delay: 0.3,
          ease: Power4.easeIn,
          duration: 0.3,
        });

      gsap
        .timeline()
        .to("#curRight", {
          scaleX: 1,
          ease: Power4.easeIn,
          duration: 0.3,
        })
        .to("#curRight", {
          scaleX: 0,
          transformOrigin: "right center",
          delay: 0.3,
          ease: Power4.easeIn,
          duration: 0.3,
        });
    },
    navigateRouteClick = (element) => {
      let destination = element.getAttribute("href");
      let destBorderId = document
        .querySelector(`${destination} .glitch-border-wrap`)
        .getAttribute("id");
      let activeNav = document.querySelector(".projectNav-link.active");
      let activeId, outFigureX, outTextX;

      if (activeNav && activeNav.getAttribute("href") === destination)
        return false;

      window.utils.initBorderGlitch(destBorderId);
      element.classList.add("active");

      if (activeNav) {
        activeId = activeNav.getAttribute("href");
        activeNav.classList.remove("active");

        if (document.querySelector(activeId).classList.contains("right-wrap")) {
          outFigureX = -300;
          outTextX = 300;
        } else {
          outFigureX = 300;
          outTextX = -300;
        }

        gsap
          .timeline()
          .to(`${activeId} .home-img`, {
            visibility: "inherit",
            opacity: 0,
            x: outFigureX,
            ease: "power4.out",
            duration: 0.3,
          })
          .to(`${activeId} .projListTextWrap`, {
            visibility: "inherit",
            opacity: 0,
            x: outTextX,
            ease: "power4.out",
            duration: 0.3,
          })
          .to(`${activeId} .project-big-num`, {
            visibility: "inherit",
            opacity: 0,
            x: outFigureX,
            ease: "power4.out",
            duration: 0.3,
          });
      } else {
        activeId = "#home";
      }

      gsap.to(".logo", {
        visibility: "hidden",
        opacity: 0,
      });

      gsap
        .timeline()
        .to(activeId, {
          visibility: "hidden",
          opacity: 0,
          duration: 0.1,
          delay: 0.5,
        })
        .to(destination, {
          visibility: "visible",
          opacity: 1,
        })
        .to(`${destination} .home-img`, {
          visibility: "visible",
          opacity: 1,
          x: 0,
          ease: "power4.out",
          duration: 0.3,
        })
        .to(`${destination} .projListTextWrap`, {
          visibility: "visible",
          opacity: 1,
          x: 0,
          ease: "power4.out",
          duration: 0.3,
        })
        .to(`${destination} .project-big-num`, {
          visibility: "visible",
          opacity: 0.1,
          x: 0,
          ease: "power4.out",
          duration: 0.3,
        });
    },
    initEventHandler = () => {
      let navButton = document.getElementById("toggleNav"),
        btmNavButton = document.querySelectorAll(".js-projectNav-link");

      navButton.addEventListener("click", () => {
        navCurtainAnimation(navButton);
        window.utils.clearBorderGlitchInterval();

        if (navButton.classList.contains("change")) {
          navButton.classList.remove("change");

          gsap
            .timeline()
            .to("#nav", {
              visibility: "hidden",
              opacity: 0,
            })
            .to("#main", {
              visibility: "visible",
              opacity: 1,
            });

          gsap.to(".mainNavBox", {
            opacity: 0,
            y: -200,
          });

          window.utils.initBorderGlitch("glitch-border-wrap");
        } else {
          navButton.classList.add("change");

          gsap
            .timeline()
            .to("#main", {
              visibility: "hidden",
              opacity: 0,
            })
            .to("#nav", {
              visibility: "visible",
              opacity: 1,
            });

          gsap.to(".mainNavBox", {
            opacity: 1,
            y: 0,
            stagger: 0.5,
            ease: "back.in",
          });

          window.utils.initBorderGlitch("glitch-border-nav");
        }
      });

      btmNavButton.forEach((element) => {
        element.addEventListener("click", async () => {
          await navigateRouteClick(element);
        });
      });
    },
    initNoise = () => {
      let canvas, ctx;

      let wWidth, wHeight;

      let noiseData = [];
      let frame = 0;

      let loopTimeout;

      // Create Noise
      const createNoise = () => {
        const idata = ctx.createImageData(wWidth, wHeight);
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;

        for (let i = 0; i < len; i++) {
          if (Math.random() < 0.5) {
            buffer32[i] = 0xff000000;
          }
        }

        noiseData.push(idata);
      };

      // Play Noise
      const paintNoise = () => {
        if (frame === 9) {
          frame = 0;
        } else {
          frame++;
        }

        ctx.putImageData(noiseData[frame], 0, 0);
      };

      // Loop
      const loop = () => {
        paintNoise(frame);

        loopTimeout = window.setTimeout(() => {
          window.requestAnimationFrame(loop);
        }, 1000 / 25);
      };

      // Setup
      const setup = () => {
        const navBG = document.getElementById("navBG");

        wWidth = navBG.getBoundingClientRect().width;
        wHeight = navBG.getBoundingClientRect().height;

        canvas.width = wWidth;
        canvas.height = wHeight;

        for (let i = 0; i < 10; i++) {
          createNoise();
        }

        loop();
      };

      // Reset
      let resizeThrottle;
      const reset = () => {
        window.addEventListener(
          "resize",
          () => {
            window.clearTimeout(resizeThrottle);

            resizeThrottle = window.setTimeout(() => {
              window.clearTimeout(loopTimeout);
              noiseData.splice(0, noiseData.length);
              setup();
            }, 200);
          },
          false
        );
      };

      // Init
      (() => {
        canvas = document.getElementById("navTVAnim");
        ctx = canvas.getContext("2d");

        setup();
        reset();
      })();
    },
    initParallaxMouseOver = (element) => {
      let container = document.querySelectorAll(".project-wrap"),
        body = document.body,
        containerW = body.getBoundingClientRect().width,
        containerH = body.getBoundingClientRect().height;

      container.forEach((element) => {
        let id = element.getAttribute("id"),
          projectTextWrap = document.querySelector(`#${id} .projListTextWrap`),
          projectFigure = document.querySelector(`#${id} .home-img`),
          projectBigNum = document.querySelector(`#${id} .project-big-num`),
          projectSmallNum = document.querySelector(`#${id} .project-small-num`),
          projectName = document.querySelector(`#${id} .project-name`),
          childNode = document.querySelectorAll(`#${id} > .rotate-animate`),
          parentNode = element.parentElement,
          winHalf = containerW / 2,
          adjustedMove = containerH / 15,
          X,
          Y,
          rotateXdeg,
          rotateYdeg,
          moveX,
          moveY;

        parentNode.addEventListener("mouseover", (el) => {
          X = el ? el.pageX : 0;
          Y = el ? el.pageY : 0;
          moveX = winHalf - X;
          moveY = winHalf - Y;
          rotateYdeg = ((winHalf - X) / adjustedMove).toFixed(1);
          rotateXdeg = (-((winHalf - Y) / adjustedMove)).toFixed(1);

          TweenMax.to(childNode, 0.3, {
            rotationY: rotateYdeg,
            rotationX: rotateXdeg,
            ease: Power4.easeOut,
          });

          TweenMax.to(projectTextWrap, {
            css: {
              transform:
                "translateX(" +
                moveX / 32 +
                "px) translateY(" +
                moveY / 24 +
                "px)",
            },
            ease: Power4.easeOut,
          });

          TweenMax.to(projectFigure, {
            css: {
              transform:
                "translateX(" +
                moveX / 72 +
                "px) translateY(" +
                moveY / 60 +
                "px)",
            },
            ease: Power4.easeOut,
          });

          TweenMax.to(projectBigNum, {
            css: {
              transform:
                "translateX(" +
                moveX / 48 +
                "px) translateY(" +
                moveY / 32 +
                "px)",
            },
            ease: Power4.easeOut,
          });

          // TweenMax.to(projectSmallNum, {
          //   css: {
          //     transform:
          //       "translateX(" +
          //       moveX / 32 +
          //       "px) translateY(" +
          //       moveY / 24 +
          //       "px) rotate(-90deg)",
          //   },
          //   ease: Power4.easeOut,
          // });
        });
      });
    },
    initParallaxScroll = () => {
      new fullpage("#main", {
        scrollHorizontally: true,
        sectionSelector: ".section",
        slideSelector: ".section",
        scrollingSpeed: 1000,
        autoScrolling: true,
        loopTop: true,
        loopBottom: true,

        onLeave: async function (origin, destination, direction) {
          if (destination.index === 0 || origin.index === 0) {
            await navCurtainAnimation();
          }

          let dataId = destination.item.dataset.id;
          let activeNav = document.querySelector(".projectNav-link.active"),
            navElement = document.querySelector(`a[href='#${dataId}`),
            element = document.getElementById(dataId),
            elementBorderId = document
              .querySelector(`#${dataId} .glitch-border-wrap`)
              .getAttribute("id"),
            activeElementId = activeNav?.dataset?.source;

          window.utils.initBorderGlitch(elementBorderId);

          if (destination.index === 0) {
            gsap.to(".logo", {
              visibility: "visible",
              opacity: 1,
            });
          } else {
            let outFigureX, outTextX;

            navElement.classList.add("active");

            gsap.to(".logo", {
              visibility: "hidden",
              opacity: 0,
            });

            if (activeNav) {
              if (
                document
                  .querySelector(`#${activeElementId}`)
                  .classList.contains("right-wrap")
              ) {
                outFigureX = -300;
                outTextX = 300;
              } else {
                outFigureX = 300;
                outTextX = -300;
              }

              activeNav.classList.remove("active");

              gsap
                .timeline()
                .to(`#${activeElementId} .home-img`, {
                  visibility: "inherit",
                  opacity: 0,
                  x: outFigureX,
                  ease: "power4.out",
                  duration: 0.2,
                })
                .to(`#${activeElementId} .projListTextWrap`, {
                  visibility: "inherit",
                  opacity: 0,
                  x: outTextX,
                  ease: "power4.out",
                  duration: 0.2,
                })
                .to(`#${activeElementId} .project-big-num`, {
                  visibility: "inherit",
                  opacity: 0,
                  x: outFigureX,
                  ease: "power4.out",
                  duration: 0.2,
                });

              gsap.to(
                [
                  `#${activeElementId} .project-small-num`,
                  `#${activeElementId} .project-name`,
                ],
                {
                  visibility: "inherit",
                  opacity: 0,
                  duration: 0.1,
                }
              );
            }

            gsap
              .timeline()
              .to(activeElementId, {
                visibility: "hidden",
                opacity: 0,
                duration: 0.1,
              })
              .to(element, {
                visibility: "visible",
                opacity: 1,
                delay: 0.1,
              })
              .to(`#${dataId} .home-img`, {
                visibility: "visible",
                opacity: 1,
                x: 0,
                ease: "power4.out",
                duration: 0.3,
              })
              .to(`#${dataId} .projListTextWrap`, {
                visibility: "visible",
                opacity: 1,
                x: 0,
                ease: "power4.out",
                duration: 0.3,
              })
              .to(`#${dataId} .project-big-num`, {
                visibility: "visible",
                opacity: 0.1,
                x: 0,
                ease: "power4.out",
                duration: 0.2,
              })
              .fromTo(
                [`#${dataId} .project-small-num`, `#${dataId} .project-name`],
                {
                  visibility: "hidden",
                  opacity: 0,
                  duration: 0.1,
                },
                {
                  visibility: "visible",
                  opacity: 1,
                  duration: 0.1,
                }
              );
          }
        },
      });
    };

  gsap.to(".mainNavBox", {
    opacity: 0,
    y: -200,
  });

  initHome();
  initEventHandler();
  initNoise();
  initParallaxMouseOver();
  initParallaxScroll();
};
