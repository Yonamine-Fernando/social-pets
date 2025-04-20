const uploadBtn = document.querySelector("#btn-upload");
const inputUpload = document.querySelector("#img-upload");

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ URL: leitor.result, nome: arquivo.name });
        };

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`);
        };

        leitor.readAsDataURL(arquivo);
    });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".containder-nome-img p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.URL;
            nomeDaImagem = conteudoDoArquivo.nome;
        } catch (error) {
            console.error(`Erro ao subir imagem ${error}`);
        }
    }
});

const inputTag = document.querySelector("#hashtags");
const listatag = document.querySelector(".tag-list");


listatag.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove-tag")) {
        const removeTag = evento.target.parentElement;
        listatag.removeChild(removeTag);
    }
});

const listOfTags = [
    "Gato larajna", "Gato adulto", "Gato preto", "Gato filhote", "Gato Cinza"
];

async function verificarTag(tagtexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(listOfTags.includes(tagtexto));
        }, 1000);
    });
}

inputTag.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagtexto = inputTag.value.trim();
        if (await tagtexto !== "") {
            try {
            const tagExiste = await verificarTag(tagtexto)
            if(tagExiste){
            const newHashTag = document.createElement("li");
            newHashTag.innerHTML = `<p>${tagtexto} </p> <img src="../src/img/close-black.svg"/class="remove-tag">`;
            listatag.appendChild(newHashTag);
            inputTag.value = "";
            }else{
                alert("Tag não existe, veirificar tag!")
            }
        }catch (error){
            console.error("Erro ao verificar tag")
            alert("Erro na veficaçao da Tag!")
        }
        }
    }
});
