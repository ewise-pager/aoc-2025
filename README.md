# Advent of Code - TypeScript Base

A base repository for solving Advent of Code puzzles in TypeScript using Node.js 25+.

## Features

- 🎄 Simple base class structure for daily solutions
- 📁 Automatic input file reading
- 🚀 Run directly with Node.js type stripping or bundle with esbuild
- 📝 TypeScript with strict mode enabled

## Prerequisites

- Node.js 25 or higher

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your puzzle input:**
   - Create a directory for each day: `src/inputs/day1/`, `src/inputs/day2/`, etc.
   - Place your puzzle input in `input.txt` within each day's directory

3. **Create a solution:**
   - Copy the pattern from `src/solutions/day01.ts`
   - Name your class `Day01`, `Day02`, etc. (the number will be used to find the input file)
   - Implement `runPart1()` and/or `runPart2()` methods
   - Return your answer as a string

4. **Register your solution:**
   - Add your solution class to the array in `src/solutions/index.ts`

## Running Solutions

### Development Mode (Fast startup)
Run directly with Node.js native TypeScript support:
```bash
npm run dev
```

With file watching (reruns on changes):
```bash
npm run dev:watch
```

### Production Mode (Optimized)
Build and run the bundled version:
```bash
npm run build
npm start
```

Build with file watching:
```bash
npm run build:watch
```

## Example Solution

```typescript
import { Solution } from './Solution.ts';

export class Day01 extends Solution {
  async runPart1(): Promise<string | null> {
    // this.input contains your puzzle input as a string
    const lines = this.input.trim().split('\n');
    // Your solution logic here
    return lines.length.toString();
  }

  async runPart2(): Promise<string | null> {
    // Implement part 2
    // Return null if not implemented yet (will skip printing)
    return this.input.length.toString();
  }
}
```

## Project Structure

```
aoc-base/
├── src/
│   ├── main.ts              # Entry point
│   ├── solutions/
│   │   ├── Solution.ts      # Base class
│   │   ├── day01.ts         # Example solution
│   │   └── index.ts         # Solution registry
│   └── inputs/
│       └── day1/
│           └── input.txt    # Puzzle input
├── package.json
├── tsconfig.json
└── build.mjs                # esbuild configuration
```

## Tips

- The base `Solution` class reads input files based on your class name (e.g., `Day01` → `day1/input.txt`)
- Input files must be at `src/inputs/day{N}/input.txt` where N matches your class name
- Both `runPart1()` and `runPart2()` return `null` by default - implement only what you need
- Return `null` from a part method to skip printing it (useful for unimplemented parts)
- Methods are async, so you can use `await` if needed
- Return values should be strings - convert numbers/objects as needed
- Input loading is deferred until `loadInput()` is called (handled automatically by main)

## Forking and Customization

This repository is designed to be forked and customized:
- Reorganize solutions by year if you want to reuse it across multiple years
- Modify the output formatting in `src/main.ts`
- Add utility functions or helpers as needed
- Update `.gitignore` to include/exclude input files based on your preference

Happy coding! 🎄

