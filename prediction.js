document.addEventListener('DOMContentLoaded', () => {
    const predictBtn = document.getElementById('run-valuation');
    const loader = document.getElementById('loader');
    const resultSection = document.getElementById('result-section');
    
    // Result elements
    const resValue = document.getElementById('res-value');
    const resRangeMin = document.getElementById('res-range-min');
    const resRangeMax = document.getElementById('res-range-max');
    
    if (predictBtn) {
        predictBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show loader
            loader.classList.add('active');

            setTimeout(() => {
                loader.classList.remove('active');
                calculatePrediction();
            }, 1000); // simplified loading time
        });
    }

    const printBtn = document.getElementById('print-report');
    if (printBtn) {
        printBtn.addEventListener('click', () => window.print());
    }

    function calculatePrediction() {
        // Boston Housing Regression Coefficients
        const intercept = 36.459;
        const coefs = {
            crim: -0.108, zn: 0.046, indus: 0.021, chas: 2.687,
            nox: -17.767, rm: 3.810, age: 0.001, dis: -1.476,
            rad: 0.306, tax: -0.012, ptratio: -0.953, b: 0.009, lstat: -0.525
        };

        let pred = intercept;

        for (let key in coefs) {
            const input = document.getElementById(`f-${key}`);
            const val = input ? parseFloat(input.value) : 0;
            pred += val * coefs[key];
        }

        if (pred < 5) pred = 5;
        
        // Convert prediction base to a realistic Indian pricing scale (e.g., base of crores/lakhs)
        // pred is roughly between 10 and 50 in standard dataset. Let's multiply by 1,000,000 for realistic INR.
        const actualPrice = pred * 1000000; 
        const minRange = actualPrice * 0.90;
        const maxRange = actualPrice * 1.10;

        // Indian Currency Formatter
        const format = (num) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(num);

        resValue.textContent = format(actualPrice);
        resRangeMin.textContent = format(minRange);
        resRangeMax.textContent = format(maxRange);
        
        resultSection.classList.remove('hidden');
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
