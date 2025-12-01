import { readFile } from 'fs/promises';
import { join } from 'path';

export abstract class Solution {
  protected input: string = '';
  private _dayNumber: number | null | undefined = undefined;

  // Memoized getter for day number
  get dayNumber(): number | null {
    if (this._dayNumber === undefined) {
      const className = this.constructor.name;
      const match = className.match(/Day(\d+)/i);
      this._dayNumber = match ? parseInt(match[1], 10) : null;
    }
    return this._dayNumber;
  }

  async loadInput(): Promise<void> {
    if (this.dayNumber === null) {
      throw new Error(
        `Class name "${this.constructor.name}" must follow the pattern "Day01", "Day02", etc.`
      );
    }

    const inputPath = join(
      process.cwd(),
      'inputs',
      `day${this.dayNumber.toString().padStart(2, '0')}`,
      'input.txt'
    );

    try {
      this.input = await readFile(inputPath, 'utf-8');
    } catch (error) {
      throw new Error(
        `Failed to read input file for ${this.constructor.name} at ${inputPath}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async parseInput(): Promise<void> {}

  async runPart1(): Promise<string | null> {
    return null;
  }

  async runPart2(): Promise<string | null> {
    return null;
  }
}
