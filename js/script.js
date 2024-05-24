document.getElementById('oddsRocket').addEventListener('input', calculate);
document.getElementById('maxBet').addEventListener('input', calculate);
document.getElementById('oddsOpposing').addEventListener('input', calculate);
document.getElementById('accs').addEventListener('input', calculate);

const opposingResult = document.getElementById('opposingPerAcc');
const totalOpposingResult = document.getElementById('totalOpposing');
const profitResult = document.getElementById('profitPerAcc');
const totalProfitResult = document.getElementById('totalProfit');

function calculate() {
    const oddsRocket = parseFloat(document.getElementById('oddsRocket').value);
    const maxBet = parseFloat(document.getElementById('maxBet').value);
    const oddsOpposing = parseFloat(document.getElementById('oddsOpposing').value);
    const accs = parseInt(document.getElementById('accs').value);

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

	resultDiv.style.display = 'block';

    const opposing = Math.ceil((maxBet * oddsRocket) / oddsOpposing);
    const totalOpposing = opposing * accs;
    const profit = Math.floor((oddsRocket * maxBet) - (maxBet + opposing));
    const totalProfit = profit * accs;

    opposingResult.textContent = opposing.toLocaleString("HU-hu");
    totalOpposingResult.textContent = totalOpposing.toLocaleString("HU-hu");
    profitResult.textContent = profit.toLocaleString("HU-hu");
    totalProfitResult.textContent = totalProfit.toLocaleString("HU-hu");
}

calculate();
