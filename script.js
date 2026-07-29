document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnSimplificar');
    if (!btn) return;

    btn.addEventListener('click', async () => {
        const texto = document.getElementById('texto').value.trim();
        const categoria = document.getElementById('categoria').value;
        const resultadoDiv = document.getElementById('resultado');

        if (!texto) {
            alert('Por favor, cole o texto do documento público!');
            return;
        }

        btn.innerText = '⏳ Analisando e simplificando...';
        btn.disabled = true;

        try {
            const res = await fetch('https://tiktok-ai-content-studio.onrender.com/api/simplificar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto, categoria })
            });

            if (!res.ok) throw new Error('Erro servidor');

            const data = await res.json();

            document.getElementById('outResumo').innerText = data.resumo_cidadao;
            document.getElementById('outImpacto').innerText = data.impacto_social;
            document.getElementById('outRecomendacao').innerText = data.recomendacao_fiscalizacao;

            resultadoDiv.classList.remove('hidden');
            resultadoDiv.style.display = 'block';
        } catch (err) {
            alert('O servidor do Render está inicializando. Aguarde 30 segundos e tente novamente!');
        } finally {
            btn.innerText = '🔍 Traduzir para Linguagem Simples';
            btn.disabled = false;
        }
    });
});
