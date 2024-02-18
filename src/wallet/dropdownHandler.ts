import { syncCryptoBalances } from "./syncCryptoBalances";

let balanceCheckInterval: number | null = null;

export const stopBalanceCheckInterval = () => {
  if (balanceCheckInterval !== null) {
    clearInterval(balanceCheckInterval);
    balanceCheckInterval = null;
    console.log("Balance-Check-Interval gestoppt.");
  }
};

export const activateDropdown = (checkAndUpdateBalance: () => void) => {
  balanceCheckInterval = setInterval(checkAndUpdateBalance, 250);
};

const deactivateDropdown = () => {
  stopBalanceCheckInterval();
  console.log("Dropdown deaktiviert.");
};

export const dropdownHandler = () => {
  const handleDocumentClick = (event: MouseEvent) => {
    const dropdown = document.querySelector(
      ".dropdown-scroll-content"
    ) as HTMLElement;

    if (dropdown && !dropdown.contains(event.target as Node)) {
      if (dropdownIsVisible(dropdown)) {
        console.log("Innerhalb des Dropdowns geklickt");
        syncCryptoBalances();
      }
    } else {
      console.log("Außerhalb des Dropdowns geklickt");
      deactivateDropdown();
    }
  };

  function dropdownIsVisible(dropdownElement: HTMLElement) {
    return dropdownElement.style.display !== "none";
  }

  document.addEventListener("click", handleDocumentClick);
};
