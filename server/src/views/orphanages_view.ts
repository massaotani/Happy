import Orphanage from "../models/Orphanage";
import imageView from '../views/images_view'

// É NA VIEW QUE SE CONTROLA O QUE É PASSADO.
// PARA ISSO, NÃO ESQUECER DE DAR IMPORT NO CONTROLLER.
export default {
  // Pega um objeto e retorna para o frontend da forma que ele deve ser exibido
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imageView.renderMany(orphanage.images)
    };
  },

  // Pega uma lista de objetos e retorna
  renderMany(orphanages: Orphanage[]){
    return orphanages.map(orphanage => this.render(orphanage));
  }
};
