import Layout from "../components/layout/Layout";

function SharedByMe() {
  return (
    <Layout type="user">
      <div className="content">
        <h2>Shared By Me</h2>
        <p>No shared files yet</p>
      </div>
    </Layout>
  );
}

export default SharedByMe;