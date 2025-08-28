# Amigo-Secreto
 let amigos = [];
        let voices = [];

        // Carregar vozes disponíveis
        function carregarVozes() {
            voices = speechSynthesis.getVoices();
        }
        carregarVozes();
        window.speechSynthesis.onvoiceschanged = carregarVozes;

        // Adicionar amigo
        function adicionarAmigo() {
            const input = document.getElementById("amigo");
            const nome = input.value.trim();

            if (nome === "") {
                alert("Por favor, digite um nome válido!");
                return;
            }

            amigos.push(nome);
            atualizarLista();
            input.value = "";
        }

        // Atualizar lista
        function atualizarLista() {
            const lista = document.getElementById("listaAmigos");
            lista.innerHTML = "";
            amigos.forEach((nome) => {
                const li = document.createElement("li");
                li.textContent = nome;
                lista.appendChild(li);
            });
        }

        // Sortear amigo
        function sortearAmigo() {
            if (amigos.length === 0) {
                alert("Adicione pelo menos um nome antes de sortear!");
                return;
            }

            const indice = Math.floor(Math.random() * amigos.length);
            const sorteado = amigos[indice];

            const resultado = document.getElementById("resultado");
            resultado.innerHTML = `<li>🎉 O amigo secreto sorteado foi: <strong>${sorteado}</strong></li>`;

            falarNome(sorteado);
        }

        // Falar o nome sorteado
        function falarNome(nome) {
            const msg = new SpeechSynthesisUtterance(`O amigo secreto sorteado foi ${nome}`);
            msg.lang = "pt-BR";

            // Tenta selecionar voz feminina em pt-BR
            let vozFeminina = voices.find(v => v.lang === "pt-BR" && v.name.toLowerCase().includes("female"))
                            || voices.find(v => v.lang === "pt-BR");

            if (vozFeminina) {
                msg.voice = vozFeminina;
            }

            speechSynthesis.speak(msg);
        }

        // Resetar lista
        function resetarLista() {
            amigos = [];
            document.getElementById("listaAmigos").innerHTML = "";
              
            document.getElementById("resultado").innerHTML = "";

      Html

      <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;400;700;900&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
    <title>Amigo Secreto</title>
</head>

<body>
    <main class="main-content">
        <header class="header-banner">
            <h1 class="main-title">Amigo Secreto</h1>
            <img src="assets/amigo-secreto.png" alt="Imagem representativa de amigo secreto">
        </header>
        
        <section class="input-section">
            <h2 class="section-title">Digite o nome dos seus amigos</h2>
            <div class="input-wrapper">
                <input type="text" id="amigo" class="input-name" placeholder="Digite um nome">
                <button class="button-add" onclick="adicionarAmigo()">Adicionar</button>
            </div>
           
            <ul id="listaAmigos" class="name-list" aria-labelledby="listaAmigos" role="list"></ul>
            <ul id="resultado" class="result-list" aria-live="polite"></ul>

            <div class="button-container">
                <button class="button-draw" onclick="sortearAmigo()" aria-label="Sortear amigo secreto">
                    <img src="assets/play_circle_outline.png" alt="Ícone para sortear">
                    Sortear amigo
                </button>
            </div>
        </section>
    </main>

    <script src="app.js" defer></script>
</body>
</html>
