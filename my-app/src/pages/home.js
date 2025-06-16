import React, { useState, useRef, useEffect } from 'react';

function CreatePostOverlay({ isOpen, onClose, onSubmit }) {
  const [postContent, setPostContent] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [imageForSubmission, setImageForSubmission] = useState(null);
  const fileInputRef = useRef(null);

  const emojis = [
    '😊', '😂', '❤️', '👍', '🎉', '🙏', '💪', '🤝',
    '😎', '😍', '😢', '😡', '🤔', '👏', '🎯', '💼'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim() && !imageForSubmission) return;
    
    onSubmit(postContent, imageForSubmission);
    setPostContent('');
    setSelectedImageName(null);
    setImageForSubmission(null);
    onClose();
  };

  const handleEmojiClick = (emoji) => {
    setPostContent(prev => prev + emoji);
    setShowEmojis(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageForSubmission(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImageName(null);
      setImageForSubmission(null);
    }
  };

  const removeImage = () => {
    setSelectedImageName(null);
    setImageForSubmission(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Helper function to get a display name for the image
  const getDisplayImageName = (fileName) => {
    if (!fileName) return '';
    // If the filename looks like a data URI, display a generic message
    if (fileName.startsWith('data:image')) {
      return 'Image attached';
    }
    // Otherwise, display the actual filename
    return fileName;
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.overlayContent}>
        <div style={styles.overlayHeader}>
          <h2 style={styles.overlayTitle}>Create Post</h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What's on your mind?"
            style={styles.postTextarea}
          />
          
          {selectedImageName && (
            <div style={styles.imageAttachedIndicator}>
              📷 {getDisplayImageName(selectedImageName)}
              <button 
                type="button" 
                onClick={removeImage}
                style={styles.removeImageButton}
              >
                ×
              </button>
            </div>
          )}

          <div style={styles.overlayActions}>
            <div style={styles.overlayIcons}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <span 
                style={styles.icon} 
                onClick={handleImageClick}
                title="Add image"
              >
                📷
              </span>
              <span 
                style={styles.icon} 
                onClick={() => setShowEmojis(!showEmojis)}
                title="Add emoji"
              >
                😊
              </span>
            </div>
            <button type="submit" style={styles.postButton}>Post</button>
          </div>

          {showEmojis && (
            <div style={styles.emojiPicker}>
              {emojis.map((emoji, index) => (
                <span
                  key={index}
                  style={styles.emoji}
                  onClick={() => handleEmojiClick(emoji)}
                >
                  {emoji}
                </span>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

function Card({ post, onLike, onComment, onRepost, onShare }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onComment(post.id, newComment);
    setNewComment('');
  };

  return (
    <div style={styles.card}>
      {post.repostedFrom && (
        <div style={styles.repostHeader}>
          🔁 Reposted from {post.repostedFrom.author} • {post.repostedFrom.timeAgo}
        </div>
      )}
      <div style={styles.postHeader}>
        <div style={styles.avatar}>{post.author.charAt(0)}</div>
        <div>
          <div style={styles.name}>{post.author}</div>
          <div style={styles.meta}>{post.followers} Followers • {post.timeAgo} • {post.edited ? 'Edited' : ''}</div>
        </div>
      </div>

      <div style={styles.postBody}>
        <p>
          {post.content}
        </p>
        {post.image && (
          <img src={post.image} alt="Post" style={styles.postImage} />
        )}
      </div>

      <div style={styles.postActions}>
        <button 
          style={{...styles.button, color: post.liked ? '#4CAF50' : 'gray'}} 
          onClick={() => onLike(post.id)}
        >
          👍 {post.likes} Like{post.likes !== 1 ? 's' : ''}
        </button>
        <button 
          style={styles.button} 
          onClick={() => setShowComments(!showComments)}
        >
          💬 {post.comments.length} Comment{post.comments.length !== 1 ? 's' : ''}
        </button>
        <button 
          style={styles.button} 
          onClick={() => onRepost(post.id)}
        >
          🔁 Repost
        </button>
        <button style={styles.button} onClick={() => onShare(post.id)}>🔗 Share</button>
      </div>

      {showComments && (
        <div style={styles.commentsSection}>
          <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={styles.commentInput}
            />
            <button type="submit" style={styles.commentButton}>Post</button>
          </form>
          <div style={styles.commentsList}>
            {post.comments.map((comment, index) => (
              <div key={index} style={styles.comment}>
                <div style={styles.commentHeader}>
                  <div style={styles.commentAvatar}>{comment.author.charAt(0)}</div>
                  <div style={styles.commentAuthor}>{comment.author}</div>
                </div>
                <div style={styles.commentContent}>{comment.content}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Home() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('refuturePosts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    } else {
      return [
        {
          id: 1,
          author: 'Yamil Angura',
          followers: '2,321',
          timeAgo: '1w',
          edited: true,
          content: 'Just got my first job in the Netherlands! After 6 months of learning Dutch, it finally paid off. So grateful for all the support! 🎉',
          likes: 42,
          liked: false,
          comments: [
            { author: 'Piet Jan', content: 'Great post!' },
            { author: 'Erik', content: 'I agree with this.' }
          ],
          repostedFrom: null,
          image: null,
        },
        {
          id: 2,
          author: 'Piet Jan',
          followers: '523',
          timeAgo: '3w',
          edited: true,
          content: 'Looking for a Dutch language partner to practice speaking. I can help with English in return! Anyone interested?',
          likes: 15,
          liked: false,
          comments: [
            { author: 'John Doe', content: 'Nice one!' }
          ],
          repostedFrom: null,
          image: null,
        },
        {
          id: 3,
          author: 'Erik',
          followers: '4,741',
          timeAgo: '4w',
          edited: true,
          content: 'Finished my CV workshop today! Learned so much about Dutch job applications. Ready to start applying! 💼',
          likes: 89,
          liked: false,
          comments: [],
          repostedFrom: null,
          image: null,
        }
      ];
    }
  });

  useEffect(() => {
    localStorage.setItem('refuturePosts', JSON.stringify(posts));
  }, [posts]);

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handlePostSubmit = (content, image) => {
    const post = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      author: 'You',
      followers: '0',
      timeAgo: 'Just now',
      edited: false,
      content: content,
      image: image,
      linkPreview: null,
      likes: 0,
      liked: false,
      comments: [],
      repostedFrom: null
    };

    setPosts([post, ...posts]);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId, commentContent) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { author: 'You', content: commentContent }]
        };
      }
      return post;
    }));
  };

  const handleRepost = (postId) => {
    const originalPost = posts.find(post => post.id === postId);
    if (!originalPost) return;

    const repost = {
      id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
      author: 'You',
      followers: '0',
      timeAgo: 'Just now',
      edited: false,
      content: originalPost.content,
      image: originalPost.image,
      linkPreview: originalPost.linkPreview,
      likes: 0,
      liked: false,
      comments: [],
      repostedFrom: {
        author: originalPost.author,
        timeAgo: originalPost.timeAgo
      }
    };

    setPosts([repost, ...posts]);
  };

  const handleShare = (postId) => {
    const postToShare = posts.find(post => post.id === postId);
    if (postToShare) {
      const shareText = `Check out this post by ${postToShare.author}:\n\n"${postToShare.content}"`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Post content copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy post content.');
      });
    }
  };

  return (
    <div style={styles.page}>
      {/* Post Input Bar */}
      <div 
        style={styles.inputBar}
        onClick={() => setIsCreatePostOpen(true)}
      >
        <div style={styles.inputAvatar}>👤</div>
        <div style={styles.inputBox}>Start by writing your post..</div>
        <div style={styles.cameraIcon}>📷</div>
      </div>

      {/* Create Post Overlay */}
      <CreatePostOverlay
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handlePostSubmit}
      />

      {/* Post Cards */}
      {posts.map(post => (
        <Card
          key={post.id}
          post={post}
          onLike={handleLike}
          onComment={handleComment}
          onRepost={handleRepost}
          onShare={handleShare}
        />
      ))}
    </div>
  );
}

const styles = {
  page: {
    padding: 'var(--mobile-padding)',
    fontFamily: 'sans-serif',
    minHeight: '100vh',
    backgroundColor: 'transparent',
    maxWidth: 'var(--max-width)',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  inputBar: {
    display: 'flex',
    alignItems: 'center',
    background: '#f9f9f9',
    borderRadius: '999px',
    padding: '8px 12px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 30px auto',
    cursor: 'pointer',
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
    flexShrink: 0,
  },
  inputBox: {
    flexGrow: 1,
    background: '#f2f2f2',
    borderRadius: '999px',
    padding: '10px 16px',
    color: '#444',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cameraIcon: {
    fontSize: '20px',
    color: '#4f6bed',
    marginLeft: '12px',
    cursor: 'pointer',
    flexShrink: 0,
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
    boxSizing: 'border-box',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
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
    flexShrink: 0,
  },
  name: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  meta: {
    fontSize: '12px',
    color: 'gray',
    width: '100%',
    order: 3,
  },
  postBody: {
    marginTop: '12px',
    fontSize: '14px',
    color: '#333',
    wordBreak: 'break-word',
  },
  postActions: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '16px',
    borderTop: '1px solid #eee',
    paddingTop: '12px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  button: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: 'gray',
    padding: '8px',
    flex: '1',
    minWidth: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  },
  commentsSection: {
    marginTop: '16px',
    borderTop: '1px solid #eee',
    paddingTop: '12px',
  },
  commentForm: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
    flexWrap: 'wrap',
  },
  commentInput: {
    flex: '1',
    minWidth: '200px',
    padding: '8px 12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  commentButton: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  commentsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  comment: {
    padding: '8px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
  },
  commentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px',
    flexWrap: 'wrap',
  },
  commentAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    flexShrink: 0,
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
  commentContent: {
    fontSize: '14px',
    color: '#333',
    wordBreak: 'break-word',
  },
  repostHeader: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
    padding: '4px 0',
    borderBottom: '1px solid #eee'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '16px',
  },
  overlayContent: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  overlayHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    padding: '10px 0',
    zIndex: 1,
  },
  overlayTitle: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#333',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    padding: '4px',
  },
  postTextarea: {
    width: '100%',
    minHeight: '80px',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'vertical',
    marginBottom: '16px',
    boxSizing: 'border-box',
  },
  overlayActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  overlayIcons: {
    display: 'flex',
    gap: '16px',
  },
  icon: {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#666',
    padding: '4px',
  },
  postButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    whiteSpace: 'nowrap',
  },
  emojiPicker: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#f8f8f8',
    borderRadius: '4px',
    marginTop: '12px',
    maxHeight: '200px',
    overflowY: 'auto',
  },
  emoji: {
    fontSize: '24px',
    cursor: 'pointer',
    textAlign: 'center',
    padding: '4px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  imageAttachedIndicator: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: '8px 12px',
    borderRadius: '4px',
    marginBottom: '16px',
    fontSize: '14px',
    color: '#555',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px',
  },
  removeImageButton: {
    background: 'none',
    border: 'none',
    color: '#999',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0',
    lineHeight: '1',
  },
  postImage: {
    maxWidth: '100%',
    maxHeight: '400px',
    borderRadius: '4px',
    marginTop: '12px',
    objectFit: 'contain',
  },
};

// Add media query styles
const mediaQueries = {
  '@media (min-width: 768px)': {
    page: {
      padding: 'var(--tablet-padding)',
    },
    inputBar: {
      padding: '12px 16px',
    },
    card: {
      padding: '20px',
    },
    name: {
      fontSize: '18px',
    },
    meta: {
      width: 'auto',
      order: 0,
    },
    postBody: {
      fontSize: '16px',
    },
    button: {
      fontSize: '16px',
    },
  },
  '@media (min-width: 1024px)': {
    page: {
      padding: 'var(--desktop-padding)',
    },
    card: {
      padding: '24px',
    },
  },
};

// Merge media query styles with base styles
Object.keys(mediaQueries).forEach(query => {
  const styles = mediaQueries[query];
  Object.keys(styles).forEach(key => {
    if (typeof styles[key] === 'object') {
      Object.assign(styles[key], styles[key]);
    }
  });
});

export default Home;
