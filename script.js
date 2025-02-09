const users = {
    "01794": "Діма",
    "03313": "Микита",
    "1148": "Вероніка",
    "09425": "Міша",
    "01465": "Ярик",
    "06367": "Максим",
    "8525": ""
};

const userResponses = {}; // База даних для збереження відповідей

async function sendMessage(name, status) {
    const message = `${name} - ${status}`;
    try {
        await fetch(`https://api.telegram.org/bot7841775996:AAENcKkPBw_E6pw1Tn1kY9CzTcE5q_P5WvQ/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: -1002497520562, text: message }),
        });
    } catch (error) {
        console.error('Помилка відправки:', error);
    }
}

function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const name = users[password];

    if (name) {
        userResponses[password] = name; // Записуємо введений код у базу даних
        document.getElementById("NameAdresText").innerText = `Привіт ${name}, запрошую тебе на днюху, ми плануємо піти в квест комнату та повеселитись на всі 100, якщо ти згоден(на) чи навпаки, вибери відповідну кнопку.`;
        document.getElementById("modal").style.display = "none";
    } else {
        alert("Невірний код!");
    }
}

function changeStatus(status) {
    const name = document.getElementById("NameAdresText").innerText.split(" ")[1];
    if (!name) return;
    
    sendMessage(name, status);
    document.getElementById("Soop").classList.add("open");
    setTimeout(() => {
        document.getElementById("Soop").classList.remove("open");
    }, 3000);
}

document.getElementById("Plus").addEventListener("click", () => changeStatus("Підтверджено"));
document.getElementById("Minus").addEventListener("click", () => changeStatus("Відмовлено"));

document.getElementById("SoopOFF").addEventListener("click", function() {
    document.getElementById("Soop").classList.remove("open");
});


document.getElementById("Plus").addEventListener("click", disableButtons);
document.getElementById("Minus").addEventListener("click", disableButtons);

function disableButtons() {
    document.getElementById("Plus").disabled = true;
    document.getElementById("Minus").disabled = true;
}
