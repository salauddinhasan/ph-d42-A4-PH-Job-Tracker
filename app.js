 
  document.addEventListener("DOMContentLoaded", function () {
  let interviewCount = 0;
  let rejectedCount = 0;

  const interviewCountElement = document.getElementById("interview-count");
  const rejectedCountElement = document.getElementById("rejected-count");
  const totalElement = document.getElementById("total");
  const jobsCountElement = document.getElementById("jobs-count");
  const noJobsSection = document.getElementById("no-jobs-section");

  const jobsContainer = document.getElementById("jobs-container");
  const cards = Array.from(document.querySelectorAll(".mobile-content"));

  // By default hide all "Not Applied" buttons
  cards.forEach(card => {
    const appliedBtn = card.querySelector(".applied-btn");
    appliedBtn.style.display = "none"; // hidden by default
  });

  // Update visible jobs count
  function updateJobsCount() {
    const visibleCards = cards.filter(card => card.style.display !== "none");
    const totalJobs = cards.length;
    jobsCountElement.innerText = `${visibleCards.length} of ${totalJobs} jobs`;
    totalElement.innerText = totalJobs; // Total button updated correctly

    noJobsSection.style.display = visibleCards.length === 0 ? "block" : "none";
  }

  // Handle job card clicks (interview, rejected, delete)
  jobsContainer.addEventListener("click", function (event) {
    const jobCard = event.target.closest(".mobile-content");
    if (!jobCard) return;

    const appliedBtn = jobCard.querySelector(".applied-btn");
    const previousState = jobCard.dataset.state || "not-applied";

    // Interview
    if (event.target.classList.contains("interview-btn")) {
      if (previousState === "interview") return;
      if (previousState === "rejected") {
        rejectedCount--;
        rejectedCountElement.innerText = rejectedCount;
        appliedBtn.classList.remove("bg-red-500");
      }
      appliedBtn.innerText = "Interview";
      appliedBtn.classList.add("bg-blue-300");
      appliedBtn.classList.remove("bg-red-500");
      appliedBtn.style.display = "inline-block"; // show Applied button
      interviewCount++;
      interviewCountElement.innerText = interviewCount;
      jobCard.dataset.state = "interview";
      jobCard.classList.add("status-interview");
      jobCard.classList.remove("status-rejected");
    }

    // Rejected
    if (event.target.classList.contains("rejected-btn")) {
      if (previousState === "rejected") return;
      if (previousState === "interview") {
        interviewCount--;
        interviewCountElement.innerText = interviewCount;
        appliedBtn.classList.remove("bg-blue-300");
      }
      appliedBtn.innerText = "Rejected";
      appliedBtn.classList.add("bg-red-500");
      appliedBtn.classList.remove("bg-blue-300");
      appliedBtn.style.display = "inline-block"; // show Applied button
      rejectedCount++;
      rejectedCountElement.innerText = rejectedCount;
      jobCard.dataset.state = "rejected";
      jobCard.classList.add("status-rejected");
      jobCard.classList.remove("status-interview");
    }

    // Delete
    if (event.target.classList.contains("delete-btn")) {
      if (previousState === "interview") {
        interviewCount--;
        interviewCountElement.innerText = interviewCount;
      }
      if (previousState === "rejected") {
        rejectedCount--;
        rejectedCountElement.innerText = rejectedCount;
      }

      jobCard.remove();
      const index = cards.indexOf(jobCard);
      if (index > -1) cards.splice(index, 1);

      updateJobsCount(); // Total button will decrease automatically
    }

    updateJobsCount();
  });

  // Filter buttons (unchanged)
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      buttons.forEach(btn => btn.classList.remove("bg-blue-300", "bg-green-300", "bg-red-300"));
      if (this.id === "all-btn") this.classList.add("bg-blue-300");
      else if (this.id === "interview-btn") this.classList.add("bg-green-300");
      else if (this.id === "rejected-btn") this.classList.add("bg-red-300");
    });
  });

  const allBtn = document.getElementById("all-btn");
  const interviewBtn = document.getElementById("interview-btn");
  const rejectedBtn = document.getElementById("rejected-btn");

  // Filter logic
  allBtn.addEventListener("click", function () {
    cards.forEach(card => card.style.display = "block");
    updateJobsCount();
  });

  interviewBtn.addEventListener("click", function () {
    cards.forEach(card => {
      card.style.display = card.classList.contains("status-interview") ? "block" : "none";
    });
    updateJobsCount();
  });

  rejectedBtn.addEventListener("click", function () {
    cards.forEach(card => {
      card.style.display = card.classList.contains("status-rejected") ? "block" : "none";
    });
    updateJobsCount();
  });

  // Initialize counts
  updateJobsCount();
});
 