# Advent of Code - TypeScript Base

A base repository for solving Advent of Code puzzles in TypeScript using Node.js 25+.

## Features

- 🎄 Simple base class structure for daily solutions
- 📁 Automatic input file reading
- 🚀 Run directly with Node.js type stripping or bundle with esbuild
- 📝 TypeScript with strict mode enabled
- 🎯 CLI support to run all days or a specific day
- ⏱️ Automatic performance timing with color-coded output
- 🎨 Festive terminal UI with candy cane borders
- ✅ Example mode with answer validation

## Prerequisites

- Node.js 25 or higher

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add your puzzle input:**
   - Create a directory for each day: `inputs/day01/`, `inputs/day02/`, etc.
   - Place your puzzle input in `input.txt` within each day's directory
   - Optionally place example input from the problem in `example.txt` for testing

3. **Create a solution:**
   - Copy the pattern from `src/solutions/day01.ts`
   - Name your class `Day01`, `Day02`, etc. (the number will be used to find the input file)
   - Implement `runPart1()` and/or `runPart2()` methods
   - Return your answer as a string

4. **Register your solution:**
   - Add your solution class to the array in `src/solutions/index.ts`

## Running Solutions

### Run All Days
Run all implemented solutions with a festive banner and total timing:

**Development Mode (Fast startup):**
```bash
npm run dev
```

**Production Mode (Optimized):**
```bash
npm run build
npm start
```

### Run a Specific Day
Run a single day's solution with formatted output (no banner or total time):

**Development Mode:**
```bash
node src/main.ts <day>
# Example: Run day 1
node src/main.ts 1
```

**Production Mode:**
```bash
npm start -- <day>
# Example: Run day 5
npm start -- 5
```

### Example Mode
Run solutions using `example.txt` instead of `input.txt`, with automatic answer validation:

```bash
# Run all days in example mode
npm start -- --example

# Run a specific day in example mode
npm start -- 1 --example
```

When using example mode with expected answers defined, answers will be:
- ✅ Colored **green** with a checkmark if correct
- ❌ Colored **red** with an X and showing the expected answer if incorrect

### Build Options
Build with file watching for development:
```bash
npm run build:watch
```

### Help
View available command line options:
```bash
node src/main.ts --help
```

## Example Solution

The `exampleAnswer1` and `exampleAnswer2` properties are optional but highly recommended when you have example input from the problem. They allow you to validate your solution against known answers before running on the actual puzzle input. The dummy solution for day one shows how to set these. You should put the `example.txt` file in the same folder as the day's input.

## Project Structure

```
aoc-base/
├── src/
│   ├── main.ts              # Entry point with CLI
│   ├── lib/
│   │   └── Solution.ts      # Base class
│   └── solutions/
│       ├── day01.ts         # Example solution
│       └── index.ts         # Solution registry
├── inputs/
│   └── day01/
│       ├── input.txt        # Puzzle input
│       └── example.txt      # Example input
├── dist/
│   └── bundle.js            # Built output
├── package.json
├── tsconfig.json
└── build.mjs                # esbuild configuration
```

## Tips

- The base `Solution` class reads input files based on your class name (e.g., `Day01` → `day01/input.txt`)
- Input files must be at `inputs/day{NN}/input.txt` where NN is the zero-padded day number (e.g., `day01`, `day02`, etc.)
- Example files should be at `inputs/day{NN}/example.txt`
- Common parsing logic can be implemented in `parseInput` which runs once before parts 1 and 2 - this time will not be counted against you
- Both `runPart1()` and `runPart2()` return `null` by default - implement only what you need
- Return `null` from a part method to skip printing it (useful for unimplemented parts)
- Methods are async, so you can use `await` if needed
- Return values should be strings - convert numbers/objects as needed
- Input loading is deferred until `loadInput()` is called (handled automatically by main)
- When running a specific day, the output format is the same as running all days (just without the banner)
- Performance timing is color-coded: 🟢 green (<1ms), white (1-100ms), 🟡 yellow (100-1000ms), 🔴 red (>1s)
- Set the `exampleAnswer1` and `exampleAnswer2` properties to specify expected answers for example mode testing
- The example answer properties should be strings (though the solution can work with numbers, strings are recommended for clarity)

## Forking and Customization

This repository is designed to be forked and customized:
- Reorganize solutions by year if you want to reuse it across multiple years
- Modify the output formatting in `src/main.ts`
- Add utility functions or helpers as needed
- Update `.gitignore` to include/exclude input files based on your preference

Happy coding! 🎄

