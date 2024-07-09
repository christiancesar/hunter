interface AountStringToNumber {
  amount: string;
  nameVariable?: string;
}
export function amountStringToNumber({
  amount,
  nameVariable,
}: AountStringToNumber): number {
  try {
    const amountFmt = amount.replace(/\./g, "").replace(",", ".");
    return parseFloat(amountFmt);
  } catch (error) {
    console.log(
      `
      amount: ${amount},
      nameVariable: ${nameVariable},
      error: ${error}
    `,
    );
  }

  return 0;
}
