
async function generateSlides() {
  const topic = document.getElementById("topic").value;
  const key = document.getElementById("apikey").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerText = "Генерация... Пожалуйста, подождите.";

  const prompt = `Сделай 15 слайдов на тему "${topic}". Каждый слайд кратко, по 1-2 предложения, на русском языке.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "mistral/mistral-7b-instruct",
      messages: [
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  if (data.choices) {
    resultDiv.innerText = data.choices[0].message.content;
  } else {
    resultDiv.innerText = "Ошибка генерации. Проверьте API-ключ или тему.";
  }
}
