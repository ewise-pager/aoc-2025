import { solutions } from './solutions/index.ts';
import { Solution } from './solutions/Solution.ts';
import { performance } from 'perf_hooks';

function formatDuration(elapsed: number): string {
  if (elapsed < 1) {
    return `${(1000 * elapsed).toFixed(2)}µs`;
  } else if (elapsed < 1000) {
    return `${elapsed.toFixed(2)}ms`;
  } else {
    return `${(elapsed / 1000).toFixed(2)}s`;
  }
}

async function runSolution(solution: Solution): Promise<number> {
  try {
    await solution.loadInput();
  } catch (error) {
    console.error(
      `Failed to load input for ${solution.constructor.name}: ${error instanceof Error ? error.message : String(error)}`
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

  const totalElapsed = part1Elapsed + part2Elapsed;

  if (part1Result !== null || part2Result !== null) {
    console.log(`${dayName}:`);

    if (part1Result !== null) {
      console.log(`  Part 1: ${part1Result} (${formatDuration(part1Elapsed)})`);
    }

    if (part2Result !== null) {
      console.log(`  Part 2: ${part2Result} (${formatDuration(part2Elapsed)})`);
    }

    console.log(`  Total: ${formatDuration(totalElapsed)}`);
  }

  return totalElapsed;
}

async function main() {
  console.log('🎄 Advent of Code Solutions\n');

  let totalElapsed = 0;
  for (const solution of solutions) {
    const elapsed = await runSolution(solution);
    totalElapsed += elapsed;
    console.log('');
  }
  console.log(`All solutions: ${formatDuration(totalElapsed)}`);
}

await main();
