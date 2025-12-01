import { solutions } from './solutions/index.ts';
import { Solution } from './solutions/Solution.ts';
import { performance } from 'perf_hooks';
import { program } from 'commander';

// ANSI Color Codes
const Colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  invert: '\x1b[7m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
};

function formatDuration(elapsed: number): string {
  if (elapsed < 1) {
    return `${(1000 * elapsed).toFixed(2)}µs`;
  } else if (elapsed < 1000) {
    return `${elapsed.toFixed(2)}ms`;
  } else {
    return `${(elapsed / 1000).toFixed(2)}s`;
  }
}

function colorizePerformance(elapsed: number): string {
  const duration = formatDuration(elapsed);

  if (elapsed < 1) {
    // < 1ms: Green
    return `${Colors.green}${duration}${Colors.reset}`;
  } else if (elapsed < 100) {
    // 1-100ms: Normal (no color)
    return duration;
  } else if (elapsed < 1000) {
    // 100-1000ms: Yellow
    return `${Colors.yellow}${duration}${Colors.reset}`;
  } else {
    // > 1000ms: Red
    return `${Colors.red}${duration}${Colors.reset}`;
  }
}

const TOP_BANNER = (() => {
  let str = '';
  for (let i = 0; i < 80; i++) {
    if (i % 2 === 0) {
      str += Colors.brightRed;
    } else {
      str += Colors.brightGreen;
    }
    if (i === 0) {
      str += '╔';
    } else if (i === 79) {
      str += '╗';
    } else {
      str += '═';
    }
    str += Colors.reset;
  }
  return str;
})();

const BOTTOM_BANNER = (() => {
  let str = '';
  for (let i = 0; i < 80; i++) {
    if (i % 2 === 0) {
      str += Colors.brightRed;
    } else {
      str += Colors.brightGreen;
    }
    if (i === 0) {
      str += '╚';
    } else if (i === 79) {
      str += '╝';
    } else {
      str += '═';
    }
  }
  str += Colors.reset;
  return str;
})();

function printBanner(): void {
  const bannerWidth = 80;
  const title = '🎄 ⭐ Advent of Code Solutions ⭐ 🎄';
  const titlePlainLength = 24; // "Advent of Code Solutions"
  const emojisApproxWidth = 12; // Approximate width of emojis in the title
  const totalContentWidth = titlePlainLength + emojisApproxWidth;
  const leftPadding = Math.floor((bannerWidth - 2 - totalContentWidth) / 2);
  const rightPadding = bannerWidth - 2 - totalContentWidth - leftPadding;

  // Alternating red and green borders in a candy cane pattern
  console.log(TOP_BANNER);
  console.log(
    `${Colors.brightGreen}║${Colors.reset}${' '.repeat(bannerWidth - 2)}${Colors.brightRed}║${Colors.reset}`
  );
  console.log(
    `${Colors.brightRed}║${Colors.reset}${' '.repeat(leftPadding)}${Colors.brightYellow}${title}${Colors.reset}${' '.repeat(rightPadding)}${Colors.brightGreen}║${Colors.reset}`
  );
  console.log(
    `${Colors.brightGreen}║${Colors.reset}${' '.repeat(bannerWidth - 2)}${Colors.brightRed}║${Colors.reset}`
  );
  console.log(BOTTOM_BANNER);
  console.log('');
}

function printDayResults(
  dayNumber: number | null,
  dayName: string,
  part1Result: string | null,
  part1Elapsed: number,
  part2Result: string | null,
  part2Elapsed: number,
  exampleMode: boolean = false
): void {
  const totalElapsed = part1Elapsed + part2Elapsed;

  if (part1Result !== null || part2Result !== null) {
    // Show example mode indicator if applicable
    if (exampleMode) {
      console.log(`${Colors.yellow}📝 Running in example mode${Colors.reset}\n`);
    }
    
    // Day label with inverted colors, followed by colored time
    console.log(
      `${Colors.invert}${Colors.bold} ${dayName} ${Colors.reset} ${colorizePerformance(totalElapsed)}`
    );

    if (part1Result !== null) {
      console.log(
        `├─ Part 1: ${part1Result} (${formatDuration(part1Elapsed)})`
      );
    }

    if (part2Result !== null) {
      console.log(
        `└─ Part 2: ${part2Result} (${formatDuration(part2Elapsed)})`
      );
    }
  }
}

async function runSolution(solution: Solution, exampleMode: boolean = false): Promise<number> {
  try {
    await solution.loadInput(exampleMode);
  } catch (error) {
    console.error(
      `Failed to load input for ${solution.constructor.name}: ${error instanceof Error ? error.message : String(error)}`
    );
    return 0;
  }

  try {
    await solution.parseInput();
  } catch (error) {
    console.error(
      `Failed to parse input for ${solution.constructor.name}: ${error instanceof Error ? error.message : String(error)}`
    );
    return 0;
  }

  const dayNumber = solution.dayNumber;
  const dayName =
    dayNumber !== null ? `Day ${dayNumber}` : solution.constructor.name;

  let part1Result: string | null = null;
  let part1Elapsed = 0;
  try {
    const part1Start = performance.now();
    part1Result = await solution.runPart1();
    const part1End = performance.now();
    part1Elapsed = part1End - part1Start;
  } catch (error) {
    console.error(
      `  Part 1: ERROR - ${error instanceof Error ? error.message : String(error)}`
    );
  }

  let part2Result: string | null = null;
  let part2Elapsed = 0;
  try {
    const part2Start = performance.now();
    part2Result = await solution.runPart2();
    const part2End = performance.now();
    part2Elapsed = part2End - part2Start;
  } catch (error) {
    console.error(
      `  Part 2: ERROR - ${error instanceof Error ? error.message : String(error)}`
    );
  }

  printDayResults(
    dayNumber,
    dayName,
    part1Result,
    part1Elapsed,
    part2Result,
    part2Elapsed,
    exampleMode
  );

  return part1Elapsed + part2Elapsed;
}

async function runSingleDay(dayNumber: number, exampleMode: boolean = false): Promise<void> {
  const solution = solutions.find((s) => s.dayNumber === dayNumber);

  if (!solution) {
    console.error(`Error: No solution found for day ${dayNumber}`);
    process.exit(1);
  }

  try {
    await solution.loadInput(exampleMode);
  } catch (error) {
    console.error(
      `Failed to load input for day ${dayNumber}: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }

  try {
    await solution.parseInput();
  } catch (error) {
    console.error(
      `Failed to parse input for day ${dayNumber}: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }

  const dayName = `Day ${dayNumber}`;

  let part1Result: string | null = null;
  let part1Elapsed = 0;
  try {
    const part1Start = performance.now();
    part1Result = await solution.runPart1();
    const part1End = performance.now();
    part1Elapsed = part1End - part1Start;
  } catch (error) {
    console.error(
      `  Part 1: ERROR - ${error instanceof Error ? error.message : String(error)}`
    );
  }

  let part2Result: string | null = null;
  let part2Elapsed = 0;
  try {
    const part2Start = performance.now();
    part2Result = await solution.runPart2();
    const part2End = performance.now();
    part2Elapsed = part2End - part2Start;
  } catch (error) {
    console.error(
      `  Part 2: ERROR - ${error instanceof Error ? error.message : String(error)}`
    );
  }

  printDayResults(
    dayNumber,
    dayName,
    part1Result,
    part1Elapsed,
    part2Result,
    part2Elapsed,
    exampleMode
  );
}

async function runAllDays(exampleMode: boolean = false): Promise<void> {
  printBanner();

  let totalElapsed = 0;
  for (const solution of solutions) {
    const elapsed = await runSolution(solution, exampleMode);
    totalElapsed += elapsed;
    console.log('');
  }

  // Final summary with styling
  console.log(
    `${Colors.bold}❄️  All solutions: ${colorizePerformance(totalElapsed)}${Colors.reset}`
  );
}

async function main() {
  program
    .name('aoc-base')
    .description('Run Advent of Code solutions')
    .argument('[day]', 'Run only a specific day (1-25)')
    .option('-e, --example', 'Use example.txt instead of input.txt', false)
    .action(async (day?: string, options?: { example: boolean }) => {
      const exampleMode = options?.example ?? false;
      
      if (day) {
        const dayNumber = parseInt(day, 10);
        if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
          console.error('Error: Day must be a number between 1 and 25');
          process.exit(1);
        }
        await runSingleDay(dayNumber, exampleMode);
      } else {
        await runAllDays(exampleMode);
      }
    });

  await program.parseAsync();
}

await main();
