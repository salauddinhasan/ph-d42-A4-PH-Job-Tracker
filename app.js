document.addEventListener("DOMContentLoaded", function () {
  let interviewCount = 0;
  let rejectedCount = 0;

  const interviewCountElement = document.getElementById("interview-count");
  const rejectedCountElement = document.getElementById("rejected-count");
  const totalElement = document.getElementById("total");
  const jobsCountElement = document.getElementById("jobs-count");
  const noJobsSection = document.getElementById("no-jobs-section");

  const jobsContainer = document.getElementById("jobs-container");

  // handle clicks inside job cards
  jobsContainer.addEventListener("click", function (event) {
    const jobCard = event.target.closest(".mobile-content");
    if (!jobCard) return;

    const appliedBtn = jobCard.querySelector(".applied-btn");
    const previousState = jobCard.dataset.state || "not-applied";

    // interview button
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
      interviewCount++;
      interviewCountElement.innerText = interviewCount;
      jobCard.dataset.state = "interview";
      jobCard.classList.add("status-interview");
      jobCard.classList.remove("status-rejected");
    }

    // rejected button
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
      rejectedCount++;
      rejectedCountElement.innerText = rejectedCount;
      jobCard.dataset.state = "rejected";
      jobCard.classList.add("status-rejected");
      jobCard.classList.remove("status-interview");
    }

    // delete button
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
      updateTotalJobs();
    }
  });

  // filter buttons
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      buttons.forEach(btn => btn.classList.remove("bg-blue-300","bg-green-300","bg-red-300"));

      if (this.id === "all-btn") this.classList.add("bg-blue-300");
      else if (this.id === "interview-btn") this.classList.add("bg-green-300");
      else if (this.id === "rejected-btn") this.classList.add("bg-red-300");
    });
  });

  const allBtn = document.getElementById("all-btn");
  const interviewBtn = document.getElementById("interview-btn");
  const rejectedBtn = document.getElementById("rejected-btn");
  const cards = document.querySelectorAll(".mobile-content");

  function updateTotalJobs() {
    const totalJobs = document.querySelectorAll("#jobs-container .mobile-content").length;
    totalElement.innerText = totalJobs;
    jobsCountElement.innerText = totalJobs;

    // show/hide no-jobs section
    if (totalJobs === 0) noJobsSection.style.display = "block";
    else noJobsSection.style.display = "none";
  }

  allBtn.addEventListener("click", function () {
    cards.forEach(card => card.style.display = "block");
    updateNoJobsDisplay();
  });

  interviewBtn.addEventListener("click", function () {
    let visible = false;
    cards.forEach(card => {
      if (card.classList.contains("status-interview")) {
        card.style.display = "block";
        visible = true;
      } else {
        card.style.display = "none";
      }
    });
    noJobsSection.style.display = visible ? "none" : "block";
  });

  rejectedBtn.addEventListener("click", function () {
    let visible = false;
    cards.forEach(card => {
      if (card.classList.contains("status-rejected")) {
        card.style.display = "block";
        visible = true;
      } else {
        card.style.display = "none";
      }
    });
    noJobsSection.style.display = visible ? "none" : "block";
  });

  function updateNoJobsDisplay() {
    const anyVisible = Array.from(cards).some(card => card.style.display !== "none");
    noJobsSection.style.display = anyVisible ? "none" : "block";
  }

  // initialize
  updateTotalJobs();
});