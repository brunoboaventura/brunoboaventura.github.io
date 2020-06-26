class Jogo {
  constructor() {
    this.inimigoAtual = 0;
    this.fimDeJogo = false;
  }

  setup() {
    // cenario = new Cenario(imagemCenario, 3);
    
    // PAralax
    cenario_1 = new Cenario(imagemCena_1, 1);
    cenario_2 = new Cenario(imagemCena_2, 1.5);
    cenario_3 = new Cenario(imagemCena_3, 2);
    cenario_4 = new Cenario(imagemCena_4, 2.5);
    cenario_5 = new Cenario(imagemCena_5, 2.4);
    cenario_6 = new Cenario(imagemCena_6, 3);


    // Fim Paralax
    
    
    pontuacao = new Pontuacao();
    vida = new Vida(3, 3)

    personagem = new Personagem(matrizPersonagem, imagemPersonagem, 100, 30, 110, 125, 220, 270);

    const inimigo = new Inimigo(matrizInimigo, imagemInimigo, width - 52, 30, 52, 52, 104, 104, 10, 100);
    const inimigoGrande = new Inimigo(matrizInimigoGrande, imagemInimigoGrande, width, 0, 200, 200, 400, 400, 10, 100);
    const inimigoVoador = new Inimigo(matrizInimigoVoador, imagemInimigoVoador, width - 52, 200, 100, 75, 200, 150, 10, 100);
    
    const inimigoSegundo = new Inimigo(matrizInimigo, imagemInimigo, width - 52, 30, 52, 52, 104, 104, 10, 500);
    const inimigoTerceiro = new Inimigo(matrizInimigoGrande, imagemInimigoGrande, width, 0, 200, 200, 400, 400, 10, 3000);

    inimigos.push(inimigo);
    inimigos.push(inimigoGrande);
    inimigos.push(inimigoVoador);
    inimigos.push(inimigoSegundo);
    inimigos.push(inimigoTerceiro);
  }

  keyPressed(key){
  if(!this.fimDeJogo && key === 'ArrowUp'){
    if(personagem.pula());
  } else if(this.fimDeJogo && key === 'Enter'){
    window.location.reload();
  }
}


  draw() {
    // cenario.exibe();
    // cenario.move();

    
    cenario_1.exibe();
    cenario_1.move();
    cenario_2.exibe();
    cenario_2.move();
    cenario_3.exibe();
    cenario_3.move();
    cenario_4.exibe();
    cenario_4.move();
    cenario_5.exibe();
    cenario_5.move();
    
    
    vida.draw();
    pontuacao.exibe();
    pontuacao.adicionarPonto();

    personagem.exibe();
    personagem.aplicaGravidade();

    const inimigo = inimigos[this.inimigoAtual];
    const inimigoVisivel = inimigo.x < -inimigo.largura;

    inimigo.exibe();
    inimigo.move();

    if (inimigoVisivel) {
      this.inimigoAtual++;
      if (this.inimigoAtual > 2) {
        this.inimigoAtual = 0;
      }
      inimigo.velocidade = parseInt(random(10, 30));
    }
    
    const inimigo2 = inimigos[3];
    const inimigoVisivel2 = inimigo2.x < -inimigo2.largura;
    
    inimigo2.velocidade = parseInt(random(5, 25));
    inimigo2.delay = 1500;
    inimigo2.exibe();
    inimigo2.move();
    
    const inimigo3 = inimigos[4];
    const inimigoVisivel3 = inimigo3.x < -inimigo2.largura;
    
    inimigo3.velocidade = parseInt(random(15, 35));
    inimigo3.delay = 20000;
    inimigo3.exibe();
    inimigo3.move();

    if (personagem.estaColidindo(inimigo)) {
      vida.perdeVida();
      somColisao.play();
      personagem.tornarInvencivel();
      
      if (vida.vidas === 0) {
        gameOver(this)
        noLoop();
      }
    }

    if (personagem.estaColidindo(inimigo2)) {
      vida.perdeVida();
      somColisao.play();
      personagem.tornarInvencivel();
      
      if (vida.vidas === 0) {
        gameOver(this)
        noLoop();
      }
    }
    
    if (personagem.estaColidindo(inimigo3)) {
      vida.perdeVida();
      somColisao.play();
      personagem.tornarInvencivel();
      
      if (vida.vidas === 0) {
        gameOver(this)
        noLoop();
      }
    }
    
    cenario_6.exibe();
    cenario_6.move();
    
  }
}

function gameOver(that) {  
  background('rgba(0%,0%,0%,.80)');
  fill("fff");
  
  textAlign(CENTER);
  textSize(30);
  text(`You scored ${parseInt(pontuacao.pontos)} PointS`,
          width / 2,
          height / 2 -80
        );
  
  image(imagemGameOver, width / 2 - 412 / 2, height / 2 - 78 / 2);
  somDoJogo.stop()
  somMorreu.play();
  that.fimDeJogo = true;
  textAlign(CENTER)
  textSize(30);
  text("Press ENTER to play agaiN", width / 2, height/2+150 )   
  
}