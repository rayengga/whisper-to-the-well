#!/usr/bin/env node

/**
 * Installation Verification Script
 * Checks if all components are properly set up
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Emotion Analysis API - Installation Check\n');
console.log('==============================================\n');

let hasErrors = false;

// Check Node.js version
console.log('1. Checking Node.js version...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion >= 18) {
  console.log(`   ✅ Node.js ${nodeVersion} (>= 18 required)\n`);
} else {
  console.log(`   ❌ Node.js ${nodeVersion} is too old (>= 18 required)\n`);
  hasErrors = true;
}

// Check required files
console.log('2. Checking required files...');
const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'next.config.js',
  'app/api/analyze/route.ts',
  'lib/emotionAnalyzer.ts',
  'lib/emotionStore.ts',
  'lib/trendAnalysis.ts',
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} is missing`);
    hasErrors = true;
  }
});
console.log('');

// Check node_modules
console.log('3. Checking dependencies...');
if (fs.existsSync('node_modules')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = Object.keys(packageJson.dependencies || {});
  
  let missingDeps = [];
  requiredDeps.forEach(dep => {
    const depPath = path.join('node_modules', dep);
    if (!fs.existsSync(depPath)) {
      missingDeps.push(dep);
    }
  });

  if (missingDeps.length === 0) {
    console.log(`   ✅ All ${requiredDeps.length} dependencies installed`);
  } else {
    console.log(`   ❌ Missing dependencies: ${missingDeps.join(', ')}`);
    console.log('   Run: npm install');
    hasErrors = true;
  }
} else {
  console.log('   ❌ node_modules not found');
  console.log('   Run: npm install');
  hasErrors = true;
}
console.log('');

// Check documentation
console.log('4. Checking documentation...');
const docs = ['README.md', 'QUICKSTART.md', 'ARCHITECTURE.md'];
docs.forEach(doc => {
  if (fs.existsSync(doc)) {
    console.log(`   ✅ ${doc}`);
  } else {
    console.log(`   ⚠️  ${doc} is missing (optional)`);
  }
});
console.log('');

// Check test files
console.log('5. Checking test utilities...');
const testFiles = ['test-api.sh', 'examples/example.mjs', 'start.sh'];
testFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ⚠️  ${file} is missing (optional)`);
  }
});
console.log('');

// Summary
console.log('==============================================\n');
if (hasErrors) {
  console.log('❌ Installation has errors. Please fix them before proceeding.\n');
  process.exit(1);
} else {
  console.log('✅ Installation looks good!\n');
  console.log('Next steps:');
  console.log('  1. Start the server: npm run dev');
  console.log('  2. Wait for model to load (10-30s on first run)');
  console.log('  3. Test the API:');
  console.log('     curl -X POST http://localhost:3000/api/analyze \\');
  console.log('       -H "Content-Type: application/json" \\');
  console.log('       -d \'{"text": "I am so happy today!"}\'');
  console.log('');
  console.log('📖 Documentation:');
  console.log('  • Quick Start: QUICKSTART.md');
  console.log('  • Full Docs:   README.md');
  console.log('  • Architecture: ARCHITECTURE.md');
  console.log('');
  process.exit(0);
}
