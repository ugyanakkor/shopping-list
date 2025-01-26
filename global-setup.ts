import { FullConfig } from '@playwright/test';
import { exec } from 'child_process';

let serverProcess: ReturnType<typeof exec>;

async function globalSetup(config: FullConfig) {
  console.log('Starting the server...');
  serverProcess = exec('pnpm start', { env: process.env });

  serverProcess.stdout?.on('data', data => {
    console.log(data.toString());
  });

  serverProcess.stderr?.on('data', data => {
    console.error(data.toString());
  });

  // Wait for the server to start
  await new Promise(resolve => setTimeout(resolve, 5000)); // Adjust delay as needed
}

async function globalTeardown() {
  console.log('Stopping the server...');
  if (serverProcess) {
    serverProcess.kill();
  }
}

export default globalSetup;
export { globalTeardown };
