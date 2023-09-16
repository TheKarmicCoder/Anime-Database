import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { IoIosArrowBack } from 'react-icons/io';

function AnimeItem() {
    const { id } = useParams()
    const navigate = useNavigate();

    // state
    const [anime, setAnime] = React.useState({})
    const [characters, setCharacters] = React.useState([])
    const [showMore, setShowMore] = React.useState(false)

    // destructure anime
    const {
        title, synopsis,
        trailer, duration, aired,
        season, images, rank,
        score, scored_by, popularity,
        status, rating, source } = anime

    // get anime based on id
    const getAnime = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}`)
        const data = await response.json()
        setAnime(data.data)
    }

    // get characters
    const getCharacters = async (anime) => {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${anime}/characters`)
        const data = await response.json()
        setCharacters(data.data)
    }

    // initial render
    useEffect(() => {
        getAnime(id)
        getCharacters(id)
    }, [id])

    return (
        <AnimeItemStyled>
                 <div className="back-button" onClick={() => navigate(-1)}>
                <IoIosArrowBack size={24} />
            </div>
            <h1>{title}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={images?.jpg.large_image_url} alt="" />
                    </div>
                    <div className="anime-details">
                        <p><span>Aired:</span><span>{aired?.string}</span></p>
                        <p><span>Rating:</span><span>{rating}</span></p>
                        <p><span>Rank:</span><span>{rank}</span></p>
                        <p><span>Score:</span><span>{score}</span></p>
                        <p><span>Scored By:</span><span>{scored_by}</span></p>
                        <p><span>Popularity:</span><span>{popularity}</span></p>
                        <p><span>Status:</span><span>{status}</span></p>
                        <p><span>Source:</span><span>{source}</span></p>
                        <p><span>Season:</span><span>{season}</span></p>
                        <p><span>Duration:</span><span>{duration}</span></p>
                    </div>
                </div>
                <p className="description">
                    {showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
                    <button onClick={() => {
                        setShowMore(!showMore)
                    }}>{showMore ? 'Show Less' : 'Read More'}</button>
                </p>
            </div>
            <h3 className="title">Trailer</h3>
            <div className="trailer-con">
                {trailer?.embed_url ?
                    <iframe
                        src={trailer?.embed_url}
                        title="Inline Frame Example"
                        width="800"
                        height="450"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                    </iframe> :
                    <h3>Trailer not available</h3>
                }
            </div>
            <h3 className="title">Characters</h3>
            <div className="characters">
                {characters?.map((character, index) => {
                    const { role } = character
                    const { images, name, mal_id } = character.character
                    return <Link to={`/character/${mal_id}`} key={index}>
                        <div className="character">
                            <img src={images?.jpg.image_url} alt="" />
                            <h4>{name}</h4>
                            <p>{role}</p>
                        </div>
                    </Link>
                })}
            </div>
        </AnimeItemStyled >
    )
}

// ...

// ...

// ...

// ...

const AnimeItemStyled = styled.div`
    padding: 3rem 18rem;
    background-color: #EDEDED;
    h1 {
        display: inline-block;
        font-size: 3rem;
        margin-bottom: 1.5rem;
        cursor: pointer;
        background: linear-gradient( to right, #A855F7, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        transition: all .4s ease-in-out;
        &:hover {
            transform: skew(-3deg);
        }
    }
    .title {
        display: inline-block;
        margin: 3rem 0;
        font-size: 2rem;
        cursor: pointer;
        background: linear-gradient( to right, #A855F7 23%, #27AE60);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .description {
        margin-top: 2rem;
        color: #6c7983;
        line-height: 1.7rem;
        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 1.2rem;
            color: #27AE60;
            font-weight: bold;
        }
    }

    .trailer-con {
        display: flex;
        justify-content: center;
        align-items: center;
        iframe {
            outline: none;
            border: 5px solid #e5e7eb;
            padding: 1.5rem;
            border-radius: 10px;
            background-color: #FFFFFF;
        }
    }

    .anime-details {
        background-color: #fff;
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #e5e7eb;
        margin-top: 2rem;
        .detail {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            img {
                border-radius: 7px;
            }
        }
        .anime-details {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            p {
                display: flex;
                gap: 1rem;
                align-items: center;
            }
            p span:first-child {
                font-weight: bold;
                color: #454e56;
                min-width: 120px;
            }
        }
    }

    /* Added a wrapper container for the characters */
    .characters-wrapper {
        display: flex;
        justify-content: center;
        border: 5px solid #e5e7eb;
        border-radius: 20px;
        background-color: #fff;
    }

    .characters {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 2rem;
        padding: 2rem;
        justify-content: center;
        flex-wrap: wrap;
        .character {
            flex: 0 1 calc(20% - 2rem);
            padding: .4rem .6rem;
            border-radius: 7px;
            background-color: #EDEDED;
            transition: all .4s ease-in-out;
            img {
                width: 100%;
            }
            h4 {
                padding: .5rem 0;
                font-weight: bold;
                color: #454e56;
            }
            p {
                font-weight: bold;
                color: #27AE60;
            }
            &:hover {
                transform: translateY(-5px);
            }
        }
    }
`;

export default AnimeItem;
