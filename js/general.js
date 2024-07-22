
export const General = (() => {
    const allEqual = (...values) => values.every(v => v === values[0]);
    const noEmptyBox = (...values) => values.every(v => v !== '-');
    const hasLineComplete = (...values) => allEqual(...values) && noEmptyBox(...values);
    return { allEqual, noEmptyBox, hasLineComplete }
})();