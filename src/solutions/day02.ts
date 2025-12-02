import { Solution } from '../lib/Solution.ts';

function isNumberRepeating(number: number): boolean {
    const numberString = number.toString();
    if (numberString.length % 2 !== 0) {
        return false;
    }
    let halfLength = numberString.length / 2;
    for (let i = 0; i < halfLength; i++) {
        if (numberString[i] !== numberString[i + halfLength]) {
            return false;
        }
    }
    return true;
}

export class Day02 extends Solution {
  exampleAnswer1 = '1227775554';
  ranges: number[][] = [];

  async parseInput(): Promise<void> {
    this.ranges = this.input.trim().split(',').map((range) => {
      return range.split('-').map(Number);
    });
  }

  async runPart1(): Promise<string | null> {
    let sum = 0;
    for (const [start, end] of this.ranges) {
        for (let i = start; i <= end; i++) {
            if (isNumberRepeating(i)) {
                sum += i;
            }
        }
    }
    return sum.toString();
  }

  async runPart2(): Promise<string | null> {
    return null;
  }
}