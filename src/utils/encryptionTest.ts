/**
 * Encryption Test & Demo
 * 
 * ไฟล์นี้แสดงตัวอย่างการทำงานของ encryption ในแต่ละ environment
 * ใช้สำหรับทดสอบและทำความเข้าใจการทำงาน
 */

import { secureStorage } from './secureStorage';
import { wmsStorage } from './wmsStorage';

/**
 * ทดสอบ Encryption ในแต่ละ Environment
 */
export const testEncryption = () => {
    console.log('='.repeat(60));
    console.log('🧪 Encryption Test & Demo');
    console.log('='.repeat(60));

    // 1. แสดงข้อมูล Environment
    console.log('\n📌 Environment Info:');
    console.log(`- REACT_APP_ENV: ${process.env.REACT_APP_ENV || 'undefined'}`);
    console.log(`- NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`- Encryption Enabled: ${secureStorage.isEncryptionEnabled() ? '✅ YES' : '❌ NO'}`);

    // 2. ทดสอบบันทึกข้อมูล
    console.log('\n📝 Testing Storage Write...');

    const testData = {
        token: 'test-jwt-token-12345',
        user: {
            id: '999',
            username: 'test-user',
            email: 'test@example.com'
        }
    };

    wmsStorage.setWMSData(testData);
    console.log('✅ Data saved:', testData);

    // 3. แสดงข้อมูลใน localStorage
    console.log('\n💾 localStorage Value:');
    const key = 'wms_rebirth_v1__wms';
    const rawValue = localStorage.getItem(key);

    if (rawValue) {
        console.log(`Key: ${key}`);
        console.log(`Raw Value (first 100 chars):`);
        console.log(rawValue.substring(0, 100));

        if (secureStorage.isEncryptionEnabled()) {
            console.log('🔐 Data is ENCRYPTED (cannot read directly)');
        } else {
            console.log('🔓 Data is PLAIN (readable)');
        }
    }

    // 4. ทดสอบอ่านข้อมูล
    console.log('\n📖 Testing Storage Read...');
    const readData = wmsStorage.getWMSData();
    console.log('✅ Data read:', readData);

    // 5. ตรวจสอบความถูกต้อง
    console.log('\n✔️  Verification:');
    const isMatch = JSON.stringify(testData) === JSON.stringify(readData);
    console.log(`- Data Match: ${isMatch ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`- Token: ${readData.token === testData.token ? '✅' : '❌'}`);
    console.log(`- User ID: ${readData.user?.id === testData.user.id ? '✅' : '❌'}`);

    // 6. Clean up
    console.log('\n🧹 Cleaning up test data...');
    wmsStorage.clearWMSData();
    console.log('✅ Cleanup complete');

    console.log('\n' + '='.repeat(60));
};

/**
 * แสดงตัวอย่างการใช้งานในแต่ละ Environment
 */
export const showExamples = () => {
    console.log('\n📚 Usage Examples:');
    console.log('\n1️⃣  Development Mode (npm run start:dev)');
    console.log('   - Encryption: DISABLED');
    console.log('   - localStorage value: {"token":"xxx","user":{...}}');
    console.log('   - Can read directly in DevTools ✅');

    console.log('\n2️⃣  UAT Mode (npm run start:uat)');
    console.log('   - Encryption: ENABLED');
    console.log('   - localStorage value: "Q1hZWE5ZQk5aSFlOWV..."');
    console.log('   - Cannot read directly ❌');

    console.log('\n3️⃣  Production Mode (npm run start:prod)');
    console.log('   - Encryption: ENABLED');
    console.log('   - localStorage value: "Q1hZWE5ZQk5aSFlOWV..."');
    console.log('   - Cannot read directly ❌');

    console.log('\n💡 Tips:');
    console.log('   - Use wmsStorage.debug() to inspect data');
    console.log('   - Check console for encryption status on app start');
    console.log('   - Clear storage when switching environments');
};

/**
 * เปรียบเทียบ Encrypted vs Plain
 */
export const compareEncryptedVsPlain = () => {
    const sampleData = { token: 'my-secret-token', user: { id: '123' } };
    const jsonString = JSON.stringify(sampleData);

    console.log('\n🔄 Encrypted vs Plain Comparison:');
    console.log('\n📝 Original Data:');
    console.log(jsonString);
    console.log(`Length: ${jsonString.length} characters`);

    console.log('\n🔐 If Encrypted (UAT/Prod):');
    console.log('Q1hZWE5ZQk5aSFlOWVhCTlpIWU5ZWEJOWkhZTllYQk5aSFlOWVhCTg==');
    console.log('Length: ~64+ characters (Base64)');
    console.log('Readable: ❌ NO');

    console.log('\n🔓 If Plain (Dev):');
    console.log(jsonString);
    console.log(`Length: ${jsonString.length} characters`);
    console.log('Readable: ✅ YES');
};

// Export สำหรับใช้ใน Browser Console
if (process.env.NODE_ENV === 'development') {
    (window as any).encryptionTest = testEncryption;
    (window as any).encryptionExamples = showExamples;
    (window as any).encryptionCompare = compareEncryptedVsPlain;

    console.log('\n💡 Test functions available in console:');
    console.log('   - encryptionTest() - Run full test');
    console.log('   - encryptionExamples() - Show examples');
    console.log('   - encryptionCompare() - Compare encrypted vs plain');
}
