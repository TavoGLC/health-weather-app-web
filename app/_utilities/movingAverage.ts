
function MovingAverage(data: number[], window: number): number[]{
    const result:any = [];
    if (data.length < window) {
        return result;
    }
    let sum = 0;
    for (let i = 0; i < window; ++i) {
        result.push(data[i])
        sum += data[i];
    }
    result.push(sum / window);
    const steps = data.length - window - 1;
    for (let i = 0; i < steps; ++i) {
        sum -= data[i];
        sum += data[i + window];
        result.push(sum / window);
    }
    return result;
};

export { MovingAverage }