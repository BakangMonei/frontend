module.exports = {
    testDir: './src',
    timeout: 30000,
    expect: {
      timeout: 5000,
    },
    reporter: [['list']],
    use: {
      headless: true,
      viewport: { width: 1280, height: 720 },
      actionTimeout: 5000,
    },
  };
  