export default function Home() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <h1>Code Smell Gamification</h1>
                <p>Melhore sua qualidade de código através da gamificação</p>
            </header>

            <main style={{ marginTop: '20px' }}>
                <section style={{ marginBottom: '30px' }}>
                    <h2>Bem-vindo!</h2>
                    <p>Identifique e corrija code smells enquanto ganha pontos e badges.</p>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <h3>📊 Seu Progresso</h3>
                        <p>Pontos: 1,250</p>
                        <p>Level: 5</p>
                    </div>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <h3>🎯 Desafios</h3>
                        <p>Ativos: 8</p>
                        <p>Completados: 12</p>
                    </div>
                    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                        <h3>🏆 Badges</h3>
                        <p>Obtidas: 6</p>
                        <p>Faltam: 4</p>
                    </div>
                </section>
            </main>
        </div>
    );
}