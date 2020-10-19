import React, { FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { FiPlus } from "../../node_modules/react-icons/fi";
import { LeafletMouseEvent } from "leaflet";

import "../styles/pages/create-orphanage.css";
import Sidebar from "../components/Sidebar";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {
  const history = useHistory();

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [inputName, setInputName] = useState("");
  const [inputAbout, setInputAbout] = useState("");
  const [inputInstructions, setInputInstructions] = useState("");
  const [inputOpeningHours, setInputOpeningHours] = useState("");
  const [openOnWeekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [prevImages, setPrevImages] = useState<string[]>([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    //Criando Multipart Form
    const data = new FormData();

    data.append("name", inputName);
    data.append("about", inputAbout);
    data.append("instructions", inputInstructions);
    data.append("opening_hours", inputOpeningHours);
    data.append("open_on_weekends", String(openOnWeekends));
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));

    images.map((image) => {
      data.append("images", image);
    });
    console.log({
      inputName,
      inputAbout,
      inputInstructions,
      inputOpeningHours,
      openOnWeekends,
      latitude,
      longitude,
      images,
    });

    await api.post("/orphanages", data);

    alert("Cadastro realizado com sucesso");

    history.push("/map");
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-23.5505, -46.6333]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={(event: LeafletMouseEvent) => {
                const { lat, lng } = event.latlng;

                setPosition({
                  latitude: lat,
                  longitude: lng,
                });
              }}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 ? (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              ) : null}

              {/*  */}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={inputName}
                onChange={(event) => setInputName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={inputAbout}
                onChange={(event) => setInputAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {prevImages.map((img) => {
                  return (
                      <img key={img} src={img} alt="Orfanatos" />
                  );
                })}
                <label htmlFor="files" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={(event) => {
                  if (!event.target.files) {
                    return;
                  }

                  const auxImg = Array.from(event.target.files);
                  setImages(auxImg);

                  const prevImg = auxImg.map((img) => {
                    return URL.createObjectURL(img);
                  });

                  setPrevImages(prevImg);
                }}
                type="file"
                id="files"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={inputInstructions}
                onChange={(event) => setInputInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Abertura</label>
              <input
                id="opening_hours"
                value={inputOpeningHours}
                onChange={(event) => {
                  setInputOpeningHours(event.target.value);
                }}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

{
  /* // return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`; */
}
