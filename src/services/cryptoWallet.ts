import { wait_for } from "../utils/wait_for";

export const cryptoWallet = async () => {
  await wait_for(
    () => !!document.querySelector('span[title][style="max-width: 16ch;"]')
  );

  const userBalanceSpan = document.querySelector(
    'span[style="max-width: 16ch;"][class="weight-semibold line-height-default align-left size-default text-size-default variant-highlighted numeric with-icon-space truncate svelte-1d6bfct"]'
  );

  let lastCryptoType: string | null | undefined = null;

  // Funktion, die den aktuellen Betrag überprüft und anzeigt
  const checkAndUpdateBalance = () => {
    const cryptoTypeElement = document.querySelector(
      'span[title][style="max-width: 16ch;"]'
    );
    const cryptoType = cryptoTypeElement?.getAttribute("title");

    // Überprüfen, ob ein Wechsel der Kryptowährung stattgefunden hat
    if (cryptoType !== lastCryptoType) {
      lastCryptoType = cryptoType;
      const storedAmount = localStorage.getItem(`cryptoBalance_${cryptoType}`);

      if (storedAmount) {
        if (userBalanceSpan) {
          userBalanceSpan.textContent = parseFloat(storedAmount).toFixed(8);
        }
      } else {
        if (userBalanceSpan) {
          userBalanceSpan.textContent = "0.00000000";
        }
      }
    }
  };

  // Initialer Aufruf, um den aktuellen Stand zu setzen
  checkAndUpdateBalance();

  // Regelmäßige Überprüfung, ob die Kryptowährung gewechselt hat
  setInterval(checkAndUpdateBalance, 250); // Überprüfung alle 1000ms (1 Sekunde)
};

// export const syncCryptoBalances = async () => {
//   console.log("Waiting for dropdown buttons...");
//   await wait_for(
//     () => document.querySelectorAll(".button.variant-dropdown").length > 0
//   );
//   console.log("Dropdown buttons found.");

//   let lastCryptoType = "";

//   const updateBalancesDisplay = () => {
//     console.log("Updating balance displays...");
//     const dropdownButtons = document.querySelectorAll(
//       ".button.variant-dropdown"
//     );

//     console.log(`Found ${dropdownButtons.length} dropdown buttons.`);

//     dropdownButtons.forEach((button, index) => {
//       console.log(`Processing button ${index + 1}/${dropdownButtons.length}`);
//       const cryptoTypeSpan = button.querySelector(
//         'span[style="max-width: 16ch;"].variant-inherit'
//       );
//       const cryptoType = cryptoTypeSpan
//         ? cryptoTypeSpan.textContent?.trim()
//         : null;
//       console.log(`Found crypto type: ${cryptoType}`);

//       const userBalanceSpan = button.querySelector(
//         "span.weight-semibold.line-height-default"
//       );

//       if (cryptoType && cryptoType !== lastCryptoType) {
//         console.log(`Crypto type has changed to: ${cryptoType}`);
//         lastCryptoType = cryptoType;
//         const storedAmount = localStorage.getItem(
//           `cryptoBalance_${cryptoType.toLowerCase()}`
//         );
//         console.log(`Stored amount for ${cryptoType}: ${storedAmount}`);

//         if (userBalanceSpan) {
//           userBalanceSpan.textContent = storedAmount
//             ? parseFloat(storedAmount).toFixed(8)
//             : "0.00000000";
//           console.log(`Updated balance for ${cryptoType} to display.`);
//         }
//       } else {
//         console.log(`No change in crypto type or no crypto type found.`);
//       }
//     });
//   };

//   updateBalancesDisplay();

//   setInterval(() => {
//     console.log("Interval check for balance update...");
//     updateBalancesDisplay();
//   }, 10000); // Überprüfung alle 250ms
// };
