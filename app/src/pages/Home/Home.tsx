import {
  Container,
  AboutButton,
  HomeSignUpButton,
  HomeTitle,
} from './components';

const Home = () => {
  return (
    <Container>
      <HomeTitle>Bienvenido a MyApp</HomeTitle>
      <p className="text-lg mb-8">
        Tu plataforma para gestionar todo de manera eficiente.
      </p>
      <div className="space-x-4">
        <AboutButton />
        <HomeSignUpButton />
      </div>
    </Container>
  );
};

export default Home;
