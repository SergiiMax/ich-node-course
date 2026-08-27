export function generateFibonacci(maxLimit: number): number[] {
  if (maxLimit < 0) return [];
  if (maxLimit === 0) return [0];

  const result: number[] = [0, 1];
  while (true) {
    const next = result[result.length - 1] + result[result.length - 2];
    if (next > maxLimit) break;
    result.push(next);
  }
  return result;
}

export function generatePrimeNumbers(maxLimit: number): number[] {
  const primes: number[] = [];
  
  for (let i = 2; i <= maxLimit; i++) {
    let isPrime = true;
    for (let j = 2; j <= Math.sqrt(i); j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  
  return primes;
}