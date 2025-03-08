class ImageSlider {
  constructor(config) {
    // SETUP BASIC PROPERTIES
    this.images = config.images || [];
    this.autoPlayInterval = config.autoPlayInterval || 0;
    this.currentIndex = 0;
    this.autoPlayTimer = null;

    // GET DOM ELEMENTS
    this.sliderImage = document.getElementById("sliderImage");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.indicatorsContainer = document.querySelector(".slider-indicators");

    // INITIALIZE SLIDER
    if (this.images.length === 0) {
      console.error("No images provided for the slider");
      return;
    }

    this.createIndicators();
    this.updateImage();
    this.setupEventListeners();
  }

  // CREATE DOT INDICATORS
  createIndicators() {
    this.indicatorsContainer.innerHTML = "";
    this.images.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("slider-indicator");
      if (index === this.currentIndex) indicator.classList.add("active");
      indicator.addEventListener("click", () => this.goToSlide(index));
      this.indicatorsContainer.appendChild(indicator);
    });
  }

  // HANDLE NAVIGATION
  navigate(direction) {
    this.currentIndex =
      (this.currentIndex + direction + this.images.length) % this.images.length;
    this.updateImage();
  }

  // GO TO SPECIFIC SLIDE
  goToSlide(index) {
    this.currentIndex = index;
    this.updateImage();
  }

  // UPDATE DISPLAY
  updateImage() {
    this.sliderImage.src = this.images[this.currentIndex];
    this.sliderImage.alt = `Slide ${this.currentIndex + 1}`;

    Array.from(this.indicatorsContainer.children).forEach(
      (indicator, index) => {
        indicator.classList.toggle("active", index === this.currentIndex);
      }
    );
  }

  // SETUP ALL EVENT LISTENERS
  setupEventListeners() {
    this.prevBtn.addEventListener("click", () => this.navigate(-1));
    this.nextBtn.addEventListener("click", () => this.navigate(1));
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.navigate(-1);
      if (e.key === "ArrowRight") this.navigate(1);
    });

    if (this.autoPlayInterval > 0) {
      this.startAutoPlay();
      this.sliderImage.addEventListener("mouseenter", () =>
        this.stopAutoPlay()
      );
      this.sliderImage.addEventListener("mouseleave", () =>
        this.startAutoPlay()
      );
    }
  }

  // AUTO PLAY CONTROLS
  startAutoPlay() {
    if (this.autoPlayInterval > 0) {
      this.autoPlayTimer = setInterval(
        () => this.navigate(1),
        this.autoPlayInterval
      );
    }
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) clearInterval(this.autoPlayTimer);
  }
}

// INITIALIZE ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  const images = [
    "https://picsum.photos/800/500?random=1",
    "https://picsum.photos/800/500?random=2",
    "https://picsum.photos/800/500?random=3",
    "https://picsum.photos/800/500?random=4",
    "https://picsum.photos/800/500?random=5",
  ];

  new ImageSlider({
    images: images,
    autoPlayInterval: 3000,
  });
});
