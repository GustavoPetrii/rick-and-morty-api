import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import './Home.css';

export default function Home() {

    const [pesquisa, setPesquisa] = useState("");
    const [listaPerson, setListaPerson] = useState([]);
    const [status, setStatus] = useState("Alive");

    useEffect(() => {

        const buscarPerson = async () => {
            try {
                const API = "https://rickandmortyapi.com/api/character/?status=alive";
                const res = await axios.get(API);
                const dados = (res.data.results);
                setListaPerson(dados);
            }
            catch (error) {
                console.error('Error', error);
            }
        }

        buscarPerson();

    }, []);

    const buscarPesquisa = (e) => {
        setPesquisa(e.target.value);
    }

    const mudarNome = (nome) => {
        axios.get(`https://rickandmortyapi.com/api/character/?name=${nome}&status=${status}`)
            .then(res => {
                setListaPerson(res.data.results);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }

    const mudarStatus = (e) => {
        setStatus(e.target.value);
        axios.get(`https://rickandmortyapi.com/api/character/?status=${e.target.value}`)
            .then(res => {
                setListaPerson(res.data.results);
            })
            .catch(error => {
                console.error('Error', error);
            });
    };

    return (
        <div className="container" >
            <h1 className="Title" >Rick And Morty App</h1>
            <div className="container_card" >
                <h2>Lista de Personagens</h2>
                <div className="container_pesquisa" >
                    <div>
                        <input
                            className="input_pesquisar"
                            type="text"
                            placeholder="Pesquisar por nome"
                            value={pesquisa}
                            onChange={buscarPesquisa}
                        />
                        <button className="botao_pesquisar" onClick={() => mudarNome(pesquisa)}>Pesquisar</button>
                    </div>
                    <select className="dropdown" value={status} onChange={mudarStatus}>
                        <option value="Alive">Vivo</option>
                        <option value="Dead">Morto</option>
                        <option value="Unknown">Desconhecido</option>
                    </select>
                </div>
                {listaPerson && listaPerson.map((e, index) => (
                    <Link className="link" key={index} to={`/personagem/${e.id}`} >
                        <div >
                            <div className="card" >
                                <img className="img" src={e.image} />
                                <h1>{e.name}</h1>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
