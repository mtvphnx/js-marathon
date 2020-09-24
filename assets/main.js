// ЗАДАНИЕ #1


const firstRow = prompt('Введите первую строку:', '');
const secondRow = prompt('Введите вторую строку:', '');
const letter = prompt('Давайте посчитаем букву в строке и выведем ту строку, в которой такой буквы больше. Введите букву:', '');


function getRow(firstRow, secondRow) {

    if (typeof(firstRow) !== 'string' || typeof(secondRow) !== 'string' || typeof(letter) !== 'string') {
        return 'Зачем нажал на отмену? Обнови страницу и начни сначала!';
    }

    const countLetters = (string) => {

        let currentString = string,
            count = 0;

        for (let x = 0; x < currentString.length; x++) {
            count += (currentString.charAt(x) === letter) ? 1 : 0;
        }

        return count;
    }

    let result = countLetters(firstRow) > countLetters(secondRow) ? `Победила строка с текстом "${firstRow}"` :
        countLetters(firstRow) < countLetters(secondRow) ? `Победила строка с текстом "${secondRow}"` :
        'Строки равны';

    return result;
}

alert(getRow(firstRow, secondRow));


// ЗАДАНИЕ #2

const number = prompt('Давайте форматируем ваш номер телефона. Принимаются форматы +7xxxxxxxxxx, 7xxxxxxxxxx, 8xxxxxxxxxx и 9xxxxxxxxx', '');

function formattedPhone(phone) {

    if (typeof(phone) === 'string') {

        const hasPluse = phone.charAt(0) === '+';
        let result = '+7';
        let phoneLength = phone.length;

        for (let y = 0; y < phoneLength; y++) {

            if (!hasPluse && phoneLength === 11) {

                if (y !== 0) {
                    result += phone.charAt(y);
                }

            } else if (!hasPluse && phoneLength === 10) {

                result += phone.charAt(y);

            } else if (hasPluse && phoneLength === 12) {

                if (y !== 0 && y !== 1) {
                    result += phone.charAt(y);
                }

            } else {

                break;
                
            }
        }

        if (result.length !== 12) {

            return 'Неверный формат номера';

        } else {

            let validNumber = '';

            for (let z = 0; z < result.length; z++) {

                if (z === 1) {

                    validNumber += `${result.charAt(z)} `;

                } else if (z === 2) {

                    validNumber += `(${result.charAt(z)}`;

                } else if (z === 4) {

                    validNumber += `${result.charAt(z)}) `;
                    
                } else if (z === 7 || z === 9) {

                    validNumber += `${result.charAt(z)}-`;
                    
                } else {

                    validNumber += result.charAt(z)

                }


            }

            return `Твой отформатированный номер ${validNumber}`;

        }
        

    } else {

        return 'Зачем ты отменил ввод?';
        
    }
}

alert(formattedPhone(number));