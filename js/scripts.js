//Declaração do array que armazenará as URLs dos animes
var urlsAnimes = []

//Variavél que guarda o formato da imagem selecionada pelo usuário
var formatoEscolhido = "";

//Função que verifica o formato da imagem selecionada
function formatoImagem() {
    //Obtém o valor da opção selecionada
    var imagemSelecionada = document.getElementById("imagem").value;

    //Verifica o formato escolhido e atualiza a variável "formatoEscolhido"
    if (imagemSelecionada === "jpg") {
        formatoEscolhido = "." + imagemSelecionada;
        document.getElementById("btnAdicionarAnime").removeAttribute("disabled");

    } else if (imagemSelecionada === "png") {
        formatoEscolhido = "." + imagemSelecionada;
        document.getElementById("btnAdicionarAnime").removeAttribute("disabled");

    } else if (imagemSelecionada === "jpeg") {
        formatoEscolhido = "." + imagemSelecionada;
        document.getElementById("btnAdicionarAnime").removeAttribute("disabled");

    } else if (imagemSelecionada === "jpe") {
        formatoEscolhido = "." + imagemSelecionada;
        document.getElementById("btnAdicionarAnime").removeAttribute("disabled");

    } else {
        //Caso o formato não seja escolhido, desabilita o botão
        document.getElementById("btnAdicionarAnime").setAttribute("disabled", "true");
    }

}

// Função para adicionar um novo anime no array de URLs
function adicionarAnime() {
    var animeFavorito = document.getElementById("anime").value;

    //Verifica se o animeFavorito termina com o formatoEscolhido válido
    if (animeFavorito.endsWith(formatoEscolhido)) {
        
        //Adiciona o novo anime ao array de URLs
        var animeObj = {
            url: animeFavorito,
            nome: "",
            rating: 0,
            starState: [false, false, false, false, false]
        };
        urlsAnimes.push(animeObj)
        
        //Salva os animes atualizados no armazenamento local
        localStorage.setItem("urlsAnimes", JSON.stringify(urlsAnimes));
        listarAnimesNaTela(animeObj);
    } else {
        console.error("Endereço de anime inválido");
    }
    //Limpa o campo de digitação
    document.getElementById("anime").value = "";
}

//Função que verifica se a tecla Enter foi pressionada
function verificarTecla(event) {
    if (event.keyCode === 13) {
        adicionarAnime();
    }
}

//Função responsável por mostrar e ocultar as instruções na página
function mostrarInstrucoes() {
    //Obtém referências aos elementos da página que serão manipulados
    var subtitle = document.querySelector(".page-subtitle");
    var placeholderContainer = document.querySelector(".form-wrapper");
    var animeCatalog = document.getElementById("anime-catalog");
    var removerTudo = document.getElementById("btnRemoverTodos");
    var instrucoesTexto = document.getElementById("instrucoes-text");
    var btnAdicionarAnime = document.getElementById("btnAdicionarAnime");

    //Oculta os elementos da página durante as instruções
    subtitle.style.display = "none";
    placeholderContainer.style.display = "none";
    animeCatalog.style.display = "none";
    btnAdicionarAnime.style.display = "none"

    //Verifica se o botão de remover está presente antes de tentar ocultá-lo
    if (removerTudo) {
        removerTudo.style.display = "none";
    }

    //Exibe o texto das instruções
    instrucoesTexto.style.display = ""

    //Botão de Voltar
    const voltarBtn = document.getElementById("voltar-btn");

    //Adiciona um evento de clique ao botão de voltar
    voltarBtn.addEventListener("click", function() {
        //Oculta as instruções
        instrucoesTexto.style.display = "none";

        //Exibe o conteúdo inicial
        subtitle.style.display = "";
        placeholderContainer.style.display = "";
        animeCatalog.style.display = "";
        btnAdicionarAnime.style.display = "";

        //Verifica se há animes na lista para decidir o botão de remover tudo
        var catalogAnime = document.getElementById("anime-catalog");
        if (catalogAnime.children.length > 0) {
            //Mostrar o botão somente se houver pelo menos um anime na tela
            removerTudo.style.display = "";
        } else {
            removerTudo.style.display = "none"
        }

    });
}

function mostrarVersoes() {
    const versoesLink = document.getElementById("versoes-link");
    const versoesElement = document.getElementById("versoes");
    const voltarBtnVersoes = document.getElementById("voltar-btn-versoes");
    var instrucoesTexto = document.getElementById("instrucoes-text");

    //Oculta o conteúdo atual
    instrucoesTexto.style.display = "none";

    //Exibe a seção de versões
    versoesElement.style.display = "";

    voltarBtnVersoes.addEventListener("click", function() {
        //Oculta a seção de versões
        versoesElement.style.display = "none";

        //Exibe o conteúdo inicial
        instrucoesTexto.style.display = ""
    });
}

// Função para listar um anime na tela
function listarAnimesNaTela(animeFavorito) {
    //Obtém o elemento com o id "anime-catalog"
    var catalogAnime = document.getElementById("anime-catalog");

    //Cria um novo elemento div para o anime favorito
    var grandeDiv = document.createElement("div");
    grandeDiv.className = "anime-container";
    catalogAnime.appendChild(grandeDiv);

    //Cria um elemento de imagem e define o atributo src para o anime favorito
    var imagem = document.createElement("img");
    imagem.src = animeFavorito.url;
    imagem.className = "anime-image";
    grandeDiv.appendChild(imagem);

    //Cria um elemento div para exibir o nome do anime e a seta
    var divNomeSeta = document.createElement("div");
    divNomeSeta.className = "nome-anime";
    grandeDiv.appendChild(divNomeSeta);

    //Cria um elemenento div para a seta de menu
    var setaMenu = document.createElement("div");
    setaMenu.className = "arrow menu-arrow";
    divNomeSeta.appendChild(setaMenu);

    //Cria um elemento div para o menu
    var menu = document.createElement("div");
    menu.className = "menu menu-right";

    //Adiciona o código HTML para o pop-up
    menu.innerHTML = `
        <p>
            <div class="edit-icon">
                <span><i class="fas fa-edit"></i></span>
                <span>Editar</span>
            </div>
        </p>
        <p>
            <div class="delete-icon">
                <span><i class="fas fa-trash-alt"></i></span>
                <span>Remover</span>
            </div>
        </p>
    `;

    //Seleciona a div com as classes
    var editIcon = menu.querySelector(".edit-icon");
    var deleteIcon = menu.querySelector(".delete-icon");

    //Adiciona o evento de clique em Editar
    editIcon.querySelectorAll("span").forEach(function (span) {
        span.addEventListener("click", function() {
            nomeAnime.innerHTML = "";
            animeFavorito.nome = "";
            localStorage.setItem("urlsAnimes", JSON.stringify(urlsAnimes));

            toggleMenu(menu, setaMenu);

            window.location.reload();
        });
    });

    //Adiciona o evento de clique em Remover
    deleteIcon.querySelectorAll("span").forEach(function (span) {
        span.addEventListener("click", function() {
            catalogAnime.removeChild(grandeDiv);
            urlsAnimes = urlsAnimes.filter(function (anime) {
                return anime !== animeFavorito;
            });
            localStorage.setItem("urlsAnimes", JSON.stringify(urlsAnimes));

            toggleMenu(menu, setaMenu);
            toggleBtnRemoverTodos();
        });
    });

    grandeDiv.appendChild(menu);

    //Cria um elemento div para exibir o nome do anime
    var nomeAnime = document.createElement("div");
    nomeAnime.className = "anime-name";

    if (animeFavorito.nome) {
        var textoCompleto = animeFavorito.nome.replace(/<[^>]+>/g, '').trim();
        var textoLimitado = textoCompleto.slice(0, 14);
        
        if (textoCompleto.length > 14) {
            //Adicionar "..." ao final do texto truncado
            nomeAnime.innerHTML = textoLimitado + "..."
            //Usar o nome completo como tooltip
            nomeAnime.setAttribute("title", textoCompleto);
        } else {
            //O nome não precisa ser truncado
            nomeAnime.innerHTML = textoCompleto;
        }
    } else {
        nomeAnime.contentEditable = true;
        nomeAnime.dataset.placeholder = "Digite o nome do anime";
        nomeAnime.innerText = ""; // Usar innerText em vez de innerHTML
        nomeAnime.addEventListener("input", function() {
            animeFavorito.nome = nomeAnime.innerText.trim(); // Usar innerText em vez de innerHTML
            localStorage.setItem("urlsAnimes", JSON.stringify(urlsAnimes));
            if (nomeAnime.innerText.trim() === "") { // Usar innerText em vez de innerHTML
                nomeAnime.dataset.placeholder = "Digite o nome do anime";
            } else {
                nomeAnime.dataset.placeholder = "";
            }
        });
        nomeAnime.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                window.location.reload();
            }
        });
    }

    //Adicionar a classe "truncated-text" se o texto for maior que o limite
    if (animeFavorito.nome && animeFavorito.nome.length > 14) {
        nomeAnime.classList.add("truncated-text");
    }

    divNomeSeta.appendChild(nomeAnime);

    //Verifica se o nome do anime está definido
    if (animeFavorito.nome === "") {
        setaMenu.style.display = "none";
    }

    //Adiciona o evento de clique na seta para exibir/ocultar o menu
    setaMenu.onclick = function () {
        toggleMenu(menu, setaMenu);
    }

    //Cria um elemento div para as estrelas de classificação
    var estrelas = document.createElement("div");
    estrelas.className = "star-rating";

    //Loop para criar as estrelas de classificação
    for (var i = 0; i < 5; i++) {
        var estrela = document.createElement("span");
        estrela.dataset.rating = i + 1;
        if (animeFavorito.starState[i]) {
            estrela.classList.add('active');
        }
        estrela.onclick = function() {
            var rating = parseInt(this.dataset.rating);
            rateAnime(rating, this, animeFavorito);
        };
        estrela.innerHTML = "&#9733;";
        estrelas.appendChild(estrela);
    }

    //Adiciona as estrelas ao elemento do anime favorito
    grandeDiv.appendChild(estrelas);
}

//Função para atribuir uma classificação a um anime
function rateAnime(rating, star, anime) {
    anime.rating = rating;
    anime.starState = anime.starState.map((state, index) => index < rating);

    const stars = star.parentNode.querySelectorAll('.star-rating span');
    stars.forEach((s, index) => {
        if (index < rating) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
    console.log('Nota:', rating);

    //Salva os animes atualizados no armazenamento local
    localStorage.setItem("urlsAnimes", JSON.stringify(urlsAnimes));
}

//Função para exibir/ocultar o menu
function toggleMenu(menu, setaMenu) {

    if (menu.style.display === "" || menu.style.display === "none") {
        menu.style.display = "block";
        setaMenu.style.transform = "rotate(90deg)";
    } else {
        menu.style.display = "none";
        setaMenu.style.transform = "rotate(0)";
    }
}

//Carregar os animes do array inicial
function carregarAnimes() {
    var animesSalvos = localStorage.getItem("urlsAnimes");
    if (animesSalvos) {
        urlsAnimes = JSON.parse(animesSalvos);
        for (var i = 0; i < urlsAnimes.length; i++) {
            listarAnimesNaTela(urlsAnimes[i]);
        }
    } else {
        console.log("Nenhum anime salvo encontrado.")
    }

    // Após carregar os animes, verifique se é necessário mostrar o botão "Remover Todos os Animes"
    toggleBtnRemoverTodos();
}

//Função para mostrar/ocultar o botão de Remover Animes
function toggleBtnRemoverTodos() {
    var btnRemoverTodos = document.getElementById("btnRemoverTodos");
    var catalogAnime = document.getElementById("anime-catalog");
    if (catalogAnime.children.length > 0) {
        //Mostrar o botão somente se houver pelo menos um anime na tela
        btnRemoverTodos.style.display = "";
    } else {
        btnRemoverTodos.style.display = "none"
    }
}

//Função para remover todos os animes da array e da tela
function removerTodosAnimes() {
    var catalogAnime = document.getElementById("anime-catalog");
    catalogAnime.innerHTML = "";

    //Limpar a array de animesd
    urlsAnimes = [];

    // Remover a lista de animes do armazenamento local
    localStorage.removeItem("urlsAnimes");

    //Esconder o botão após remover todos os animes
    toggleBtnRemoverTodos();

    //Fechar o modal após a remoção
    fecharModalConfirmacao();
}

//Função para abrir o pop-up de confirmação antes de remover todos os animes
function confirmarRemoverTodosAnimes() {
    var modalConfirmacao = document.getElementById("modalConfirmacao");
    modalConfirmacao.style.display = "block";
}

// Função para fechar o modal de confirmação
function fecharModalConfirmacao() {
    var modalConfirmacao = document.getElementById("modalConfirmacao");
    modalConfirmacao.style.display = "none";
  }

carregarAnimes();

