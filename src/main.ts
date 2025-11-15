import { solutions } from './solutions/index.ts';

async function main() {
  console.log('🎄 Advent of Code Solutions\n');

  for (const solution of solutions) {
    try {
      // Load input before running parts
      await solution.loadInput();
      
      const dayNumber = solution.dayNumber;
      const dayName = dayNumber !== null ? `Day ${dayNumber}` : solution.constructor.name;
      
      console.log(`${dayName}:`);
      
      try {
        const part1Result = await solution.runPart1();
        if (part1Result !== null) {
          console.log(`  Part 1: ${part1Result}`);
        }
      } catch (error) {
        console.error(`  Part 1: ERROR - ${error instanceof Error ? error.message : String(error)}`);
      }
      
      try {
        const part2Result = await solution.runPart2();
        if (part2Result !== null) {
          console.log(`  Part 2: ${part2Result}`);
        }
      } catch (error) {
        console.error(`  Part 2: ERROR - ${error instanceof Error ? error.message : String(error)}`);
      }
      
      console.log('');
    } catch (error) {
      console.error(`Failed to initialize ${solution.constructor.name}: ${error instanceof Error ? error.message : String(error)}\n`);
    }
  }
}

main().catch(console.error);

