import React from 'react';
import Layout from '../components/Layout';
import Board from '../components/Board';
import Controls from '../components/Controls';

const IndexPage : React.FC = () => (
  <Layout>
    <h1>Testo Robot Challenge</h1>
    <Board />
    <Controls />
  </Layout>
);

export default IndexPage;