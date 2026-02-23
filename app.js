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

  const allBtn = document.getElementById("all-btn");
  const interviewBtn = document.getElementById("interview-btn");
  const rejectedBtn = document.getElementById("rejected-btn");

  // Hide Not Applied button by default
  cards.forEach(card => {
    const appliedBtn = card.querySelector(".applied-btn");
    if (appliedBtn) appliedBtn.style.display = "none";
  });

  // Active tab
  let activeTab = "all";

  function applyFilter() {
    cards.forEach(card => {
      if (activeTab === "all") {
        card.style.display = "block";
      }
      else if (activeTab === "interview") {
        card.style.display = card.classList.contains("status-interview") ? "block" : "none";
      }
      else if (activeTab === "rejected") {
        card.style.display = card.classList.contains("status-rejected") ? "block" : "none";
      }
    });
  }

  function updateJobsCount() {
    const visibleCards = cards.filter(card => card.style.display !== "none");
    const totalJobs = cards.length;

    jobsCountElement.innerText = `${visibleCards.length} of ${totalJobs} jobs`;
    totalElement.innerText = totalJobs;

    noJobsSection.style.display = visibleCards.length === 0 ? "block" : "none";
  }

  function updateUI() {
    applyFilter();
    updateJobsCount();
  }

  // Job card click events
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
      }

      appliedBtn.innerText = "Interview";
      appliedBtn.classList.add("bg-blue-300");
      appliedBtn.classList.remove("bg-red-500");
      appliedBtn.style.display = "inline-block";

      interviewCount++;
      interviewCountElement.innerText = interviewCount;

      jobCard.dataset.state = "interview";
      jobCard.classList.add("status-interview");
      jobCard.classList.remove("status-rejected");

      updateUI();
    }

    // Rejected
    if (event.target.classList.contains("rejected-btn")) {

      if (previousState === "rejected") return;

      if (previousState === "interview") {
        interviewCount--;
        interviewCountElement.innerText = interviewCount;
      }

      appliedBtn.innerText = "Rejected";
      appliedBtn.classList.add("bg-red-500");
      appliedBtn.classList.remove("bg-blue-300");
      appliedBtn.style.display = "inline-block";

      rejectedCount++;
      rejectedCountElement.innerText = rejectedCount;

      jobCard.dataset.state = "rejected";
      jobCard.classList.add("status-rejected");
      jobCard.classList.remove("status-interview");

      updateUI();
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

      updateUI();
    }

  });

  // Filter buttons color
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      buttons.forEach(btn =>
        btn.classList.remove("bg-blue-300", "bg-green-300", "bg-red-300")
      );

      if (this.id === "all-btn") this.classList.add("bg-blue-300");
      if (this.id === "interview-btn") this.classList.add("bg-green-300");
      if (this.id === "rejected-btn") this.classList.add("bg-red-300");
    });
  });

  // Filter actions
  allBtn.addEventListener("click", function () {
    activeTab = "all";
    updateUI();
  });

  interviewBtn.addEventListener("click", function () {
    activeTab = "interview";
    updateUI();
  });

  rejectedBtn.addEventListener("click", function () {
    activeTab = "rejected";
    updateUI();
  });

  // Initial load
  updateUI();

});