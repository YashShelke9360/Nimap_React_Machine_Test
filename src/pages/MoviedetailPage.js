import '../App.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then(data => setMovie(data));

    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setCast(data.cast));
  }, [id]);

  return (
    <Container >
      <Row >
        <Col md={4}>
          <Image src={`${IMAGE_URL}${movie.poster_path}`} fluid />
        </Col>
        <Col md={8}>
          <Card.Title className="text-white">{movie.title}</Card.Title><br></br>
          <Card.Title className="text-white">Rating: {movie.vote_average}</Card.Title><br></br><br></br>
          <Card.Title className="text-white">Release Date: {movie.release_date}</Card.Title><br></br>
          <Card.Title className="text-white">{movie.overview}</Card.Title>
        </Col>
      </Row>
      <Row className="g-4">
        <Col>
        <br />
          <h1 style={{color:'white'}}>Cast</h1>

          <Row xs={1} md={2} lg={3} xl={4}>
        {cast.map(actor => (
          <Col key={actor.cast_id} className="d-flex flex-column align-items-center movie-col">
            <Image src={`${IMAGE_URL}${actor.profile_path}`} rounded className="mb-2 movie-poster" />
            <h3 className="movie-title">{actor.name}</h3>
            <p >Character: {actor.character}</p>

          </Col>
        
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MovieDetailPage;

