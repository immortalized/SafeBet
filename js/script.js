document.getElementById('betType').addEventListener('change', updateForm);
document.getElementById('oddsRocket').addEventListener('input', calculate);
document.getElementById('maxBet').addEventListener('input', calculate);
document.getElementById('oddsOpposing').addEventListener('input', calculate);
document.getElementById('accs').addEventListener('input', calculate);
document.getElementById('intermediateOdds').addEventListener('input', calculate);

const opposingResult = document.getElementById('opposingPerAcc');
const totalOpposingResult = document.getElementById('totalOpposing');
const profitResult = document.getElementById('profitPerAcc');
const totalProfitResult = document.getElementById('totalProfit');

function updateForm() {
    const betType = document.getElementById('betType').value;
    const intermediateOddsGroup = document.getElementById('intermediateOddsGroup');
    if (betType === '3') {
        intermediateOddsGroup.style.display = 'block';
    } else {
        intermediateOddsGroup.style.display = 'none';
    }
    calculate();
}

function calculate() {
    const betType = document.getElementById('betType').value;
    const oddsRocket = parseFloat(document.getElementById('oddsRocket').value);
    const maxBet = parseFloat(document.getElementById('maxBet').value);
    const oddsOpposing = parseFloat(document.getElementById('oddsOpposing').value);
    const accs = parseInt(document.getElementById('accs').value);
    const intermediateOdds = parseFloat(document.getElementById('intermediateOdds').value);

    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';

    const resultDiv = document.getElementById('results');
    resultDiv.style.display = 'none';

    if (
        isNaN(oddsRocket) || isNaN(maxBet) || isNaN(oddsOpposing) || isNaN(accs) ||
        oddsRocket <= 0 || maxBet <= 0 || oddsOpposing <= 0 || accs <= 0 ||
        document.getElementById('oddsRocket').value.trim() === '' ||
        document.getElementById('maxBet').value.trim() === '' ||
        document.getElementById('oddsOpposing').value.trim() === '' ||
        document.getElementById('accs').value.trim() === ''
    ) {
        const emptyFields = [oddsRocket, maxBet, oddsOpposing, accs].reduce((acc, val, index) => {
            if (document.getElementById(['oddsRocket', 'maxBet', 'oddsOpposing', 'accs'][index]).value.trim() === '') {
                acc.push(['Odds Rocket', 'Max Bet', 'Opposing Odds', 'Accounts'][index]);
            }
            return acc;
        }, []);

        if (emptyFields.length > 0) {
            errorDiv.textContent = "There's an error with the following field(s): " + emptyFields.join(', ');
        }
        errorDiv.style.display = 'block';

        return;
    }

    if (betType === '3' && (isNaN(intermediateOdds) || intermediateOdds <= 0 || document.getElementById('intermediateOdds').value.trim() === '')) {
        errorDiv.textContent = "There's an error with the following field(s): Intermediate Odds";
        errorDiv.style.display = 'block';
        return;
    }

    resultDiv.style.display = 'block';

    let opposing, totalOpposing, profit, totalProfit;

    if (betType === '2') {
        opposing = Math.ceil((maxBet * oddsRocket) / oddsOpposing);
        totalOpposing = opposing * accs;
        profit = Math.floor((oddsRocket * maxBet) - (maxBet + opposing));
        totalProfit = profit * accs;
    } else {
        const kpenz = (oddsRocket * maxBet) / intermediateOdds;
        const epenz = (oddsRocket * maxBet) / oddsOpposing;
        profit = Math.floor((oddsRocket * maxBet) - (kpenz + epenz + maxBet));
        totalProfit = profit * accs;
        opposingResult.textContent = kpenz.toLocaleString("HU-hu");
        totalOpposingResult.textContent = epenz.toLocaleString("HU-hu");
    }

    // Check if profit is negative
    if (profit < 0) {
        errorDiv.textContent = "Unprofitable";
        errorDiv.style.display = 'block';
        resultDiv.style.display = 'none';
        return;
    }

    opposingResult.textContent = opposing ? opposing.toLocaleString("HU-hu") : '-';
    totalOpposingResult.textContent = totalOpposing ? totalOpposing.toLocaleString("HU-hu") : '-';
    profitResult.textContent = profit.toLocaleString("HU-hu");
    totalProfitResult.textContent = totalProfit.toLocaleString("HU-hu");
}

updateForm();
calculate();
