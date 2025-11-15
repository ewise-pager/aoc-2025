import { Solution } from './Solution.ts';

export class Day01 extends Solution {
  async runPart1(): Promise<string> {
    // Example: Count the number of lines in the input
    const lines = this.input.trim().split('\n');
    return lines.length.toString();
  }

  async runPart2(): Promise<string> {
    // Example: Count the total number of characters
    return this.input.length.toString();
  }
}
