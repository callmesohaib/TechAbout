(function () {
  "use strict";

  var RATES = {
    PKR: 1,
    USD: 278.5,
    GBP: 355
  };

  var LABELS = {
    PKR: "Rs",
    USD: "$",
    GBP: "£"
  };

  var STORAGE_PERIOD = "pkhosting-vps-period";
  var STORAGE_CURRENCY = "pkhosting-vps-currency";

  var currencySelect = document.getElementById("currency");
  var monthlyBtn = document.getElementById("bill-monthly");
  var annuallyBtn = document.getElementById("bill-annually");
  var liveRegion = document.getElementById("price-live");
  var cards = document.querySelectorAll(".plan-card[data-monthly]");

  if (!currencySelect || !monthlyBtn || !annuallyBtn || !cards.length) {
    return;
  }

  var state = {
    period: "monthly",
    currency: "PKR"
  };

  function readStored() {
    try {
      var period = localStorage.getItem(STORAGE_PERIOD);
      var currency = localStorage.getItem(STORAGE_CURRENCY);
      if (period === "monthly" || period === "annually") {
        state.period = period;
      }
      if (currency === "PKR" || currency === "USD" || currency === "GBP") {
        state.currency = currency;
      }
    } catch (err) {
      /* private mode / blocked storage: keep defaults */
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_PERIOD, state.period);
      localStorage.setItem(STORAGE_CURRENCY, state.currency);
    } catch (err) {
      /* ignore */
    }
  }

  function formatNumber(value, currency) {
    if (currency === "PKR") {
      return Math.round(value).toLocaleString("en-PK");
    }
    return value.toLocaleString("en-PK", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function toDisplay(pkrAmount, currency) {
    if (currency === "PKR") {
      return pkrAmount;
    }
    return pkrAmount / RATES[currency];
  }

  function monthlyShownPkr(monthlyPkr) {
    if (state.period === "annually") {
      return (monthlyPkr * 10) / 12;
    }
    return monthlyPkr;
  }

  function annualTotalPkr(monthlyPkr) {
    return monthlyPkr * 10;
  }

  function savingsPkr(monthlyPkr) {
    return monthlyPkr * 12 - annualTotalPkr(monthlyPkr);
  }

  function updateCard(card) {
    var monthlyPkr = Number(card.getAttribute("data-monthly"));
    var priceEl = card.querySelector("[data-price]");
    var periodEl = card.querySelector("[data-period]");
    var metaEl = card.querySelector("[data-annual-meta]");
    var savingsEl = card.querySelector("[data-savings]");
    var codeEl = priceEl && priceEl.querySelector(".currency-code");
    var amountEl = priceEl && priceEl.querySelector(".amount");

    if (!priceEl || !periodEl || !metaEl || !savingsEl || !codeEl || !amountEl) {
      return;
    }

    var shownPkr = monthlyShownPkr(monthlyPkr);
    var shown = toDisplay(shownPkr, state.currency);

    codeEl.textContent = LABELS[state.currency];
    amountEl.textContent = formatNumber(shown, state.currency);
    periodEl.textContent = "/mo";

    if (state.period === "annually") {
      var total = toDisplay(annualTotalPkr(monthlyPkr), state.currency);
      var save = toDisplay(savingsPkr(monthlyPkr), state.currency);
      metaEl.hidden = false;
      savingsEl.hidden = false;
      metaEl.textContent =
        "Billed " +
        LABELS[state.currency] +
        " " +
        formatNumber(total, state.currency) +
        "/yr";
      savingsEl.textContent =
        "Save " +
        LABELS[state.currency] +
        " " +
        formatNumber(save, state.currency) +
        " vs monthly";
    } else {
      metaEl.hidden = true;
      savingsEl.hidden = true;
      metaEl.textContent = "";
      savingsEl.textContent = "";
    }
  }

  function announce() {
    if (!liveRegion) {
      return;
    }
    var periodLabel = state.period === "annually" ? "annually" : "monthly";
    liveRegion.textContent =
      "Prices updated to " + state.currency + ", billed " + periodLabel + ".";
  }

  function syncControls() {
    var annual = state.period === "annually";
    monthlyBtn.classList.toggle("is-active", !annual);
    annuallyBtn.classList.toggle("is-active", annual);
    monthlyBtn.setAttribute("aria-pressed", String(!annual));
    annuallyBtn.setAttribute("aria-pressed", String(annual));
    currencySelect.value = state.currency;
  }

  function render(announceChange) {
    syncControls();
    for (var i = 0; i < cards.length; i++) {
      updateCard(cards[i]);
    }
    persist();
    if (announceChange) {
      announce();
    }
  }

  function setPeriod(period) {
    if (period !== "monthly" && period !== "annually") {
      return;
    }
    if (state.period === period) {
      return;
    }
    state.period = period;
    render(true);
  }

  monthlyBtn.addEventListener("click", function () {
    setPeriod("monthly");
  });

  annuallyBtn.addEventListener("click", function () {
    setPeriod("annually");
  });

  currencySelect.addEventListener("change", function () {
    var next = currencySelect.value;
    if (next !== "PKR" && next !== "USD" && next !== "GBP") {
      return;
    }
    if (state.currency === next) {
      return;
    }
    state.currency = next;
    render(true);
  });

  readStored();
  render(false);
})();

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero-band");

  if (!header || !hero) {
    return;
  }

  function setPastHero(past) {
    header.classList.toggle("is-past-hero", past);
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        setPastHero(!entries[0].isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  } else {
    function onScroll() {
      var bottom = hero.getBoundingClientRect().bottom;
      setPastHero(bottom <= 0);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();

(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("site-nav");

  if (!header || !toggle || !nav) {
    return;
  }

  function setOpen(open) {
    header.classList.toggle("is-nav-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function closeNav() {
    setOpen(false);
  }

  toggle.addEventListener("click", function () {
    setOpen(!header.classList.contains("is-nav-open"));
  });

  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      closeNav();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener(
    "resize",
    function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeNav();
      }
    },
    { passive: true }
  );
})();
