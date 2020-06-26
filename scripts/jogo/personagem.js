class Personagem extends Animacao {
  constructor(matriz, imagem, x, variacaoY, largura, altura, larguraSprite, alturaSprite) {
    super(matriz, imagem, x, variacaoY, largura, altura, larguraSprite, alturaSprite);
    this.imagem = imagem;

    this.frameAtual = 0;

    this.variacaoY = variacaoY;

    this.yInicial = height - this.altura - this.variacaoY;
    this.y = this.yInicial;

    this.velocidadeDoPulo = 0;
    this.gravidade = 3;
    this.qntPulos = 2;
    this.alturaDoPulo = -30;
    this.invencivel = false;
  }

  pula() {
    if (this.qntPulos > 0) {
      this.velocidadeDoPulo = this.alturaDoPulo;
      this.qntPulos--;
      somDoPulo.play();
    }
  }

  aplicaGravidade() {
    this.y = this.y + this.velocidadeDoPulo
    this.velocidadeDoPulo = this.velocidadeDoPulo + this.gravidade;

    if (this.y > this.yInicial) {
      this.y = this.yInicial
      this.qntPulos = 2;
    }
  }

  tornarInvencivel() {
    this.invencivel = true
    setTimeout(() => {
      this.invencivel = false
    }, 1000)
  }

  estaColidindo(inimigo) {

    if (this.invencivel) {
      return false;
    }

    const precisao = 0.7;
    
    // noFill();
    // circle(this.x, 
    //   this.y, 
    //   this.largura * precisao, 
    //   this.altura * precisao)
    // circle(inimigo.x, 
    //   inimigo.y, 
    //   inimigo.largura * precisao, 
    //   inimigo.altura * precisao)

    const colisao = collideRectRect(
      this.x,
      this.y,
      this.largura * precisao,
      this.altura * precisao,
      inimigo.x,
      inimigo.y,
      inimigo.largura * precisao,
      inimigo.altura * precisao
    );

    return colisao;
  }

}