const video = document.getElementById("scrollytelling-video");
const videoContainer = document.getElementById("video-container");
const scrolly = document.querySelector("#scrolly");
const article = scrolly.querySelector("article");
const steps = article.querySelectorAll(".step");

// Initialize Scrollama
const scroller = scrollama();

// Handle Scrollama step entry
function handleStepEnter(response) {
    // response = { element, direction, index }
    var el = response.element;

    // Remove 'is-active' class from all steps
    steps.forEach(step => step.classList.remove('is-active'));
    el.classList.add('is-active');

    // Update graphic (optional, if you need to update the content or UI)
    // sticky.querySelector("p").innerText = el.dataset.step; // Adjust according to your structure
}

// Sync video with scroll percentage
function syncVideoWithScroll() {
    // Get the scroll percentage (scroll position relative to the document's height)
    const scrollPercentage = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    
    // Get the video's total duration
    const videoDuration = video.duration;

    // Calculate the video's current time based on the scroll percentage
    video.currentTime = scrollPercentage * videoDuration;
}

// Initialize Scrollama functionality
function init() {
    // Setup scrollama instance
    scroller
        .setup({
            step: "#scrolly article .step", // Target each step element for scroll actions
            offset: 0.33, // Trigger step when it is 33% from the top
            debug: false // Turn off debug mode
        })
        .onStepEnter(handleStepEnter); // Bind step enter event handler

    // Add scroll event listener to sync the video with the scroll
    window.addEventListener("scroll", syncVideoWithScroll);

    // Add resize listener for scrollama reflow
    window.addEventListener("resize", scroller.resize);
}

// Start Scrollama and video sync
init();
