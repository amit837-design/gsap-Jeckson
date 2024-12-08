//script for the nav
function navAnimate() {
  let timeLineGsap = gsap.timeline();

  timeLineGsap.from(".navAnimate", {
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.5,
    delay: 0.5,
    ease: "power4.out",
  });

  const button = document.querySelector(".desined");
  const wrapper = button.parentElement;

  let piecesCount = 100;

  function setPiecesCount(count) {
    piecesCount = count;
  }

  button.addEventListener("mouseenter", () => {
    const buttonRect = button.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    for (let i = 0; i < piecesCount; i++) {
      const piece = document.createElement("div");
      piece.classList.add("piece");

      const randomX = Math.random() * buttonRect.width;
      const randomY = Math.random() * buttonRect.height;

      piece.style.position = "absolute";
      piece.style.left = `${buttonRect.left - wrapperRect.left + randomX}px`;
      piece.style.top = `${buttonRect.top - wrapperRect.top + randomY}px`;
      piece.style.width = "10px";
      piece.style.height = "10px";
      piece.style.backgroundImage =
        "linear-gradient(45deg, #ff82f3 0%, #7b13ff 50%, #400d64 100%)";
      piece.style.borderRadius = "50%";
      piece.style.pointerEvents = "none";

      wrapper.appendChild(piece);

      gsap.to(piece, {
        x: (Math.random() - 0.5) * 300,
        y: (Math.random() - 0.5) * 300,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          piece.remove();
        },
      });
    }
  });

  // Expose the function to set the number of pieces globally
  window.setPiecesCount = setPiecesCount;
}
navAnimate();

//animation of every items in section1
function itemAnimate() {
  gsap.from(".details .item:first-child h4, .details .item:first-child p", {
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
  });

  gsap.from(".details .item:nth-child(2)", {
    scale: 3,
    opacity: 0,
    rotate: 360,
    duration: 1,
  });

  gsap.from(".details .item:last-child p, .details .item:last-child h1", {
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
  });
}
itemAnimate();

//name animation in section1
function nameAnimate() {
  const name = document.querySelector(".name");
  const wrapper = name.parentElement;
  const images = [
    "images/branding.jpg",
    "images/graphics.jpg",
    "images/marketing.jpg",
    "images/webDesign.jpg",
  ];

  let isHovering = false;
  let interval;

  function throwImages() {
    const nameRect = name.getBoundingClientRect();
    const piecesCount = 2;

    for (let i = 0; i < piecesCount; i++) {
      const piece = document.createElement("div");
      piece.classList.add("piece");

      const randomX = Math.random() * nameRect.width;
      const randomY = Math.random() * nameRect.height - 100;

      piece.style.position = "absolute";
      piece.style.left = `${nameRect.left + randomX}px`;
      piece.style.top = `${nameRect.top + randomY}px`;
      piece.style.width = "100px";
      piece.style.height = "150px";
      piece.style.backgroundImage = `url(${
        images[Math.floor(Math.random() * images.length)]
      })`;
      piece.style.backgroundSize = "cover";
      piece.style.backgroundPosition = "center";
      piece.style.borderRadius = "8px";
      piece.style.pointerEvents = "none";
      piece.style.opacity = 0;

      wrapper.appendChild(piece);

      gsap.to(piece, {
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 500,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(piece, {
        opacity: 0,
        height: 0,
        duration: 0.5,
        delay: 0.6,
        ease: "power2.in",
        onComplete: () => {
          piece.remove();
        },
      });
    }
  }

  name.addEventListener("mouseenter", () => {
    isHovering = true;
    throwImages();
    interval = setInterval(() => {
      if (isHovering) {
        throwImages();
      }
    }, 300);
  });

  name.addEventListener("mouseleave", () => {
    isHovering = false;
    clearInterval(interval);

    const allPieces = wrapper.querySelectorAll(".piece");
    allPieces.forEach((piece) => {
      gsap.to(piece, {
        opacity: 0,
        height: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          piece.remove();
        },
      });
    });
  });
}
nameAnimate();

//text infinitive animation of section1
function verticalCarousel() {
  const container = document.querySelector(".verticalTextContainer");
  const text = document.querySelector(".verticalText").textContent;
  const alphabate = text.split("");

  container.innerHTML = "";

  alphabate.forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char;
    container.appendChild(span);
  });

  gsap.fromTo(
    container.querySelectorAll("span"),
    {
      opacity: 0,
    },
    {
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
    }
  );
}
verticalCarousel();
