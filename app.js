/* Globally available variables. */
const amount = document.querySelector("#amount");
const term = document.querySelector("#term");
const rate = document.querySelector("#rate");
const calculateBtn = document.querySelector("#calculateBtn");
const clearAllBtn = document.querySelector("#clearAll");

/* Calculate Mortgage function. */
const monthlyMortgage = (amount, term, rate) => {
  const termInMonth = term * 12;
  const rateForAMonth = rate / (100 * 12);
  const step1 = (1 + rateForAMonth) ** termInMonth;
  const step2 = rateForAMonth * step1;
  const step3 = step1 - 1;
  const step4 = step2 / step3;
  const mM = (amount * step4).toFixed(2);
  const totalPay = (mM * termInMonth).toFixed(2);
  const interest = (totalPay - amount).toFixed(2);
  return {
    mM: mM,
    totalPay: totalPay,
    interest: interest,
  };
};

/* Display data on DOM function. */
const showOnDOM = (mM, totalPay, interest) => {
  const rightPane = document.querySelector(".right_pane");
  const resultHeading = document.querySelector("#resultHeading");
  const resultDiscription = document.querySelector("#resultDiscription");
  const rightPaneImg = document.querySelector(".right_pane_img");
  const repayment = document.querySelector("#repayment");

  // create html elements.
  const resultDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  const mMP = document.createElement("p");
  const hr = document.createElement("hr");
  const h4 = document.createElement("h4");
  const tMP = document.createElement("p");

  // add css class for styling.
  resultDiv.classList.add("result_div");
  h3.classList.add("h3_style");
  mMP.classList.add("mM_p");
  hr.classList.add("hr_style");
  h4.classList.add("h4_style");
  tMP.classList.add("totalPay_style");

  // Check which radio button is selected then
  // add data to created elements.
  if (repayment.checked) {
    h3.innerHTML = `Your monthly repayments`;
    mMP.innerHTML = `$${mM}`;
  } else {
    h3.innerHTML = `Your Interest only`;
    mMP.innerHTML = `$${interest}`;
  }

  h4.innerHTML = `Total you'll repay over the term`;
  tMP.innerHTML = `$${totalPay}`;

  resultHeading.innerHTML = `Your results`;
  resultDiscription.innerHTML = `Your results are shown below based 
    on the information you provided.To adjust the results, edit 
    the form and click “calculate repayments” again.`;

  // remove image from right pane.
  rightPaneImg.style.display = "none";

  // add created html elements.
  resultDiv.append(h3);
  resultDiv.append(mMP);
  resultDiv.append(hr);
  resultDiv.append(h4);
  resultDiv.append(tMP);
  rightPane.append(resultDiv);
};

/* Utility functions */
const warnAmountField = () => {
  const amountDiv = document.querySelector("#amountDiv");
  const amountSign = document.querySelector("#amountSign");
  const amountWarningMsg = document.querySelector("#amountWarningMsg");
  amountDiv.classList.add("warning_container");
  amountSign.classList.add("warning_p");
  amountWarningMsg.style.display = "block";
};

const doNotwarnAmountField = () => {
  const amountDiv = document.querySelector("#amountDiv");
  const amountSign = document.querySelector("#amountSign");
  const amountWarningMsg = document.querySelector("#amountWarningMsg");
  amountDiv.classList.remove("warning_container");
  amountSign.classList.remove("warning_p");
  amountWarningMsg.style.display = "none";
};

const warnTermField = () => {
  const termDiv = document.querySelector("#termDiv");
  const termSign = document.querySelector("#termSign");
  const termWarningMsg = document.querySelector("#termWarningMsg");
  termDiv.classList.add("warning_container");
  termSign.classList.add("warning_p");
  termWarningMsg.style.display = "block";
};

const doNotwarnTermField = () => {
  const termDiv = document.querySelector("#termDiv");
  const termSign = document.querySelector("#termSign");
  const termWarningMsg = document.querySelector("#termWarningMsg");
  termDiv.classList.remove("warning_container");
  termSign.classList.remove("warning_p");
  termWarningMsg.style.display = "none";
};

const warnRateField = () => {
  const rateDiv = document.querySelector("#rateDiv");
  const rateSign = document.querySelector("#rateSign");
  const rateWarningMsg = document.querySelector("#rateWarningMsg");
  rateDiv.classList.add("warning_container");
  rateSign.classList.add("warning_p");
  rateWarningMsg.style.display = "block";
};

const doNotwarnRateField = () => {
  const rateDiv = document.querySelector("#rateDiv");
  const rateSign = document.querySelector("#rateSign");
  const rateWarningMsg = document.querySelector("#rateWarningMsg");
  rateDiv.classList.remove("warning_container");
  rateSign.classList.remove("warning_p");
  rateWarningMsg.style.display = "none";
};

/* Clear all function.*/
const clearAllFunction = () => {
  amount.value = "";
  term.value = "";
  rate.value = "";
  const resultDiv = document.querySelector(".result_div");
  if (resultDiv) {
    resultDiv.remove();
  }
  resultHeading.innerHTML = `Results shown here`;
  resultDiscription.innerHTML = `Complete the form and click “calculate repayments” to see what 
        your monthly repayments would be.`;
  const rightPaneImg = document.querySelector(".right_pane_img");
  rightPaneImg.style.display = "block";

  // Remove warning from input fields.
  doNotwarnAmountField();
  doNotwarnTermField();
  doNotwarnRateField();
};

/* Validate input field function */
const validateInputField = () => {
  if (amount.value && term.value && rate.value) {
    const resultDiv = document.querySelector(".result_div");
    const result = monthlyMortgage(
      Number(amount.value),
      Number(term.value),
      Number(rate.value)
    );
    // Check result div already present in DOM.
    if (resultDiv) {
      resultDiv.remove();
      showOnDOM(result.mM, result.totalPay, result.interest);
    } else {
      showOnDOM(result.mM, result.totalPay, result.interest);
    }
  } else if (amount.value && term.value && rate.value === "") {
    warnRateField();
  } else if (amount.value === "" && term.value === "" && rate.value) {
    warnAmountField();
    warnTermField();
  } else if (amount.value && term.value === "" && rate.value) {
    warnTermField();
  } else if (amount.value === "" && term.value && rate.value === "") {
    warnAmountField();
    warnRateField();
  } else if (amount.value && term.value === "" && rate.value === "") {
    warnTermField();
    warnRateField();
  } else if (amount.value === "" && term.value && rate.value) {
    warnAmountField();
  } else {
    warnAmountField();
    warnTermField();
    warnRateField();
  }
};

/* Clear All button event. */
clearAllBtn.addEventListener("click", () => {
  clearAllFunction();
});

/* Calculate button event.*/
calculateBtn.addEventListener("click", (e) => {
  e.preventDefault();
  validateInputField();
});
