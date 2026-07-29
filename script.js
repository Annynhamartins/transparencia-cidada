document.addEventListener('DOMContentLoaded', function() {
    const btnSimplificar = document.getElementById('btnSimplificar');

    if (!btnSimplificar) return;

    btnSimplificar.addEventListener('click', async function() {
        const textoInput = document.getElementById('texto');
        const categoriaInput = document.getElementById('categoria');
        const resultadoDiv = document.getElementById('resultado');

        const texto = textoInput ? textoInput.value.trim() : '';
        const categoria = categoriaInput ? categoriaInput.value : 'licitacao';

        if (!texto) {
            alert("Por favor, cole o texto do documento público!");
            return;
        }

        btnSimplificar.innerText = "⏳ Analisando e simplificando...";
        btnSimplificar.disabled = true;

        try {
            const response = await fetch('https://tiktok-ai-content-studio.onrender.com/api/simplificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ texto: texto, categoria: categoria })
            });

            if (!response.ok) {
                throw new Error(Erro: ${response.status});
            }

            const data = await response.json();

            document.getElementById('outResumo').innerText = data.resumo_cidadao;
            document.getElementById('outImpacto').innerText = data.impacto_social;
            document.getElementById('outRecomendacao').innerText = data.recomendacao_fiscalizacao;

            if (resultadoDiv) {
                resultadoDiv.classList.remove('hidden');
                resultadoDiv.style.display = 'block';
            }
        } catch (error) {
            console.error("Erro na API:", error);
            alert("O servidor do Render está ligando. Aguarde 30 segundos e clique em Traduzir novamente!");
        } finally {
            btnSimplificar.innerText = "🔍 Traduzir para Linguagem Simples";
            btnSimplificar.disabled = false;
        }
    });
});
