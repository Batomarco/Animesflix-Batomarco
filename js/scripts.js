//Ideias futuras:
//Botão de remover anime;
//Nome do anime em cima;
//Interrogação de tutorial;
//Botão de editar o nome do anime;

//Novas Ideias:
//Botão que pode escolher formato da imagem, jpg, jpe, png, jpeg
//Limitar o tamanho do nome, talvez colocar reticencias

var urlsAnimes = []

// Função para adicionar um novo anime no array de URLs
function adicionarAnime() {
    var animeFavorito = document.getElementById("anime").value;

    if (animeFavorito.endsWith(".jpg") || animeFavorito.endsWith(".jpe")) {
        
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
    document.getElementById("anime").value = "";
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
        });
    });

    grandeDiv.appendChild(menu);

    //Cria um elemento div para exibir o nome do anime
    var nomeAnime = document.createElement("div");
    nomeAnime.className = "anime-name";

    if (animeFavorito.nome) {
        nomeAnime.innerHTML = animeFavorito.nome;
    } else {
        nomeAnime.contentEditable = true;
        nomeAnime.dataset.placeholder = "Digite o nome do anime";
        nomeAnime.innerHTML = "";
        nomeAnime.addEventListener("input", function() {
            animeFavorito.nome = nomeAnime.innerHTML.trim();
            localStorage.setItem("urlsAnimes", JSON.stringify(urlsAnimes));
            if (nomeAnime.innerHTML.trim() === "") {
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
}

carregarAnimes();

