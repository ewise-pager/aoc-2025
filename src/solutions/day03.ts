import { Solution } from '../lib/Solution.ts';

// slow, can probably be done via double pointer
function findMaxPair(bank: number[]): number {
  let maxPair = 0;
  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const pair = Number(bank[i].toString() + bank[j].toString());
      maxPair = Math.max(maxPair, pair);
    }
  }
  return maxPair;
}

export class Day03 extends Solution {
  exampleAnswer1 = '357';
  banks: number[][] = [];

  async parseInput(): Promise<void> {
    this.banks = this.input
      .trim()
      .split('\n')
      .map((line) => {
        return line.split('').map(Number);
      });
  }

  async runPart1(): Promise<string | null> {
    let sum = 0;
    for (const bank of this.banks) {
      sum += findMaxPair(bank);
    }
    return sum.toString();
  }

  async runPart2(): Promise<string | null> {
    return null;
  }
}
