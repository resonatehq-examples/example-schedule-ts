/**
 * Run this script to start processing scheduled executions.
 * The worker polls the Resonate server for tasks created by the scheduler.
 */
import { Resonate } from "@resonatehq/sdk";
import { generateReport } from "./report";

const resonate = new Resonate({ url: "http://localhost:8001" });
resonate.register("generateReport", generateReport);

console.log("Worker started. Waiting for scheduled executions...");

process.on("SIGINT", () => {
  resonate.stop();
  process.exit(0);
});

process.on("SIGTERM", () => {
  resonate.stop();
  process.exit(0);
});
