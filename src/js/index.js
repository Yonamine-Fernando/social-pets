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