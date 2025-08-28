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
        }


    