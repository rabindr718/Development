class ImageSlider {
  constructor(config) {
    // Configuration
    this.images = config.images || [];
    this.autoPlayInterval = config.autoPlayInterval || 0;

    // DOM Elements
    this.sliderImage = document.getElementById("sliderImage");
    this.prevBtn = document.getElementById("prevBtn");
    this.nextBtn = document.getElementById("nextBtn");
    this.indicatorsContainer = document.querySelector(".slider-indicators");

    // Slider State
    this.currentIndex = 0;
    this.autoPlayTimer = null;

    // Bind methods
    this.init = this.init.bind(this);
    this.navigate = this.navigate.bind(this);
    this.startAutoPlay = this.startAutoPlay.bind(this);
    this.stopAutoPlay = this.stopAutoPlay.bind(this);

    // Initialize
    this.init();
  }

  // Initialize Slider
  init() {
    // Validate image array
    if (this.images.length === 0) {
      console.error("No images provided for the slider");
      return;
    }

    // Create navigation indicators
    this.createIndicators();

    // Set initial image
    this.updateImage();

    // Event Listeners
    this.prevBtn.addEventListener("click", () => this.navigate(-1));
    this.nextBtn.addEventListener("click", () => this.navigate(1));

    // Optional: Keyboard navigation
    document.addEventListener(
      "keydown",
      this.handleKeyboardNavigation.bind(this)
    );

    // Start auto-play if interval is set
    if (this.autoPlayInterval > 0) {
      this.startAutoPlay();

      // Pause on hover
      this.sliderImage.addEventListener("mouseenter", this.stopAutoPlay);
      this.sliderImage.addEventListener("mouseleave", this.startAutoPlay);
    }
  }

  // Create Indicators
  createIndicators() {
    this.indicatorsContainer.innerHTML = "";

    this.images.forEach((_, index) => {
      const indicator = document.createElement("div");
      indicator.classList.add("slider-indicator");

      if (index === this.currentIndex) {
        indicator.classList.add("active");
      }

      indicator.addEventListener("click", () => this.goToSlide(index));
      this.indicatorsContainer.appendChild(indicator);
    });
  }

  // Navigate Slides
  navigate(direction) {
    this.currentIndex += direction;

    // Wrap around the slides
    if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0;
    } else if (this.currentIndex < 0) {
      this.currentIndex = this.images.length - 1;
    }

    this.updateImage();
  }

  // Go to Specific Slide
  goToSlide(index) {
    this.currentIndex = index;
    this.updateImage();
  }

  // Update Image and Indicators
  updateImage() {
    // Update image source
    this.sliderImage.src = this.images[this.currentIndex];
    this.sliderImage.alt = `Slide ${this.currentIndex + 1}`;

    // Update active indicator
    const indicators = this.indicatorsContainer.children;
    Array.from(indicators).forEach((indicator, index) => {
      indicator.classList.toggle("active", index === this.currentIndex);
    });
  }

  // Keyboard Navigation
  handleKeyboardNavigation(event) {
    switch (event.key) {
      case "ArrowLeft":
        this.navigate(-1);
        break;
      case "ArrowRight":
        this.navigate(1);
        break;
    }
  }

  // Auto Play Methods
  startAutoPlay() {
    if (this.autoPlayInterval > 0) {
      this.autoPlayTimer = setInterval(() => {
        this.navigate(1);
      }, this.autoPlayInterval);
    }
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }
}

// Initialize Slider on DOM Load
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
    autoPlayInterval: 3000, // Auto-advance every 3 seconds
  });
});
