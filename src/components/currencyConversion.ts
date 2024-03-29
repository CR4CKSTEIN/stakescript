import { globalState } from "../services/globals";

export class BaseCurrencyConverter {
  private displayElement: HTMLElement;

  constructor(selector: string) {
    const element = document.querySelector(selector);
    if (!element) {
      throw new Error("Display element for currency conversion not found");
    }
    this.displayElement = element as HTMLElement;
  }

  public updateDisplay(bitcoinAmount: number): void {
    const dollarValue = bitcoinAmount * globalState.currentBitcoinPriceInDollar;
    this.displayElement.textContent = `$${dollarValue.toFixed(2)}`;
  }
}

export class DynamicCurrencyConverter {
  private dollarConversionInstance: BaseCurrencyConverter;
  private secondElementOverlay: HTMLInputElement;
  private lastValue: string = "";

  constructor(
    secondElementSelector: string,
    conversionDisplaySelector: string
  ) {
    this.dollarConversionInstance = new BaseCurrencyConverter(
      conversionDisplaySelector
    );
    const element = document.querySelector(
      secondElementSelector
    ) as HTMLInputElement;
    if (!element) {
      throw new Error("Second element overlay could not be found");
    }
    this.secondElementOverlay = element;
    this.init();
  }

  private updateDisplay(): void {
    const secondValue = parseFloat(this.secondElementOverlay.value) || 0;
    this.dollarConversionInstance.updateDisplay(secondValue);
    this.lastValue = this.secondElementOverlay.value;
  }

  private init(): void {
    this.updateDisplay();
    setInterval(() => {
      if (this.secondElementOverlay.value !== this.lastValue) {
        this.updateDisplay();
      }
    }, 250);
  }
}
