import Head from "next/head";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalState";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import { Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
  netflixOriginals: [Movie];
  trendingNow: [Movie];
  topRated: [Movie];
  actionMovies: [Movie];
  comedyMovies: [Movie];
  horrorMovies: [Movie];
  romanceMovies: [Movie];
  documentaries: [Movie];
}

const Home = ({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
}: Props) => {

  const {loading} = useAuth()
  const showModal = useRecoilValue(modalState)

  if(loading){
    return <p>Loading...</p>
  }

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Andflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-6">
        <Banner netflixOriginals={netflixOriginals}/>
        <section className="md:space-y-24 mt-48">
          <Row title='Trending Now' movies={trendingNow}/>
          <Row title='Top Rated' movies={topRated}/>
          <Row title='Action & Adventure' movies={actionMovies}/>
          {/* My List Component */}
          {/* {list.length > 0 && <Row title='My List' movies={list}/>} */}
          <Row title='Horror' movies={horrorMovies}/>
          <Row title='Comedies' movies={comedyMovies}/>
          <Row title='Documentaries' movies={documentaries}/>
          <Row title='Feel Good Movies' movies={romanceMovies}/>
        </section>
      </main>
      {showModal && (<Modal />)}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};
