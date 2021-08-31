import UI from "./ui.js";

const currencyData = {
    from: "",
    to: "",
    rate: "",
    api_key: "ba13737a5df5a096cbcd",
    getCurrency() {
        fetch("https://openexchangerates.org/api/currencies.json")
            .then((res) => res.json())
            .then((data) => {
                UI.loadCurrency(data)
                this.setDefaultCurrency()
            })
            .catch((err) => console.log(err));
    },
    setDefaultCurrency() {
        this.from = "BDT";
        this.to = "USD"
    },
    // getCurrency() {
    //     fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${this.api_key}`)
    //         .then((res) => res.json())
    //         .then((data) => UI.loadCurrency(data.results));
    // },
    convertCurrency() {
        fetch(`https://free.currconv.com/api/v7/convert?q=${this.from}_${this.to}&compact=ultra&apiKey=${this.api_key}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status == 400) {
                    UI.showMsg(data.error)
                } else {
                    this.rate = data["USD_PHP"];
                    UI.displayConvertedCurrency(data[`${this.from}_${this.to}`]);
                }
            })
            .catch((err) => console.log(err));
    },
};

export default currencyData;
