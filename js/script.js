
"use strict";

// ==========================================
// 1. API Configuration
// ==========================================

const API_BASE_URL = "https://api.frankfurter.dev/v2";


// ==========================================
// 2. DOM Elements
// ==========================================

const amountInput = document.getElementById("amount");

const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");

const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");

const swapButton = document.getElementById("swap-button");
const convertButton = document.getElementById("convert-button");

const convertedAmount = document.getElementById("converted-amount");
const exchangeRate = document.getElementById("exchange-rate");
const rateUpdate = document.getElementById("rate-update");


// ==========================================
// 3. Currency Country Mapping
// ==========================================

const currencyFlags = {
    USD: "US",
    INR: "IN",
    EUR: "EU",
    GBP: "GB",
    JPY: "JP",
    AUD: "AU",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    BDT: "BD",
    PKR: "PK",
    SGD: "SG",
    NZD: "NZ",
    AED: "AE",
    SAR: "SA",
    ZAR: "ZA",
    RUB: "RU",
    KRW: "KR",
    THB: "TH",
    MYR: "MY",
    IDR: "ID",
    HKD: "HK",
    TRY: "TR",
    BRL: "BR",
    MXN: "MX",
    SEK: "SE",
    NOK: "NO",
    DKK: "DK"
};


// ==========================================
// 4. Convert Country Code to Emoji Flag
// ==========================================

function getFlagEmoji(countryCode) {

    if (!countryCode || countryCode.length !== 2) {
        return "🌐";
    }

    return String.fromCodePoint(
        ...[...countryCode.toUpperCase()].map(
            char => 127397 + char.charCodeAt(0)
        )
    );
}


// ==========================================
// 5. Update Currency Flags
// ==========================================

function updateFlags() {

    const fromCode = fromCurrency.value;
    const toCode = toCurrency.value;

    fromFlag.textContent = getFlagEmoji(
        currencyFlags[fromCode]
    );

    toFlag.textContent = getFlagEmoji(
        currencyFlags[toCode]
    );
}


// ==========================================
// 6. Load Supported Currencies
// ==========================================

async function loadCurrencies() {

    try {

        fromCurrency.disabled = true;
        toCurrency.disabled = true;

        const response = await fetch(
            `${API_BASE_URL}/currencies`
        );

        if (!response.ok) {
            throw new Error("Unable to load currencies.");
        }

        const currencies = await response.json();

        if (!Array.isArray(currencies)) {
            throw new Error("Invalid currency data.");
        }

        // Sort currencies alphabetically
        currencies.sort((a, b) =>
            a.iso_code.localeCompare(b.iso_code)
        );

        fromCurrency.innerHTML = "";
        toCurrency.innerHTML = "";

        // Populate dropdowns
        currencies.forEach(currency => {

            const optionText =
                `${currency.iso_code} - ${currency.name}`;

            const fromOption = document.createElement("option");
            fromOption.value = currency.iso_code;
            fromOption.textContent = optionText;

            const toOption = document.createElement("option");
            toOption.value = currency.iso_code;
            toOption.textContent = optionText;

            fromCurrency.appendChild(fromOption);
            toCurrency.appendChild(toOption);

        });

        // Set default currencies
        fromCurrency.value = "USD";
        toCurrency.value = "INR";

        fromCurrency.disabled = false;
        toCurrency.disabled = false;

        updateFlags();

        // Initial conversion
        await convertCurrency();

    } catch (error) {

        console.error("Currency Loading Error:", error);

        showError(
            "Unable to load currencies. Please refresh the page."
        );

    }

}


// ==========================================
// 7. Format Currency Amount
// ==========================================

function formatCurrency(amount, currencyCode) {

    return new Intl.NumberFormat("en-US", {

        style: "currency",

        currency: currencyCode,

        maximumFractionDigits: 2

    }).format(amount);

}


// ==========================================
// 8. Show Error Message
// ==========================================

function showError(message) {

    convertedAmount.textContent = message;

    exchangeRate.textContent = "";
    rateUpdate.textContent = "Please try again.";

}


// ==========================================
// 9. Convert Currency
// ==========================================

async function convertCurrency() {

    const amount = Number(amountInput.value);

    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Validate amount
    if (
        amountInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        amount <= 0
    ) {

        showError("Please enter a valid amount.");

        return;
    }

    // Validate currencies
    if (!from || !to) {

        showError("Please select both currencies.");

        return;
    }

    // Show loading state
    convertButton.disabled = true;
    convertButton.textContent = "Converting...";

    convertedAmount.textContent = "Loading...";
    exchangeRate.textContent = "Fetching exchange rate...";
    rateUpdate.textContent = "Please wait...";

    try {

        let rate;
        let rateDate;

        // Same currency conversion
        if (from === to) {

            rate = 1;
            rateDate = null;

        } else {

            const apiURL =
                `${API_BASE_URL}/rate/${encodeURIComponent(from)}/${encodeURIComponent(to)}`;

            const response = await fetch(apiURL);

            if (!response.ok) {
                throw new Error("Exchange rate not available.");
            }

            const data = await response.json();

            rate = data.rate;
            rateDate = data.date;

        }

        // Calculate converted amount
        const result = amount * rate;

        // Display converted amount
        convertedAmount.textContent =
            formatCurrency(result, to);

        // Display exchange rate
        exchangeRate.textContent =
            `1 ${from} = ${rate.toFixed(4)} ${to}`;

        // Display rate date
        if (rateDate) {

            const formattedDate = new Date(
                `${rateDate}T00:00:00`
            ).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });

            rateUpdate.textContent =
                `Rate date: ${formattedDate}`;

        } else {

            rateUpdate.textContent =
                "Same currency selected. No conversion needed.";

        }

    } catch (error) {

        console.error("Conversion Error:", error);

        showError(
            "Unable to fetch exchange rate. Please try again."
        );

    } finally {

        // Restore button
        convertButton.disabled = false;

        convertButton.innerHTML =
            'Convert Currency <span>→</span>';

    }

}


// ==========================================
// 10. Swap Currencies
// ==========================================

function swapCurrencies() {

    const fromValue = fromCurrency.value;
    const toValue = toCurrency.value;

    fromCurrency.value = toValue;
    toCurrency.value = fromValue;

    updateFlags();

    convertCurrency();

}


// ==========================================
// 11. Event Listeners
// ==========================================

// Convert button
convertButton.addEventListener(
    "click",
    convertCurrency
);


// Swap button
swapButton.addEventListener(
    "click",
    swapCurrencies
);


// Update flags on currency change
fromCurrency.addEventListener(
    "change",
    updateFlags
);

toCurrency.addEventListener(
    "change",
    updateFlags
);


// ==========================================
// 12. Initialize Application
// ==========================================

loadCurrencies();
