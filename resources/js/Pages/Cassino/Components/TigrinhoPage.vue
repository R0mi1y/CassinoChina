<template>
  <div class="tigrinho-container">
    <h1 class="titlePage">FORTUNE TIGER | JOGO DO TIGRINHO</h1>
    <p class="subtitle">Fortune Tiger, o jogo do tigrinho, é na cassino! Divirta-se, mas saiba seus limites e jogue com responsabilidade.</p>

    <div class="item-game-container" @click="redirectToGame">
      <div class="item-game text-gray-700 w-full h-auto mr-4 cursor-pointer"
        @mouseover="showIcon = true"
        @mouseleave="showIcon = false">
        <div class="relative w-full h-full">
          <img :src="distribution === 'kagaming' ? cover : `/storage/` + cover" alt="Jogo Tigrinho" class="game-image">
          <div v-if="showIcon" class="bdc">
            <i class="fa-solid fa-circle-play"></i>
          </div>
        </div>
      </div>
    </div>

    <button class="play-button">Jogue De Verdade</button>
    <div class="infobutton">
        <div class="infobutton-item">
            <i class="fa-solid fa-shield"></i> Jogue com responsabilidade
        </div>
        <div class="infobutton-item">
            <i class="fa-solid fa-hand"></i> Conheça seus limites
        </div>
        <p class="disclaimer">
            Este tipo de jogo deve ser visto apenas como entretenimento. Jamais como investimento ou fonte de recursos.
        </p>
    </div>

    <!-- Caixa expansiva -->
    <div class="expansive-box">
        <div class="expansive-header" @click="toggleExpansion">
            <h2>Como Jogar Fortune Tiger</h2>
            <i :class="isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'" class="fa-solid"></i>
        </div>

        <div v-if="isExpanded" class="expansive-content">
            <p>Jogar no Fortune Tiger pode custar-lhe dinheiro e deve ser tratado como um passatempo divertido...</p>

            <!-- Bloco de citação com card estilizado -->
            <div class="quote-card">
            <div class="quote-symbol">“</div>
            <p class="quote-text">Em uma única rodada de Fortune Tiger, um apostador sortudo conseguiu o ganho de incríveis <strong>R$350.000</strong>, emplacando a maior vitória de Fortune Tiger no cassino KTO.</p>
            <p class="quote-author">Svilen Madjov, Chefe de Pesquisa</p>
            </div>

            <!-- Vídeo incorporado -->
            <div class="video-tutorial">
            <iframe width="560" height="315" src="https://youtu.be/M8bbFm9z9yg" frameborder="0" allowfullscreen></iframe>
            </div>

            <!-- Símbolos do jogo -->
            <h3>Os Símbolos do Fortune Tiger</h3>
            <ul style="list-style-type: disc;">
                <li>Símbolo de Pagamento Baixo: Laranja, Fogos de Artifício...</li>
                <li>Símbolo de Pagamento Alto: Tigrinho, Amuleto da Sorte...</li>
            </ul>

            <!-- Seção de Números -->
            <div class="numbers-section">
            <h2>Números de Fortune Tiger na KTO</h2>
            <p>Abaixo você pode ver os números de maior multiplicador, jogadores ativos (aqueles que jogaram pelo menos uma rodada no tigrinho) e a porcentagem total de rodadas de Fortune Tiger no cassino da KTO durante o mês de julho.</p>

            <table class="overview-table">
                <tr>
                    <th>Maior Multiplicador</th>
                    <td>x2500</td>
                </tr>
                <tr>
                    <th>Jogadores Ativos</th>
                    <td>54.76%</td>
                </tr>
                <tr>
                    <th>Rodadas</th>
                    <td>16.55%</td>
                </tr>
            </table>

            <p>Assim como em nosso estudo do <a href="#">mês de junho</a>, Fortune Tiger segue como o jogo mais popular em nosso cassino. Apesar de uma pequena queda em comparação aos 57,09% de popularidade do mês passado, o jogo do tigrinho segue extremamente dominante. Outro destaque muito importante de nosso estudo é que, mais uma vez, o multiplicador máximo de Fortune Tiger foi atingido por pelo menos um jogador sortudo.</p>

            <h3>Como visto em</h3>
            <div class="media-logos">
                <div class="media-logo">Encontro</div>
                <div class="media-logo">Portal Webcitizen</div>
            </div>
            </div>



            <!-- Nova Seção de Visão Geral -->
            <div class="overview-section">
                <h2>Visão Geral: Fortune Tiger: Jogo do Tigrinho</h2>
                <p>O Fortune Tiger oficial, o jogo do tigrinho, está disponível no <a href="#">cassino online</a> da KTO junto a diversos outros grandes sucessos. O jogo possui uma temática chinesa linda, com um ótimo desenho e de uma simplicidade que pode cativar todos os níveis de apostadores.</p>
                <p>Veja na tabela algumas informações pertinentes sobre o jogo:</p>

                <table class="overview-table">
                    <tr>
                        <th>Jogo</th>
                        <td>Fortune Tiger</td>
                    </tr>
                    <tr>
                        <th>Também conhecido como</th>
                        <td>Jogo do tigre, jogo do tigrinho, jogo de tigre aposta, joguinho do tigre</td>
                    </tr>
                    <tr>
                        <th>Data de Lançamento</th>
                        <td>2022</td>
                    </tr>
                    <tr>
                        <th>Provedor</th>
                        <td>PG Soft</td>
                    </tr>
                    <tr>
                        <th>Porcentagem RTP</th>
                        <td>96,81%</td>
                    </tr>
                    <tr>
                        <th>Bobinas e Linhas</th>
                        <td>3×3</td>
                    </tr>
                    <tr>
                        <th>Recursos</th>
                        <td>Multiplicadores, Wild, Re-spin</td>
                    </tr>
                    <tr>
                        <th>Linhas de Pagamento</th>
                        <td>5</td>
                    </tr>
                    <tr>
                        <th>Volatilidade</th>
                        <td>Médio</td>
                    </tr>
                    <tr>
                        <th>Aposta Mínima</th>
                        <td>R$0.40</td>
                    </tr>
                    <tr>
                        <th>Aposta Máxima</th>
                        <td>R$500</td>
                    </tr>
                    <tr>
                        <th>Vitória Máxima</th>
                        <td>2.500x</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>


  </div>
</template>
<script>
export default {
  data() {
    return {
      showIcon: false,
      isExpanded: true,
      id: 50,
      slug: 126,
      cover: '/assets/images/tiger.webp',
      distribution: 'kagaming',
    };
  },
  methods: {
    redirectToGame() {
      this.$router.push({ name: 'casinoPlayPage', params: { id: this.id, slug: this.slug } });
    },
    toggleExpansion() {
      this.isExpanded = !this.isExpanded;
    },
    updateMetaTags() {
      const metaTags = [
        { property: 'og:type', content: 'webpage' },
        { property: 'og:url', content: 'https://jogodotigre.com' },
        { property: 'og:title', content: 'Jogo do Tigre | Fortune Tiger' },
        { property: 'og:description', content: 'Descubra o emocionante jogo de apostas Fortune Tiger no cassino online.' },
        { property: 'og:image', content: '/assets/images/tiger_og.jpg' },
        { name: 'theme-color', content: '#0084FF' }
      ];

      metaTags.forEach(tag => {
        let metaElement = document.querySelector(`meta[property="${tag.property}"], meta[name="${tag.name}"]`);
        if (!metaElement) {
          metaElement = document.createElement('meta');
          if (tag.property) {
            metaElement.setAttribute('property', tag.property);
          } else {
            metaElement.setAttribute('name', tag.name);
          }
          document.head.appendChild(metaElement);
        }
        metaElement.setAttribute('content', tag.content);
      });
    }
  },
  mounted() {
    document.title = "Jogo do Tigre | Fortune Tiger"; // Atualiza o título da página
    this.updateMetaTags();

    // Adiciona JSON-LD para SEO
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Jogo do Tigre | Fortune Tiger",
      "description": "Descubra o emocionante jogo de apostas Fortune Tiger no cassino online.",
      "url": "https://seucassino.com",
      "image": "/assets/images/tiger.webp",
      "publisher": {
        "@type": "Organization",
        "name": "Jogo do Tigrinho",
        "logo": {
          "@type": "ImageObject",
          "url": "/assets/images/logo.png"
        }
      }
    });
    document.head.appendChild(schemaScript);
  }
};
</script>

<style scoped>
.tigrinho-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #000;
  color: #fff;
  min-height: 100vh;
}

.titlePage {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
}

.subtitle {
  font-size: 1rem;
  text-align: center;
  margin-bottom: 20px;
}

.item-game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-game {
  position: relative;
  border-radius: 15px;
  cursor: pointer;
}

.bdc {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bdc i {
  font-size: 3rem;
  color: white;
}

.game-image {
  width: 100%;
  max-width: 300px;
  border-radius: 15px;
}

.play-button {
  margin-top: 20px;
  margin-right: 40px;
  padding: 10px 20px;
  background-color: #00d100;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.expansive-box {
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  background-color: transparent;
  color: #fff;
  border-radius: 5px;
}

.expansive-header {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #444;
  border-radius: 5px;
}

.expansive-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.expansive-content {
  padding: 15px;
}

.quote-card {
  background-color: #3e3e3e;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  position: relative;
  color: #fff;
}

.quote-symbol {
  font-size: 3rem;
  color: #bbb;
  position: absolute;
  top: -20px;
  left: 20px;
}

.quote-text {
  font-size: 1rem;
  margin-left: 50px;
}

.quote-author {
  font-size: 0.9rem;
  color: #bbb;
  margin-top: 10px;
  text-align: right;
}

.video-tutorial {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

/* Seção com Números */
.numbers-section {
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  background-color: transparent;
  color: #fff;
  border-radius: 10px;
}

.numbers-section h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.numbers-section p {
  margin-bottom: 15px;
  font-size: 1rem;
}

.numbers-section a {
  color: #00d100;
  text-decoration: underline;
}

.stats-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.stats-table th, .stats-table td {
  padding: 10px;
  background-color: #444;
  border: 1px solid #555;
  text-align: left;
}

.stats-table th {
  width: 50%;
}

/* Nova Seção de Visão Geral */
.overview-section {
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  background-color: transparent;
  color: #fff;
  border-radius: 10px;
}

.overview-section h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
}

.overview-section p {
  margin-bottom: 15px;
  font-size: 1rem;
}

.overview-section a {
  color: #00d100;
  text-decoration: underline;
}

.overview-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
}

.overview-table th, .overview-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #555;
}

/* Cor padrão para o cabeçalho */
.overview-table th {
  background-color: #555;
  color: #fff;
}

/* Estilo para linhas pares e ímpares, tanto para th quanto td */
.overview-table tr:nth-child(even) th,
.overview-table tr:nth-child(even) td {
  background-color: #3e3e3e;
}

.overview-table tr:nth-child(odd) th,
.overview-table tr:nth-child(odd) td {
  background-color: #444;
}

/* FINALIZA AQ */

.media-logos {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 20px;
}

.media-logo {
  background-color: #444;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
}

/* Rodapé */
.infobutton {
  margin-top: 30px;
  text-align: center;
}

.infobutton-item {
  margin: 10px 0;
  font-size: 0.9rem;
}

.infobutton-item i {
  margin-right: 5px;
}

.disclaimer {
  font-size: 0.8rem;
  color: #ccc;
}
</style>
