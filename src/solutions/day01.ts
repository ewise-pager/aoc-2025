import { Solution } from '../lib/Solution.ts';
export class Day01 extends Solution {
  turns: number[] = [];
  exampleAnswer1 = '3';
  exampleAnswer2 = '6';

  async parseInput(): Promise<void> {
    for (const line of this.input.trim().split('\n')) {
      if (line.startsWith('L')) {
        this.turns.push(-parseInt(line.slice(1)));
      } else {
        this.turns.push(parseInt(line.slice(1)));
      }
    }
  }

  async runPart1(): Promise<string | null> {
    let dial = 50;
    let zeroCount = 0;
    for (const turn of this.turns) {
      dial += turn;
      dial = dial % 100;
      if (dial === 0) {
        zeroCount++;
      }
    }
    return zeroCount.toString();
  }

  // Currently wrong
  async runPart2(): Promise<string | null> {
    let dial = 50;
    let zeroCount = 0;
    for (const turn of this.turns) {
      const complement = turn > 0 ? 100 - dial : dial;
      if (Math.abs(turn) >= dial) {
        zeroCount += Math.floor((Math.abs(turn) - complement) / 100) + 1;
      }
      dial += turn;
      dial = dial % 100;
      if (dial < 0) {
        dial += 100;
      }
    }
    return zeroCount.toString();
  }
}
