import type { Context } from "@resonatehq/sdk";

export async function generateReport(ctx: Context, userId: number): Promise<string> {
  const timestamp = new Date().toISOString();
  const report = `[${timestamp}] Report for user ${userId}`;
  console.log(report);
  return report;
}
