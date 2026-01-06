// scripts/update-version.js
/**
 * Script สำหรับอัพเดต Version อัตโนมัติ
 * 
 * วิธีใช้:
 *   node scripts/update-version.js patch   // 1.0.0 -> 1.0.1
 *   node scripts/update-version.js minor   // 1.0.1 -> 1.1.0
 *   node scripts/update-version.js major   // 1.1.0 -> 2.0.0
 */

const fs = require('fs');
const path = require('path');

// อ่าน argument
const versionType = process.argv[2]; // patch, minor, major

if (!versionType || !['patch', 'minor', 'major'].includes(versionType)) {
    console.error('❌ Usage: node scripts/update-version.js [patch|minor|major]');
    process.exit(1);
}

// Path ไปยังไฟล์ที่ต้องอัพเดต
const VERSION_CONFIG_PATH = path.join(__dirname, '../src/config/version.config.ts');
const PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');

// อ่านไฟล์ version.config.ts
let versionConfig = fs.readFileSync(VERSION_CONFIG_PATH, 'utf8');

// Extract version ปัจจุบัน
const majorMatch = versionConfig.match(/major:\s*(\d+)/);
const minorMatch = versionConfig.match(/minor:\s*(\d+)/);
const patchMatch = versionConfig.match(/patch:\s*(\d+)/);

if (!majorMatch || !minorMatch || !patchMatch) {
    console.error('❌ ไม่สามารถอ่าน version จาก version.config.ts');
    process.exit(1);
}

let major = parseInt(majorMatch[1]);
let minor = parseInt(minorMatch[1]);
let patch = parseInt(patchMatch[1]);

const oldVersion = `${major}.${minor}.${patch}`;

// คำนวณ version ใหม่
switch (versionType) {
    case 'major':
        major++;
        minor = 0;
        patch = 0;
        break;
    case 'minor':
        minor++;
        patch = 0;
        break;
    case 'patch':
        patch++;
        break;
}

const newVersion = `${major}.${minor}.${patch}`;

console.log(`\n📦 Updating version: ${oldVersion} → ${newVersion}\n`);

// อัพเดต version.config.ts
versionConfig = versionConfig.replace(
    /major:\s*\d+/,
    `major: ${major}`
);
versionConfig = versionConfig.replace(
    /minor:\s*\d+/,
    `minor: ${minor}`
);
versionConfig = versionConfig.replace(
    /patch:\s*\d+/,
    `patch: ${patch}`
);

fs.writeFileSync(VERSION_CONFIG_PATH, versionConfig);
console.log('✅ Updated version.config.ts');

// อัพเดต package.json
const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
packageJson.version = newVersion;
fs.writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(packageJson, null, 2) + '\n');
console.log('✅ Updated package.json');

console.log(`\n🎉 Version updated successfully!\n`);
console.log('Next steps:');
console.log('  1. git add .');
console.log(`  2. git commit -m "chore: bump version to ${newVersion}"`);
console.log(`  3. git tag v${newVersion}`);
console.log('  4. git push origin main --tags\n');
