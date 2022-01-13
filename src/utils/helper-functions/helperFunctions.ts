export const numberWithCommas = (number: number | undefined | any) => {
    if (number?.toString().includes('0000')) {
        return parseFloat(number)
            .toFixed(2)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    }

    return number
        ? (Math.round(number * 100) / 100)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
        : number;
};
