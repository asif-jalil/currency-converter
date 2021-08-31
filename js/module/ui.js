import currencyData from "./currency.js";

const UI = {
    loadSelectors() {
        const fromAmount = document.querySelector("#fromAmount");
        const fromCurrency = document.querySelector("#fromCurrency");
        const toAmount = document.querySelector("#toAmount");
        const toCurrency = document.querySelector("#toCurrency");
        const currencyRate = document.querySelector("#currencyRate");
        const alertToast = document.querySelector("#alertToast");
        const alertMsg = document.querySelector("#alertMsg");

        return {
            fromAmount,
            fromCurrency,
            toAmount,
            toCurrency,
            currencyRate,
            alertToast,
            alertMsg,
        };
    },
    loadCurrency(data) {
        const { fromCurrency, toCurrency } = this.loadSelectors();
        const currencyId = Object.keys(data);
        currencyId.forEach((id) => {
            this.makeCurrencyOption(data, id, fromCurrency);
            this.makeCurrencyOption(data, id, toCurrency);
        });
    },
    makeCurrencyOption(data, id, targetEl) {
        // const currId = data[id].id;
        // const currName = data[id].currencyName;
        const currId = id;
        const currName = data[id];
        let option = document.createElement("option");
        option.setAttribute("value", currId);
        this.selectDefaultCurrency(option, currId, targetEl);
        option.textContent = `${currId} (${currName})`;
        targetEl.insertAdjacentElement("beforeend", option);
    },
    selectDefaultCurrency(el, id, targetEl) {
        if (id === "BDT" && targetEl.id === "fromCurrency") {
            el.setAttribute("selected", true);
        } else if (id === "USD" && targetEl.id === "toCurrency") {
            el.setAttribute("selected", true);
        }
    },
    showMsg(msg) {
        const { alertToast, alertMsg } = this.loadSelectors();
        const icon = `<i class="fas fa-times-circle"></i>`;
        alertMsg.innerHTML = icon + " " + msg;

        const toast = new bootstrap.Toast(alertToast, {
            delay: 3500,
        });
        toast.show();
    },
    checkValidity(value) {
        if (isNaN(value)) {
            this.showMsg("You have to enter a valid number");
        } else {
            return true;
        }
    },
    processCurrency(e) {
        const inputAmount = parseFloat(e.target.value.trim());
        const isValidate = this.checkValidity(inputAmount);

        if (isValidate) {
            currencyData.convertCurrency();
        } else {
            const { toAmount, currencyRate } = this.loadSelectors();
            toAmount.value = "";
            currencyRate.innerHTML = "";
        }
    },
    displayConvertedCurrency(rate) {
        const { fromAmount, toAmount, currencyRate } = this.loadSelectors();
        const formAmountNumber = parseFloat(fromAmount.value);
        const convertedAmount = formAmountNumber * rate;
        toAmount.value = convertedAmount;
        currencyRate.innerHTML = `<span class="text-info">${formAmountNumber}</span> ${currencyData.from} = <span class="text-info">${convertedAmount}</span> ${currencyData.to}`;
    },
    init() {
        const { fromAmount, fromCurrency, toCurrency } = this.loadSelectors();

        fromAmount.addEventListener("keyup", (e) => this.processCurrency(e));
        fromCurrency.addEventListener("change", (e) => {
            currencyData.from = e.target.value;
            currencyData.convertCurrency();
        });
        toCurrency.addEventListener("change", (e) => {
            currencyData.to = e.target.value;
            currencyData.convertCurrency();
        });
        window.addEventListener("DOMContentLoaded", currencyData.getCurrency());
    },
};

export default UI;