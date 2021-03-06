import React from 'react';
import Layout from '../components/Layout';
import TextControl from '../components/TextControl';
import Board from '../components/Board';
import Robot from '../components/Robot';
import Controls from '../components/Controls';
import Error from '../components/Error';
import '../assets/css/style.css';

const IndexPage : React.FC = () => (
  <Layout>
    <h1>Testo Robot Challenge</h1>
    <Board render={({ direction }) => <Robot direction={direction} />} />
    <Error />
    <Controls />
    <TextControl />
  </Layout>
);

export default IndexPage;