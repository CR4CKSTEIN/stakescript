import { createAndAddInputElement } from "../utils/utils";
import { wait_for } from "../utils/wait_for";
import { extractAndApplyMultiplier } from "./extractAndApplyMultiplier";

export const updateElementValue = async () => {
  await wait_for(
    () => document.querySelector('input[data-test="profit-input"]') !== null
  );

  const secondParentElement = document.querySelector(
    'input[data-test="profit-input"]'
  )?.parentNode;

  if (!(secondParentElement instanceof Element)) {
    throw new Error("Second parent element is not an Element");
  }

  const secondExistingElement = document.querySelector(
    'input[data-test="profit-input"]'
  ) as HTMLInputElement;

  if (secondExistingElement) {
    secondExistingElement.style.display = "none";
    secondExistingElement.style.visibility = "hidden";
    secondExistingElement.removeAttribute("data-test");
    secondExistingElement.removeAttribute("class");
    console.log("Second element overlay was made invisible");
  } else {
    console.warn("Second element overlay was not found");
  }

  const firstElementOverlay = document.querySelector(
    'input[data-test="input-game-amount"]'
  ) as HTMLInputElement;

  if (!firstElementOverlay) {
    throw new Error("First element overlay could not be found");
  }

  const secondElementOverlay = createAndAddInputElement(secondParentElement, {
    type: "number", 
    className: "input spacing-expanded svelte-3axy6s",
    dataTest: "profit-input", 
    value: firstElementOverlay.value,
    backgroundColor: "#2F4553",
    color: "#ffffff",
    readOnly: true,
  });

  if (!secondElementOverlay) {
    throw new Error("Second element overlay could not be created");
  }

  setInterval(() => {
    extractAndApplyMultiplier(firstElementOverlay, secondElementOverlay);
  }, 250);
};
