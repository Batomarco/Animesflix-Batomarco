//Declaração do array que armazenará as URLs dos animes
var urlsAssistirMaisTarde = []

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
function adicionarAnimeAssistirMaisTarde() {
    var animeRelogio = document.getElementById("anime").value;

    //Verifica se o animeFavorito termina com o formatoEscolhido válido
    if (animeRelogio.endsWith(formatoEscolhido)) {
        //Adiciona o novo anime ao array de URLs
        var animeObj = {
            url: animeRelogio,
            nome: "",
            colocacao: urlsAssistirMaisTarde.length + 1,
            rating: 0,
            checkedState: [false]
        };
        urlsAssistirMaisTarde.push(animeObj)
        
        //Salva os animes atualizados no armazenamento local
        localStorage.setItem("urlsAssistirMaisTarde", JSON.stringify(urlsAssistirMaisTarde));
        listarAnimesParaAssistir(animeObj);
    } else {
        console.error("Endereço de anime inválido");
    }
    //Limpa o campo de digitação
    document.getElementById("anime").value = "";
}

// Função para listar um anime na tela
function listarAnimesParaAssistir(animeRelogio) {
    //Obtém o elemento com o id "anime-catalog"
    var catalogAnime = document.getElementById("anime-catalog");

    //Cria um novo elemento div para o anime favorito
    var grandeDiv = document.createElement("div");
    grandeDiv.className = "anime-container";
    catalogAnime.appendChild(grandeDiv);

    //Cria um elemento de imagem e define o atributo src para o anime favorito
    var imagem = document.createElement("img");
    imagem.src = animeRelogio.url;
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
            animeRelogio.nome = "";
            localStorage.setItem("urlsAssistirMaisTarde", JSON.stringify(urlsAssistirMaisTarde));

            toggleMenu(menu, setaMenu);

            window.location.reload();
        });
    });

    //Adiciona o evento de clique em Remover
    deleteIcon.querySelectorAll("span").forEach(function (span) {
        span.addEventListener("click", function() {
            var indexToRemove = urlsAssistirMaisTarde.findIndex(function(anime) {
                return anime.url === animeRelogio.url;
            });
            
            if (indexToRemove !== -1) {
                catalogAnime.removeChild(grandeDiv);

                //Remove o anime do array de URLs
                urlsAssistirMaisTarde.splice(indexToRemove, 1);

                //Atualiza as colocações após remover um anime
                for (var i = 0; i < urlsAssistirMaisTarde.length; i++) {
                    urlsAssistirMaisTarde[i].colocacao = i + 1;
                }
            }

            //Salva os animes atualizados no armazenamento local
            localStorage.setItem("urlsAssistirMaisTarde", JSON.stringify(urlsAssistirMaisTarde));

            toggleMenu(menu, setaMenu);
            toggleBtnRemoverTodos();
        });
    });

    grandeDiv.appendChild(menu);

    //Cria um elemento div para exibir o nome do anime
    var nomeAnime = document.createElement("div");
    nomeAnime.className = "anime-name";

    if (animeRelogio.nome) {
        var textoCompleto = animeRelogio.nome.replace(/<[^>]+>/g, '').trim();
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
        nomeAnime.innerText = ""; 
        nomeAnime.addEventListener("input", function() {
            animeRelogio.nome = nomeAnime.innerText.trim();
            localStorage.setItem("urlsAssistirMaisTarde", JSON.stringify(urlsAssistirMaisTarde));
            if (nomeAnime.innerText.trim() === "") { 
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
    if (animeRelogio.nome && animeRelogio.nome.length > 14) {
        nomeAnime.classList.add("truncated-text");
    }

    divNomeSeta.appendChild(nomeAnime);

    //Verifica se o nome do anime está definido
    if (animeRelogio.nome === "") {
        setaMenu.style.display = "none";
    }

    //Adiciona o evento de clique na seta para exibir/ocultar o menu
    setaMenu.onclick = function () {
        toggleMenu(menu, setaMenu);
    }

    //Cria um elemento div para as estrelas de classificação
    var verificados = document.createElement("div");
    verificados.className = "checkeds-rating";

    //Loop para criar o sinal de verificado
    for (var i = 0; i < 1; i++) {
        var verificado = document.createElement("span");
        verificado.dataset.rating = i + 1;
        if (animeRelogio.checkedState[i]) {
            verificado.classList.add('active');
        }
        verificado.onclick = function() {
            var rating = parseInt(this.dataset.rating);
            verificadoAnime(rating, this, animeRelogio);
            marcarAnimeComoVisto(animeRelogio.url);
        };
        
        verificado.innerHTML = "&#10004";
        verificados.appendChild(verificado);
    }

    //Adiciona as estrelas ao elemento do anime favorito
    grandeDiv.appendChild(verificados);        

    localStorage.setItem("urlsAssistirMaisTarde", JSON.stringify(urlsAssistirMaisTarde));
}

//Função para atribuir uma classificação a um anime
function verificadoAnime(rating, check, anime) {
    // Verifica se a classificação atual é igual à classificação clicada
    const isCurrentRating = anime.rating === rating;

    const animeContainer = check.closest('.anime-container');
    const animeImage = animeContainer.querySelector('.anime-image');

    const checks = check.parentNode.querySelectorAll('.checkeds-rating span');
    checks.forEach((s, index) => {
        if (index < rating) {
            s.classList.add('active');
            if (rating === 1) {
                animeImage.classList.add('green-border');
            }
        } else {
            s.classList.remove('active');
            animeImage.classList.remove('green-border');
        }
    });

    // Se for a mesma classificação, desativa
    if (isCurrentRating) {
        anime.rating = 0;
        anime.checkedState = anime.checkedState.map(() => false);
        window.location.reload();
    } else {
        // Se for uma nova classificação, ativa a classificação e atualiza o estado
        anime.rating = rating;
        anime.checkedState = anime.checkedState.map((state, index) => index < rating);
    }

    //Salva os animes atualizados no armazenamento local
    localStorage.setItem("urlsAssistirMaisTarde", JSON.stringify(urlsAssistirMaisTarde));
}

function marcarAnimeComoVisto(animeUrl) {
    var urlsAnimes = JSON.parse(localStorage.getItem("urlsAnimes")) || [];

    var animeParaMover = urlsAssistirMaisTarde.find(anime => anime.url === animeUrl);

    if (animeParaMover) {

        urlsAssistirMaisTarde = urlsAssistirMaisTarde.filter(anime => anime.url !== animeUrl);

        // Criar um novo objeto com as informações do anime
        var animeAssistido = {
            url: animeParaMover.url,
            nome: animeParaMover.nome,
            rating: 1, // Definir o rating para 1 (marcado como assistido)
            starState: [false, false, false, false, false], // Definir o estado das estrelas
            colocacao: urlsAnimes.length + 1
        };

        //Adicionar o anime à lista de animes assistidos
        urlsAnimes.push(animeAssistido);

        //Salvar as alterações no armazenamento local
        localStorage.setItem("urlsAnimes", JSON.stringify(urlsAnimes));
        localStorage.setItem("urlsAssistirMaisTarde", JSON.stringify(urlsAssistirMaisTarde));
        
        //Atualizar as colocações após mover um anime
        atualizarColocacoes(urlsAssistirMaisTarde);

        //Atualizar as listas nas interface
        atualizarListaAnimesAssistirMaisTarde();
    } else {
        console.error("Anime não encontrado na lista de assistir mais tarde")
    }
}

function atualizarColocacoes(animeList) {
    animeList.forEach((anime, index) => {
        anime.colocacao = index + 1;
    })
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
function carregarAnimesParaAssistir(arrayRelogio) {
   var animesParaAssistir = localStorage.getItem("urlsAssistirMaisTarde");

    if (animesParaAssistir) {
        urlsAssistirMaisTarde = JSON.parse(animesParaAssistir);
        urlsAssistirMaisTarde = arrayRelogio;

       
        for (var i = 0; i < urlsAssistirMaisTarde.length; i++) {
            const anime = urlsAssistirMaisTarde[i];
            listarAnimesParaAssistir(anime);

            if (anime.rating === 1) {
                const animeContainer = document.querySelector(`.anime-container:nth-child(${i + 1})`);
                const animeImage = animeContainer.querySelector('.anime-image');
                animeImage.classList.add('green-border');
            }
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
    var sectionTitle = document.querySelector(".section-title")

    if (catalogAnime.children.length > 0) {
        //Mostrar o botão somente se houver pelo menos um anime na tela
        btnRemoverTodos.style.display = "";
        sectionTitle.style.display = "";
    } else {
        btnRemoverTodos.style.display = "none";
        sectionTitle.style.display = "none";
    }
}

//Função para remover todos os animes da array e da tela
function removerTodosAnimes() {
    var catalogAnime = document.getElementById("anime-catalog");
    catalogAnime.innerHTML = "";

    //Limpar a array de animesd
    urlsAssistirMaisTarde = [];

    // Remover a lista de animes do armazenamento local
    localStorage.removeItem("urlsAssistirMaisTarde");

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

$(document).ready(function () {
    // Carregar os animes salvos do armazenamento local durante a inicialização
    var animesParaAssistir = localStorage.getItem("urlsAssistirMaisTarde");
    if (animesParaAssistir) {
        urlsAssistirMaisTarde = JSON.parse(animesParaAssistir);
    }

    // Fazer uma cópia da array original para trabalhar com a ordenação
    urlsAnimesDate = urlsAssistirMaisTarde.slice();
    urlsAnimesName = urlsAssistirMaisTarde.slice();
    urlsAnimesStars = urlsAssistirMaisTarde.slice();

    // Opção de ordenação padrão (por data de criação, ascendente)
    var defaultSortingOption = "dateAsc";
    var sortingOption = localStorage.getItem("optionAssistirDepois") || defaultSortingOption;

    //Função para ordenar os animes
    function sortAnimeCatalog(option) {
        var urlsAnimesOrdenada = [];

        //Ordenar por nome, ascendente
        if (option === "nameAsc") {
            urlsAnimesOrdenada = urlsAnimesName.slice().sort(function(a, b) {
                var nomeA = a.nome.toLowerCase();
                var nomeB = b.nome.toLowerCase();
                return nomeA.localeCompare(nomeB);
            });
        }

        //Ordenar por nome, descendente
        if (option === "nameDesc") {
            urlsAnimesOrdenada = urlsAnimesName.slice().sort(function(a, b) {
                var nomeA = a.nome.toLowerCase();
                var nomeB = b.nome.toLowerCase();
                return nomeB.localeCompare(nomeA);
            });
        }

        //Ordenar por número de estrelas, ascendente
        if (option === "starsAsc") {
            urlsAnimesOrdenada = urlsAnimesStars.slice().sort(function(a, b) {
                return a.rating - b.rating;
            });
        }

        //Ordenar por número de estrelas, descendente
        if (option === "starsDesc") {
            urlsAnimesOrdenada = urlsAnimesStars.slice().sort(function(a, b) {
                return b.rating - a.rating;
            });
        }

        //Ordenar por data de criação, ascendente
        if (option === "dateAsc") {
            urlsAnimesOrdenada = urlsAnimesDate.slice().sort(function(a, b) {
                return a.colocacao - b.colocacao;
            });
        };

        //Ordenar por data de criação, descendente
        if (option === "dateDesc") {
            urlsAnimesOrdenada = urlsAnimesDate.slice().sort(function(a, b) {
                return b.colocacao - a.colocacao;
            });
        }

        localStorage.setItem("optionAssistirDepois", option)

        // Depois de ordenar, atualize o catálogo de animes na página
        $("#anime-catalog").empty();       
        carregarAnimesParaAssistir(urlsAnimesOrdenada);
    }

    //Verifca se há uma opção de ordenação salva
    var savedSortingOption = localStorage.getItem("optionAssistirDepois");
    if (savedSortingOption) {
        sortingOption = savedSortingOption;
        $('input[name="sort-option"][value="' + sortingOption + '"]').prop("checked", true);
        sortAnimeCatalog(sortingOption);
    }

    //Manipule a mudança no radio para definir a opção de ordenação
     $('input[name="sort-option"]').change(function () {
        sortingOption = $(this).val();
        sortAnimeCatalog(sortingOption);
        $('#sort-menu').hide();
    })

});

//Manipule o clique no ícone para mostrar ou esconder o menu de opções
function toggleSortMenu() {
    $('#sort-menu').toggle();
};

$(document).ready(function () {
    function verificarEAtualizarColocacao() {
        for (var i = 0; i < urlsAssistirMaisTarde.length; i++) {
            if (typeof urlsAssistirMaisTarde[i].colocacao === 'undefined') {
                urlsAssistirMaisTarde[i].colocacao = i + 1;
            }
        }
    }

    // Definir uma colocação base para animes sem colocação
    function definirColocacaoBase() {
        for (var i = 0; i < urlsAssistirMaisTarde.length; i++) {
            if (typeof urlsAssistirMaisTarde[i].colocacao === 'undefined') {
                urlsAssistirMaisTarde[i].colocacao = i + 1;
            }
        }
    }

    // Verificar e atualizar a colocação ao abrir o site
    verificarEAtualizarColocacao();
    definirColocacaoBase();
});