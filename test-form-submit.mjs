const response = await fetch("http://localhost:3000/api/forms/contact/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    data: {
      name: "Carlos Teste",
      email: "teste@email.com",
      phone: "+1 999 999 9999",
      message: "Teste do formulário dinâmico",
    },
    source_url: "http://localhost:3000/forms/contact",
  }),
});

const text = await response.text();

console.log("STATUS:", response.status);
console.log("RESPONSE:");
console.log(text);