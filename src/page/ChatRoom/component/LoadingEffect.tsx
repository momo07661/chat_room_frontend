import Spinner from 'react-bootstrap/Spinner';

function LoadingEffect() {
  return (
    <Spinner animation="border" role="status" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default LoadingEffect;