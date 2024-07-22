// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Container, Row, Col, Image, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import '../App.css';

// const API_URL = 'https://api.themoviedb.org/3/search/movie';
// const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
// const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

// const SearchedMoviePage = () => {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const searchQuery = query.get('query');

//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         if (searchQuery) {
//           const response = await fetch(
//             `${API_URL}?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1`
//           );
//           const data = await response.json();
//           setMovies(data.results);
//         }
//       } catch (error) {
//         console.error('Error fetching searched movies:', error);
//       }
//     };

//     fetchMovies();
//   }, [searchQuery]);

//   return (
//     <Container>
//       <Row xs={1} md={2} lg={3} xl={4} className="g-4">
//         {movies.length > 0 ? (
//           movies.map(movie => (
//             <Col key={movie.id} className="d-flex flex-column align-items-center movie-col">
//               <Image src={`${IMAGE_URL}${movie.poster_path}`} rounded className="mb-2 movie-poster" />
//               <h3 className="movie-title">{movie.title}</h3>
//               <p>Rating: {movie.vote_average}</p>
//               <Link to={`/movie/${movie.id}`}>
//                 <Button variant="dark">View Details</Button>
//               </Link>
//             </Col>
//           ))
//         ) : (
//           <Col>
//             <p>No movies found.</p>
//           </Col>
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default SearchedMoviePage;

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import '../App.css';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const SearchedMoviePage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get('query');

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (searchQuery) {
          const response = await fetch(
            `${API_URL}?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${page}`
          );
          const data = await response.json();
          setMovies(data.results);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        console.error('Error fetching searched movies:', error);
      }
    };

    fetchMovies();
  }, [searchQuery, page]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {movies.length > 0 ? (
          movies.map(movie => (
            <Col key={movie.id} className="d-flex flex-column align-items-center movie-col">
              <Image src={`${IMAGE_URL}${movie.poster_path}`} rounded className="mb-2 movie-poster" />
              <h3 className="movie-title">{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              <Link to={`/movie/${movie.id}`}>
                <Button variant="dark">View Details</Button>
              </Link>
            </Col>
          ))
        ) : (
          <Col>
            <p>No movies found.</p>
          </Col>
        )}
      </Row>
      <div className="pagination-buttons d-flex justify-content-center mt-4">
        <Button onClick={handlePreviousPage} disabled={page === 1} className="mx-2">Previous</Button>
        <Button onClick={handleNextPage} disabled={page === totalPages} className="mx-2">Next</Button>
      </div>
    </Container>
  );
};

export default SearchedMoviePage;
