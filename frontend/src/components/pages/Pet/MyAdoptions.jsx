import React, { useState, useEffect } from "react";

import api from "../../../utils/api";

import styles from "./Dashboard.module.css";
import RoundedImage from "../../layout/RoundedImage";

const MyAdoptions = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  return (
    <section>
      <div className={styles.pet_list_header}>
        <h1>Minhas adoções</h1>
      </div>
      <div className={styles.pet_list_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              <RoundedImage
                src={`${import.meta.env.VITE_REACT_APP_API}/images/pets/${
                  pet.images[0]
                }`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para: </span> {pet.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com: </span> {pet.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Ainda não há adoções de pets.</p>}
      </div>
    </section>
  );
};

export default MyAdoptions;
