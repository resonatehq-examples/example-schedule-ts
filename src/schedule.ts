/**
 * Run this script once to create the schedule.
 * The Resonate server will trigger `generateReport` according to the cron expression.
 */
import { Resonate } from "@resonatehq/sdk";
import { generateReport } from "./report";

const resonate = new Resonate({ url: "http://localhost:8001" });
resonate.register("generateReport", generateReport);

async function main() {
  try {
    // Schedule generateReport to run every minute
    await resonate.schedule(
      "daily_report",  // schedule ID
      "* * * * *",     // cron: every minute (change to "0 9 * * *" for daily at 9am)
      generateReport,  // function to run
      123,             // userId argument
    );
    console.log("Schedule created. Start the worker to process executions.");
  } catch (e: any) {
    if (e?.serverError?.code === 40901) {
      console.log("Schedule already exists. Start the worker to process executions.");
    } else {
      throw e;
    }
  } finally {
    resonate.stop();
  }
}

main().catch(console.error);
