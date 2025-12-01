import { Solution } from '../lib/Solution.ts';
export class Day01 extends Solution {
  turns: number[] = [];
  exampleAnswer1 = '3';
  exampleAnswer2 = '6';

  async parseInput(): Promise<void> {
    this.turns = this.input
      .trim()
      .split('\n')
      .map((line) => {
        if (line.startsWith('L')) {
          return -parseInt(line.slice(1));
        } else {
          return parseInt(line.slice(1));
        }
      });
  }

  // Count each time the dial points to zero *at the end of a turn*.
  async runPart1(): Promise<string | null> {
    let dial = 50;
    let zeroCount = 0;
    for (const turn of this.turns) {
      dial += turn;
      dial = dial % 100; // We don't need to normalize for part 1.
      if (dial === 0) {
        zeroCount++;
      }
    }
    return zeroCount.toString();
  }

  // Count each time the dial points to zero *even during a turn*.
  async runPart2(): Promise<string | null> {
    let dial = 50;
    let zeroCount = 0;
    for (const turn of this.turns) {
      // Need to handle the case where the dial starts at zero differently
      // to avoid double counting.
      const complement = dial === 0 ? 0 : turn > 0 ? 100 - dial : dial;
      const offset = dial === 0 ? 0 : 1;
      const turnSize = Math.abs(turn);
      if (turnSize >= complement) {
        zeroCount += Math.floor((turnSize - complement) / 100) + offset;
      }
      dial += turn;
      dial = ((dial % 100) + 100) % 100; // Normalize to positive position.
    }
    return zeroCount.toString();
  }
}
