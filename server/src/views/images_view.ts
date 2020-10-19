import Image from "../models/Image";

// É NA VIEW QUE SE CONTROLA O QUE É PASSADO.
// PARA ISSO, NÃO ESQUECER DE DAR IMPORT NO CONTROLLER.
export default {
  // Pega um objeto e retorna para o frontend da forma que ele deve ser exibido
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`
    };
  },

  // Pega uma lista de objetos e retorna
  renderMany(images: Image[]){
    return images.map(img => this.render(img));
  }
};
