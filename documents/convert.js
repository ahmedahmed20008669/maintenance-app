const { mdToPdf } = require('md-to-pdf');
const fs = require('fs');
const path = require('path');

(async () => {
  try {
    const pdf = await mdToPdf({ path: path.join(__dirname, 'System_Architecture_and_Specifications.md') });
    fs.writeFileSync(path.join(__dirname, 'System_Architecture_and_Specifications.pdf'), pdf.content);
    console.log('PDF written successfully via JS!');
  } catch (err) {
    console.error('JS conversion error:', err);
  }
})();
