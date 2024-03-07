const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const notification = document.querySelector(".notification");

notification.classList.toggle('show');

let userMessage = null; 
const API_KEY = "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"; 
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; 
}

function toggleChatbot() {
    document.body.classList.toggle('show-chatbot');
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    const faq = {
        "costo mensualidad": "El costo de la mensualidad para el próximo semestre es de 550bs.",
        "materias ofertadas": "Actualmente ofrecemos las carreras de administración de empresas, contaduría pública, ingeniería comercial, marketing y publicidad, psicología, ciencias de la comunicación social, relaciones internacionales, gestión del turismo, psicopedagogía, ingeniería industrial, ingeniería en redes y telecomunicaciones, ingeniería en gestión petrolera, ingeniería en gestión ambiental, ingeniería de sistemas, ingeniería civil, medicina y fisioterapia y kinesiología",
        // Agrega más categorías y respuestas aquí
    };

    const userQuestion = userMessage.toLowerCase();
    let foundAnswer = false;
    for (const question in faq) {
        if (userQuestion.includes(question)) {
            messageElement.textContent = faq[question];
            foundAnswer = true;
            break;
        }
    }

    if (!foundAnswer) {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: userMessage}],
            })
        }

        fetch(API_URL, requestOptions)
            .then(res => res.json())
            .then(data => {
                messageElement.textContent = data.choices[0].message.content.trim();
            })
            .catch(() => {
                messageElement.classList.add("error");
                messageElement.textContent = "¡Ups! Algo salió mal. Inténtalo de nuevo.";
            })
            .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }
}

const handleChat = () => {
    userMessage = chatInput.value.trim(); 
    if(!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        const incomingChatLi = createChatLi("...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot"); 
    notification.classList.remove('show');
});
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
