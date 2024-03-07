// Función para abrir la ventana emergente solo si se hace clic en el icono de interrogación
function openModal(event) {
    if (event.target.classList.contains('question-mark')) {
      document.getElementById("myModal").style.display = "flex";
    }
  }

  // Función para cerrar la ventana emergente
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }

  // Función para cerrar el modal también cuando se hace clic en el botón de cierre en la esquina superior derecha
  function closeFromButton() {
    document.getElementById("myModal").style.display = "none";
  }

  // Función para inicializar el script cuando se carga la página
  document.addEventListener("DOMContentLoaded", function () {
    // Agrega un evento de clic al icono de interrogación para abrir la pantalla emergente
    document.body.addEventListener("click", openModal);
  });


 // Función para agregar un mensaje al chatbot
 function addToChat(message, isOutgoing = false) {
  const chatbox = document.querySelector(".chatbox");
  const newMessage = document.createElement("li");
  newMessage.classList.add("chat", isOutgoing ? "outgoing" : "incoming");
  newMessage.innerHTML = `
    <span class="material-symbols-outlined">${isOutgoing ? "smart_toy" : "send"}</span>
    <p>${message}</p>
  `;
  chatbox.appendChild(newMessage);
}

// Función para agregar un mensaje al cuadro de texto
function addToTextBox(message) {
  const chatInput = document.querySelector('.chat-input textarea');
  chatInput.value = message;
}

// Función para agregar un mensaje al chatbot al hacer clic en un elemento de la lista
function addToListToChat(message) {
  // Simula escribir en el cuadro de texto
  addToTextBox(message);
  closeModal();  // Cierra el modal después de agregar el mensaje
}

// Agrega eventos onclick para cada elemento de la lista
document.addEventListener('DOMContentLoaded', function () {
  const listItems = document.querySelectorAll('ul li');

  listItems.forEach(function (item) {
    item.addEventListener('click', function () {
      // Llama a la función addToListToChat con el contenido del elemento clicado
      addToListToChat(item.textContent.trim());
    });
  });
});
// para efecto del mensaje inicial 
/*const textElement = document.getElementById('animated-text');
  const textContent = textElement.textContent.trim();
  textElement.textContent = '';

  function animateText() {
    let index = 0;

    function typeCharacter() {
      textElement.textContent += textContent.charAt(index);
      index++;

      if (index < textContent.length) {
        setTimeout(typeCharacter, 100);
      } else {
        // Cuando se completa la escritura, espera 2000 ms y luego reinicia la animación
        setTimeout(() => {
          textElement.textContent = '';
          animateText();
        }, 2000);
      }
    }

    typeCharacter();
  }

  // Inicia la animación cuando se abre el modal
  document.addEventListener('DOMContentLoaded', function () {
    animateText();
  });*/
  

  const textElement = document.getElementById('animated-text');
  const textContent = textElement.textContent.trim();
  textElement.textContent = '';

  let index = 0;

  function animateText() {
    textElement.textContent += textContent.charAt(index);
    index++;

    if (index < textContent.length) {
      setTimeout(animateText, 140); // Ajusta la velocidad de la animación aquí
    } else {
      // Una vez finalizado el mensaje de inicio, mostrar las opciones
      document.getElementById('faq-list').style.display = 'block';
    }
    
  }

  // Inicia la animación cuando se abre el modal
  document.addEventListener('DOMContentLoaded', function () {
    animateText();
  });
   

