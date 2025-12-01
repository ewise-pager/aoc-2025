import { Solution } from '../lib/Solution.ts';
export class Day01 extends Solution {
  lines: string[] = [];
  exampleAnswer1: string = '2';
  exampleAnswer2: string = '100'; // Intentionally wrong to display error output.

  async parseInput(): Promise<void> {
    this.lines = this.input.trim().split('\n');
  }

  async runPart1(): Promise<string | null> {
    // Example: Count the number of lines in the input
    return this.lines.length.toString();
  }

  async runPart2(): Promise<string | null> {
    // Example: Count the total number of characters
    return this.input.length.toString();
  }
}
