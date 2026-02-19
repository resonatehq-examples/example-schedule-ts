# Scheduled Function | Resonate Example

Schedule a TypeScript function to run periodically using Resonate's high-level `schedule()` API.

## Overview

This example shows how to use Resonate's `schedule()` method to register a function as a periodic job using a cron expression. The Resonate server triggers the function automatically, and a worker processes each execution durably.

```typescript
// Register the function
resonate.register("generateReport", generateReport);

// Schedule it to run every minute
await resonate.schedule(
  "daily_report",  // schedule ID
  "* * * * *",     // cron expression
  generateReport,  // function to schedule
  123,             // arguments
);
```

## Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Resonate server](https://docs.resonatehq.io) running locally

## Setup

### 1. Start the Resonate server

```bash
resonate dev
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the schedule

Run this once to register the cron schedule with the Resonate server:

```bash
npm run schedule
```

### 4. Start the worker

Run the worker to process each scheduled execution:

```bash
npm run worker
```

Every minute, you'll see output like:

```
[2026-02-18T09:00:00.000Z] Report for user 123
[2026-02-18T09:01:00.000Z] Report for user 123
```

## How It Works

| Component | Role |
|-----------|------|
| `src/schedule.ts` | Creates the cron schedule on the Resonate server (run once) |
| `src/worker.ts` | Registers the function and polls for executions (run continuously) |
| `src/report.ts` | The function that runs on each scheduled tick |

The Resonate server fires a new durable promise on each cron tick. The worker picks it up, executes the function, and records the result. If the worker crashes, Resonate retries the execution automatically.

## Cron Reference

| Expression | Meaning |
|------------|---------|
| `* * * * *` | Every minute |
| `0 9 * * *` | Daily at 9am |
| `0 9 * * 1-5` | Weekdays at 9am |
| `*/30 * * * *` | Every 30 minutes |
