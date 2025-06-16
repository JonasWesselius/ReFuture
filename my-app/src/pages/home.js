import React from 'react';
import './home.css';
import TranslateWidget, { TranslatedText } from './translate';

function Card({ children }) {
  return (
    <div style={styles.card}>
      {children}
    </div>
  );
}

function Home() {
  return (
    <div style={styles.page}>

      {/* Post Input Bar */}
      <div style={styles.inputBar}>
        <div style={styles.inputAvatar}>👤</div>
        <div style={styles.inputBox}>Start by writing your post..</div>
        <div style={styles.cameraIcon}>📷</div>
      </div>

      {/* Post Cards */}
      <Card>
        <div style={styles.postHeader}>
          <div style={styles.avatar}>JD</div>
          <div>
            <div style={styles.name}>John Doe</div>
            <div style={styles.meta}>2,321 Followers • 1w • Edited</div>
          </div>
          <div style={styles.dots}>⋮</div>
        </div>

        <div style={styles.postBody}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            <span style={styles.more}>...more</span>
          </p>
          <div style={styles.translate}>Show translation</div>
        </div>

        <div style={styles.linkPreview}>
          <div style={styles.linkImage}>🖼️</div>
          <div style={styles.linkText}>johndoe.nl</div>
        </div>

        <div style={styles.postActions}>
          <button style={styles.button}>👍 Like</button>
          <button style={styles.button}>💬 Comment</button>
          <button style={styles.button}>🔁 Repost</button>
          <button style={styles.button}>🔗 Share</button>
        </div>
      </Card>

      <Card>
        <div style={styles.postHeader}>
          <div style={styles.avatar}>PJ</div>
          <div>
            <div style={styles.name}>Piet Jan</div>
            <div style={styles.meta}>523 Followers • 3w • Edited</div>
          </div>
          <div style={styles.dots}>⋮</div>
        </div>

        <div style={styles.postBody}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            <span style={styles.more}>...more</span>
          </p>
          <div style={styles.translate}>Show translation</div>
        </div>

        <div style={styles.linkPreview}>
          <div style={styles.linkImage}>🖼️</div>
          <div style={styles.linkText}>pietjan.nl</div>
        </div>

        <div style={styles.postActions}>
          <button style={styles.button}>👍 Like</button>
          <button style={styles.button}>💬 Comment</button>
          <button style={styles.button}>🔁 Repost</button>
          <button style={styles.button}>🔗 Share</button>
        </div>
      </Card>

      <Card>
        <div style={styles.postHeader}>
          <div style={styles.avatar}>E</div>
          <div>
            <div style={styles.name}>Erik</div>
            <div style={styles.meta}>4,741 Followers • 4w • Edited</div>
          </div>
          <div style={styles.dots}>⋮</div>
        </div>

        <div style={styles.postBody}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            <span style={styles.more}>...more</span>
          </p>
          <div style={styles.translate}>Show translation</div>
        </div>

        <div style={styles.linkPreview}>
          <div style={styles.linkImage}>🖼️</div>
          <div style={styles.linkText}>pietjan.nl</div>
        </div>

        <div style={styles.postActions}>
          <button style={styles.button}>👍 Like</button>
          <button style={styles.button}>💬 Comment</button>
          <button style={styles.button}>🔁 Repost</button>
          <button style={styles.button}>🔗 Share</button>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  page: {
    padding: '24px',
    fontFamily: 'sans-serif',
    minHeight: '100vh',
    backgroundColor: 'transparent',
  },
  inputBar: {
    display: 'flex',
    alignItems: 'center',
    background: '#f9f9f9',
    borderRadius: '999px',
    padding: '8px 12px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    margin: '0 auto 30px auto',
  },
  inputAvatar: {
    background: '#8faaff',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: 'black',
    marginRight: '12px',
  },
  inputBox: {
    flexGrow: 1,
    background: '#f2f2f2',
    borderRadius: '999px',
    padding: '10px 16px',
    color: '#444',
    fontSize: '14px',
  },
  cameraIcon: {
    fontSize: '20px',
    color: '#4f6bed',
    marginLeft: '12px',
    cursor: 'pointer',
  },
  card: {
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    marginTop: '30px',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    background: '#d63384',
    color: 'white',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  name: {
    fontWeight: 'bold',
  },
  meta: {
    fontSize: '12px',
    color: 'gray',
  },
  dots: {
    marginLeft: 'auto',
    cursor: 'pointer',
    color: 'gray',
  },
  postBody: {
    marginTop: '12px',
    fontSize: '14px',
    color: '#333',
  },
  more: {
    color: '#0073b1',
    cursor: 'pointer',
  },
  translate: {
    color: '#0073b1',
    fontSize: '13px',
    marginTop: '8px',
    cursor: 'pointer',
  },
  linkPreview: {
    marginTop: '16px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  linkImage: {
    background: '#eee',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    padding: '12px',
    fontSize: '14px',
    color: '#555',
  },
  postActions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
    borderTop: '1px solid #eee',
    paddingTop: '12px',
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'gray',
  },
};

export default Home;
