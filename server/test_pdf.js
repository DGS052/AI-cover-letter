const pdf = require('pdf-parse');
console.log('Type of pdf:', typeof pdf);
console.log('Is pdf a function?', typeof pdf === 'function');
console.log('Keys of pdf:', Object.keys(pdf));
if (typeof pdf !== 'function') {
    console.log('pdf export:', pdf);
    if (pdf.default) {
        console.log('pdf.default exists, type:', typeof pdf.default);
    }
}
