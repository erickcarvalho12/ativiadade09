let jogo;

const elementos = {
  radioButton: {
    facil: document.querySelector(`#facil`),
    medio: document.querySelector(`#medio`),
    dificil: document.querySelector(`#dificil`),
  },

telaInicial: document.getElementById('inicial'),
telaJogo: document.getElementById('jogo'),
telaCadastro: document.getElementById(`cadastro`),
telaMensagem: document.querySelector('.mensagem'),
textoMensagem: document.querySelector('.mensagem .texto'),
teclado: document.querySelector('.teclado'),
telaDica: document.querySelector(`.dica`),
textoDica: document.querySelector(`#texto-dica`),
palavra: document.querySelector('.palavra'),
palavraCadastrada: document.querySelector(`#palavraCadastrada`),
dicaCadastrada: document.querySelector(`#dicaCadastrada`),
botoes: {
  facil: document.querySelector('.botao-facil'),
  medio: document.querySelector('.botao-medio'),
  dificil: document.querySelector('.botao-dificil'),
  reiniciar: document.querySelector('.reiniciar'),
  telaCadastro: document.querySelector('#cadastrar-palavra'),
  cadastrar: document.querySelector('#botao-cadastro'),
  dica: document.querySelector('#dica'),
},
boneco: [
  document.querySelector('.boneco-cabeca'),
  document.querySelector('.boneco-corpo'),
  document.querySelector('.boneco-braco-esquerdo'),
  document.querySelector('.boneco-braco-direito'),
  document.querySelector('.boneco-perna-esquerda'),
  document.querySelector('.boneco-perna-direita'),
],
};

const palavras = {
  facil: {
  palavra: ['Flamengo', 'Fluminense', 'Vasco', 'Botafogo', 'SãoPaulo', 'Santos', 'Corinthians', 'Palmeiras'],
  dica: ['Menor do rio', 'Pai do Flamengo', 'Bacalhau', 'Bairro', 'Soberano', 'Asilo', 'O campeão dos campeões', 'fiu-fiu']
  }, 
  medio: {
  palavra: ['Internacional', 'Grêmio', 'AtléticoMG', 'AthleticoPR', 'Coritiba', 'Bahia', 'Ceará', 'Fortaleza'],
  dica: ['Maior do Sul', 'Imortal que sempre morre', 'G**** da Massa', 'Patético', 'BBMP', 'Salscicha', 'Volta Ceni']
  },  
  dificil:{
  palavra: ['CSA', 'CRB', 'Oeste', 'Bragantino', 'Aparecidense', 'Olária', 'Ibis', 'MIBR', 'RioBranco'],
  dica: ['Pimpão', 'GUM', 'Orinho', 'Linguiça Atômica', 'Campeão Goiano terceira divisão 2002', 'Campeão brasileiro Série C 1981', 'Pior time do mundo', 'Pior time de CS do mundo', 'Maior do Paraná']
  } 
};



const novoJogo = () => {
jogo = {
dificuldade: undefined,
palavra: {
  original: undefined,
  semAcentos: undefined,
  tamanho: undefined,
  dica: undefined,
},
  acertos: undefined,
  jogadas: [],
  chances: 6,
  definirPalavra: function (palavra, dica) {
    this.palavra.original = palavra;
    console.log(palavra);
    this.palavra.tamanho = palavra.length;
    this.acertos = '';
    this.palavra.dica = dica;
    this.palavra.semAcentos = this.palavra.original.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    for (let i = 0; i < this.palavra.tamanho; i++) {
      this.acertos += ' ';
    }
  },
  jogar: function (letraJogada) {
    let acertou = false;
    for (let i = 0; i < this.palavra.tamanho; i++) {
        const letra = this.palavra.semAcentos[i].toLowerCase();
        if (letra === letraJogada.toLowerCase()) {
          acertou = true;
          this.acertos = replace(this.acertos, i, this.palavra.original[i]);
        }
      }
      if (!acertou) {
        this.chances--;
      }
      return acertou;
    },
    ganhou: function () {
      return !this.acertos.includes(' ');
    },
    perdeu: function () {
      return this.chances <= 0;
    },
    acabou: function () {
      return this.ganhou() || this.perdeu();
    },
  };

  elementos.telaInicial.style.display = 'flex';
  elementos.telaJogo.style.display = 'none';
  elementos.telaMensagem.style.display = 'none';
  elementos.telaMensagem.classList.remove('mensagem-vitoria');
  elementos.telaMensagem.classList.remove('mensagem-derrota');
  elementos.telaDica.style.display = 'none';
  elementos.textoDica.style.display = 'none';
  elementos.telaDica.classList.remove['mensagem-dica'];
  for (const parte of elementos.boneco) {
    parte.classList.remove('escondido');
    parte.classList.add('escondido');
  }

  criarTeclado();
};

const criarTeclado = () => {
  const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
  elementos.teclado.textContent = '';
  for (const letra of letras) {
    const button = document.createElement('button');
    button.appendChild(document.createTextNode(letra.toUpperCase()));
    button.classList.add(`botao-${letra}`);

    elementos.teclado.appendChild(button);

    button.addEventListener('click', () => {
      if (!jogo.jogadas.includes(letra) && !jogo.acabou()) {
        const acertou = jogo.jogar(letra);
        jogo.jogadas.push(letra);
        button.classList.add(acertou ? 'certo' : 'errado');
        mostrarPalavra();

        if (!acertou) {
          mostrarErro();
        }

        if (jogo.ganhou()) {
          mostrarMensagem(true);
        } else if (jogo.perdeu()) {
          mostrarMensagem(false);
        }
      }
    });
  }
};

const mostrarErro = () => {
  const parte = elementos.boneco[5 - jogo.chances];
  parte.classList.remove('escondido');
};

const mostrarMensagem = vitoria => {
  const mensagem = vitoria ? '<p>Parabéns!</p><p>Você GANHOU!</p>' : '<p>ERROU!!!!!!!!!!!</p><p>Você PERDEU!</p>';
  elementos.textoMensagem.innerHTML = mensagem;
  elementos.telaMensagem.style.display = 'flex';
  elementos.telaMensagem.classList.add(`mensagem-${vitoria ? 'vitoria' : 'derrota'}`);
  elementos.telaDica.style.display = 'none';
};

const sortearPalavra = () => {
  const i = Math.floor(Math.random() * palavras[jogo.dificuldade].palavra.length);

  console.log(i);

  const palavra = palavras[jogo.dificuldade].palavra[i];
  const dica = palavras[jogo.dificuldade].dica[i]

  console.log(palavra);
  console.log(dica);

  jogo.definirPalavra(palavra,dica);

  console.log(jogo.palavra.original);

  return jogo.palavra.original;
};

const mostrarPalavra = () => {
  elementos.palavra.textContent = '';
  for (let i = 0; i < jogo.acertos.length; i++) {
    const letra = jogo.acertos[i].toUpperCase();
    elementos.palavra.innerHTML += `<div class="letra-${i}">${letra}</div>`;
  }
};

const iniciarJogo = dificuldade => {
  jogo.dificuldade = dificuldade;
  elementos.telaInicial.style.display = 'none';
  elementos.telaCadastro.style.display = 'none';
  elementos.telaJogo.style.display = 'flex';


  sortearPalavra();
  mostrarPalavra();
  telaDica();
};

const carregarTelaCadastro = () => {
  elementos.telaCadastro.style.display = 'flex'
  elementos.telaInicial.style.display = 'none'
  elementos.telaJogo.style.display = 'none'
};

const telaDica = () => {
  elementos.botoes.dica.style.display = 'flex'
  elementos.textoDica.style.display = 'flex'
  elementos.textoDica.innerHTML = `<p>DICA</p>`
  elementos.telaDica.style.display = 'flex'
};


const mostrarDica = () => {
  elementos.textoDica.innerHTML = `<p>${jogo.palavra.dica}</p>`
  elementos.telaDica.classList.add('mensagem-dica')
  elementos.botoes.dica.style.display = 'none'
};

const cadastrarPalavra = () => {
  console.log("brisa bbbbbb");

  for (const i in elementos.radioButton) {
    console.log("brisa b*****sso");
      if (elementos.radioButton[i].checked) {
          if (!palavras[`${i}`].palavra.includes(elementos.palavraCadastrada.value) && elementos.palavraCadastrada.value != "" && elementos.dicaCadastrada.value != "") {
              palavras[`${i}`].palavra.push(elementos.palavraCadastrada.value)
              palavras[`${i}`].dica.push(elementos.dicaCadastrada.value)
              elementos.telaInicial.style.display = 'flex'
              elementos.telaCadastro.style.display = 'none'
              elementos.telaJogo.style.display = 'none'
          } else {
              console.log("Palavra ja existente no jogo");
          }
      }
  }
};

const replace = (str, i, newChar) => str.substring(0, i) + newChar + str.substring(i + 1);

elementos.botoes.facil.addEventListener('click', () => iniciarJogo('facil'));
elementos.botoes.medio.addEventListener('click', () => iniciarJogo('medio'));
elementos.botoes.dificil.addEventListener('click', () => iniciarJogo('dificil'));

elementos.botoes.reiniciar.addEventListener('click', () => novoJogo());
elementos.botoes.telaCadastro.addEventListener('click', () => carregarTelaCadastro());
elementos.botoes.cadastrar.addEventListener('click', () => cadastrarPalavra());
elementos.botoes.dica.addEventListener('click', () => mostrarDica());

novoJogo();
