/* ==========================================================================
   Msizi's Mobile Wash — Scripts (Part 3: Functionality, Forms & SEO)
   ========================================================================== */

/* ---------- Shared data: wash packages ----------
   Single source of truth for package names/prices, used to dynamically
   populate the booking form's package dropdown (see populateBookingPackages
   below). Keeping this in one place avoids the services.html and
   booking.html content drifting out of sync. */
var SERVICE_PACKAGES = [
  { value: "express", label: "Express Wash — R150" },
  { value: "standard", label: "Standard Valet — R280" },
  { value: "full", label: "Full Detail — R550" }
];

/* WhatsApp Business number in international format (no leading 0, no +).
   Currently the same placeholder number used across the site
   (073 123 4567 -> 27731234567) — replace with Msizi's real WhatsApp
   Business number before launch. */
var WHATSAPP_NUMBER = "27719580444";

document.addEventListener("DOMContentLoaded", function () {
  initNavToggle();
  initFaqAccordion();
  populateBookingPackages();
  initFormValidation("bookingForm", "formStatus", bookingValidators);
  initFormValidation("contactForm", "contactFormStatus", contactValidators);
  initWhatsAppBookingButton();
});

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen);
    });
  }
}

/* ---------- FAQ accordion (index.html) ---------- */
function initFaqAccordion() {
  var faqItems = document.querySelectorAll(".faq-item");
  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      // Close any other open item so only one is expanded at a time.
      faqItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-question").setAttribute("aria-expanded", "false");
        other.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        question.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* ---------- Dynamic content: populate booking package dropdown ---------- */
function populateBookingPackages() {
  var select = document.getElementById("package");
  if (!select) return;

  // Rebuild the options from SERVICE_PACKAGES so the booking form always
  // reflects the same packages listed on the Services page.
  select.innerHTML = "";

  var placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = "Select a package";
  select.appendChild(placeholder);

  SERVICE_PACKAGES.forEach(function (pkg) {
    var option = document.createElement("option");
    option.value = pkg.value;
    option.textContent = pkg.label;
    select.appendChild(option);
  });
}

/* ---------- Form validation ----------
   Generic engine: each form has a map of fieldId -> validator function.
   A validator returns an empty string when the value is valid, or an
   error message when it isn't. */

var bookingValidators = {
  fullName: function (value) {
    if (!value.trim()) return "Please enter your full name.";
    if (value.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  },
  email: function (value) {
    if (!value.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    return "";
  },
  phone: function (value) {
    if (!value.trim()) return "Please enter your phone number.";
    if (!/^0[0-9]{9}$/.test(value.trim())) return "Enter a 10-digit number starting with 0, e.g. 0731234567.";
    return "";
  },
  package: function (value) {
    if (!value) return "Please select a wash package.";
    return "";
  },
  vehicleType: function (value) {
    if (!value) return "Please select your vehicle type.";
    return "";
  },
  date: function (value) {
    if (!value) return "Please select a preferred date.";
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var chosen = new Date(value);
    if (chosen < today) return "Please choose today or a future date.";
    return "";
  },
  time: function (value) {
    if (!value) return "Please select a preferred time.";
    return "";
  },
  address: function (value) {
    if (!value.trim()) return "Please enter an address or complex name.";
    if (value.trim().length < 5) return "Please enter a more complete address.";
    return "";
  }
};

var contactValidators = {
  contactName: function (value) {
    if (!value.trim()) return "Please enter your full name.";
    if (value.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  },
  contactEmail: function (value) {
    if (!value.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
    return "";
  },
  contactMessage: function (value) {
    if (!value.trim()) return "Please enter a message.";
    if (value.trim().length < 10) return "Please provide a little more detail (10+ characters).";
    return "";
  }
};

function showFieldError(field, message) {
  field.classList.toggle("field-error", Boolean(message));

  var errorEl = field.parentElement.querySelector(".field-error-message");
  if (!errorEl) {
    errorEl = document.createElement("span");
    errorEl.className = "field-error-message";
    field.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

/* ---------- WhatsApp booking ----------
   Uses WhatsApp's free click-to-chat link (wa.me) — no WhatsApp
   Business API or backend required. */
function initWhatsAppBookingButton() {
  var button = document.getElementById("whatsappBookButton");
  var form = document.getElementById("bookingForm");
  if (!button || !form) return;

  button.addEventListener("click", function () {
    var fields = Object.keys(bookingValidators).map(function (id) {
      return document.getElementById(id);
    }).filter(Boolean);

    var isValid = true;
    fields.forEach(function (field) {
      var message = bookingValidators[field.id](field.value);
      showFieldError(field, message);
      if (message) isValid = false;
    });

    var status = document.getElementById("formStatus");
    if (!isValid) {
      status.style.color = "#C0392B";
      status.textContent = "Please fix the highlighted fields before continuing on WhatsApp.";
      return;
    }

    var packageLabel = form.package.options[form.package.selectedIndex].textContent;
    var vehicleLabel = form.vehicleType.options[form.vehicleType.selectedIndex].textContent;

    var lines = [
      "Hi Msizi's Mobile Wash, I'd like to book a wash:",
      "Name: " + form.fullName.value.trim(),
      "Package: " + packageLabel,
      "Vehicle: " + vehicleLabel,
      "Date: " + form.date.value,
      "Time: " + form.time.value,
      "Address: " + form.address.value.trim()
    ];
    if (form.notes.value.trim()) lines.push("Notes: " + form.notes.value.trim());

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });
}

function initFormValidation(formId, statusId, validators) {
  var form = document.getElementById(formId);
  var status = document.getElementById(statusId);
  if (!form) return;

  var fields = Object.keys(validators).map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  // Validate a field as the user leaves it, so errors surface early
  // rather than only on submit.
  fields.forEach(function (field) {
    field.addEventListener("blur", function () {
      var message = validators[field.id](field.value);
      showFieldError(field, message);
    });
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var isValid = true;
    fields.forEach(function (field) {
      var message = validators[field.id](field.value);
      showFieldError(field, message);
      if (message) isValid = false;
    });

    if (!isValid) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.style.color = "#C0392B";
      return;
    }

    // No backend is connected in this project yet, so submission is
    // simulated with a short delay to mimic an AJAX request and give
    // the user clear feedback. Replace this block with a real fetch()
    // call once a booking/enquiry endpoint exists.
    var submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;
    status.style.color = "";
    status.textContent = "Sending...";

    setTimeout(function () {
      status.style.color = "#0F786F";
      status.textContent = formId === "bookingForm"
        ? "Thanks! Your booking request has been received — we'll confirm shortly."
        : "Thanks! Your message has been sent — we'll get back to you soon.";
      form.reset();
      if (formId === "bookingForm") populateBookingPackages();
      submitButton.disabled = false;
    }, 700);
  });
}
