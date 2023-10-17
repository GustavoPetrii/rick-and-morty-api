
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './Home.css';

export default function Personagem() {

    const [detalhesPersonagem, setPerson] = useState([]);
    const { idPerson } = useParams();

    useEffect(() => {

        const buscarInfos = async () => {
            try {
                const res = await axios.get(`https://rickandmortyapi.com/api/character/${idPerson}`);
                const dados = (res.data);
                setPerson(dados);
            }
            catch (error) {
                console.error('Error', error);
            }
        }
        buscarInfos();
    }, []);

    return (
        <div className="container_details" >
            {detalhesPersonagem ? (
                <div className="detail_card" >
                    <div className="details" >
                        <Link className="link" to="/">🠔</Link>
                        <h2>Detalhes do Personagem</h2>
                        <img
                            className="img_person"
                            src={detalhesPersonagem.image}
                            alt={detalhesPersonagem.name}
                        />
                        <p> Nome: {detalhesPersonagem.name}</p>
                        <p> Status: {detalhesPersonagem.status}</p>
                        <p> Espécie: {detalhesPersonagem.species}</p>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    )


}