import React, { useState, useRef, useEffect } from 'react';
import { TranslatedText, useTranslation, translateText } from './translate';
import './home.css';
import './ProfilePage.css';
import { useAuth } from '../context/AuthContext';

function CreatePostOverlay({ isOpen, onClose, onSubmit }) {
  const [content, setContent] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const [selectedImageName, setSelectedImageName] = useState(null);
  const [imageForSubmission, setImageForSubmission] = useState(null);
  const fileInputRef = useRef(null);
  const { language } = useTranslation();
  const [translatedPlaceholder, setTranslatedPlaceholder] = useState("What's on your mind?");

  useEffect(() => {
    const getPlaceholder = async () => {
      const translated = await translateText("What's on your mind?", language);
      setTranslatedPlaceholder(translated);
    };
    getPlaceholder();
  }, [language]);

  const emojis = [
    '😊', '😂', '❤️', '👍', '🎉', '🙏', '💪', '🤝',
    '😎', '😍', '😢', '😡', '🤔', '👏', '🎯', '💼'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim() && !imageForSubmission) return;
    
    onSubmit(content, imageForSubmission);
    setContent('');
    setSelectedImageName(null);
    setImageForSubmission(null);
    onClose();
  };

  const handleEmojiClick = (emoji) => {
    setContent(prev => prev + emoji);
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
      <div style={styles.modal}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}><TranslatedText text="Create Post" /></h2>
          <button onClick={onClose} style={styles.closeButton}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={translatedPlaceholder}
            style={styles.postInput}
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

function ProfileOverlay({ user, onClose }) {
  // Mock profile data based on user
  const mockProfiles = {
    'Yamil Angura': {
      name: 'Yamil Angura',
      countryOfOrigin: 'Colombia',
      location: { city: 'Amsterdam', region: 'Noord-Holland', country: 'Netherlands' },
      connections: 2321,
      experience: [
        { title: 'Software Engineer', company: 'Tech BV', startDate: '2021-01-01', endDate: null, location: 'Amsterdam', type: 'Full-time' }
      ],
      languages: [
        { name: 'Spanish', proficiency: 'Native', isLearning: false },
        { name: 'Dutch', proficiency: 'Intermediate', isLearning: true }
      ],
      testScores: [
        { language: 'Dutch', score: 85, maxScore: 100, stars: 4, date: '2024-05-01' }
      ],
      cvs: [
        { name: 'Modern CV', description: 'A modern CV template', updatedAt: '2024-05-10' }
      ]
    },
    'Piet Jan': {
      name: 'Piet Jan',
      countryOfOrigin: 'Netherlands',
      location: { city: 'Rotterdam', region: 'Zuid-Holland', country: 'Netherlands' },
      connections: 523,
      experience: [
        { title: 'Language Partner', company: 'Language Exchange', startDate: '2022-03-01', endDate: null, location: 'Rotterdam', type: 'Part-time' }
      ],
      languages: [
        { name: 'Dutch', proficiency: 'Native', isLearning: false },
        { name: 'English', proficiency: 'Advanced', isLearning: false }
      ],
      testScores: [
        { language: 'English', score: 92, maxScore: 100, stars: 5, date: '2024-04-15' }
      ],
      cvs: [
        { name: 'Traditional CV', description: 'A traditional CV template', updatedAt: '2024-04-20' }
      ]
    },
    'Erik': {
      name: 'Erik',
      countryOfOrigin: 'Netherlands',
      location: { city: 'Utrecht', region: 'Utrecht', country: 'Netherlands' },
      connections: 4741,
      experience: [
        { title: 'CV Workshop Leader', company: 'Job Center', startDate: '2020-09-01', endDate: null, location: 'Utrecht', type: 'Full-time' }
      ],
      languages: [
        { name: 'Dutch', proficiency: 'Native', isLearning: false },
        { name: 'English', proficiency: 'Fluent', isLearning: false }
      ],
      testScores: [
        { language: 'Dutch', score: 98, maxScore: 100, stars: 5, date: '2024-03-10' }
      ],
      cvs: [
        { name: 'Minimalistic CV', description: 'A minimalistic CV template', updatedAt: '2024-03-15' }
      ]
    }
  };
  const profile = mockProfiles[user] || mockProfiles['Yamil Angura'];
  return (
    <div className="profile-overlay-modal" onClick={onClose}>
      <div className="profile-page profile-overlay-content" onClick={e => e.stopPropagation()}>
        <header className="profile-header">
          <button onClick={onClose} className="back-button">×</button>
          <span className="profile-title">Profile</span>
        </header>
        <div className="profile-content">
          <div className="profile-info-box">
            <div className="profile-icon-placeholder" style={{ backgroundImage: 'url(/user.png)' }}></div>
            <h2>{profile.name}</h2>
            <p>Country of origin: {profile.countryOfOrigin}</p>
            <p>{profile.location.city}, {profile.location.region}, {profile.location.country}</p>
            <p>{profile.connections} Connections</p>
          </div>
          <div className="profile-section">
            <div className="section-header"><h3>Experience</h3></div>
            {profile.experience.map((exp, i) => (
              <div key={i} className="experience-item">
                <p>{exp.title}</p>
                <p>{exp.company}</p>
                <p>{new Date(exp.startDate).toLocaleDateString()} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : 'Present'}</p>
                <p>{exp.location}</p>
                <p>{exp.type}</p>
              </div>
            ))}
          </div>
          <div className="profile-section">
            <div className="section-header"><h3>Languages</h3></div>
            {profile.languages.map((lang, i) => (
              <div key={i} className="language-item">
                <p>{lang.name} {lang.isLearning ? '(Learning)' : ''}</p>
                <p>Proficiency: {lang.proficiency}</p>
              </div>
            ))}
          </div>
          <div className="profile-section">
            <div className="section-header"><h3>Test Scores</h3></div>
            {profile.testScores.map((score, i) => (
              <div key={i} className="test-score-item">
                <p>{score.language}: {score.score}/{score.maxScore} ({'⭐'.repeat(score.stars)}{'☆'.repeat(5-score.stars)})</p>
                <p>Date: {new Date(score.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
          <div className="profile-section">
            <div className="section-header"><h3>CVs</h3></div>
            {profile.cvs.map((cv, i) => (
              <div key={i} className="cv-item">
                <p>{cv.name}</p>
                <p>{cv.description}</p>
                <p>Last updated: {new Date(cv.updatedAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ post, onLike, onComment, onRepost, onShare, isLast, onUserClick }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onComment(post.id, newComment);
    setNewComment('');
  };

  return (
    <div style={{
      ...styles.card,
      marginBottom: isLast ? '100px' : '20px'
    }}>
      {post.repostedFrom && (
        <div style={styles.repostHeader}>
          🔁 Reposted from {post.repostedFrom.author} • {post.repostedFrom.timeAgo}
        </div>
      )}
      <div style={styles.postHeader}>
        <div style={styles.avatar}>{post.author.charAt(0)}</div>
        <div>
          <div
            style={styles.name}
            onClick={post.author !== 'You' ? () => onUserClick(post.author) : undefined}
            className={post.author !== 'You' ? 'post-author-link' : ''}
          >
            {post.author}
          </div>
          <div style={styles.meta}>{post.followers} Followers • {post.timeAgo} • {post.edited ? 'Edited' : ''}</div>
        </div>
      </div>

      <div style={styles.postBody}>
        <TranslatedText text={post.content} />
      </div>

      {post.image && (
        <img src={post.image} alt="Post" style={styles.postImage} />
      )}

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
                <div style={styles.commentContent}>
                  <TranslatedText text={comment.content} />
                </div>
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
  const [selectedPost, setSelectedPost] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [postToShare, setPostToShare] = useState(null);
  const [showRepostModal, setShowRepostModal] = useState(false);
  const [postToRepost, setPostToRepost] = useState(null);
  const [repostComment, setRepostComment] = useState('');
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const [profileUser, setProfileUser] = useState(null);

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

  // Only open overlay for other users
  const handleUserClick = (author) => {
    if (author === 'You') return;
    setProfileUser(author);
  };

  return (
    <div className="home-page">
      <div className="post-bar">
        <div className="post-bar-content" onClick={() => setIsCreatePostOpen(true)}>
          <div className="post-bar-avatar">👤</div>
          <div className="post-bar-input">
            <TranslatedText text="What's on your mind?" />
          </div>
        </div>
      </div>

      {isCreatePostOpen && (
        <CreatePostOverlay
          isOpen={isCreatePostOpen}
          onClose={() => {
            setIsCreatePostOpen(false);
            setSelectedImage(null);
          }}
          onSubmit={handlePostSubmit}
        />
      )}

      <div style={{
        ...styles.page,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        padding: 'var(--mobile-padding)',
        paddingBottom: 'calc(var(--mobile-padding) + 800px)',
        boxSizing: 'border-box'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {/* Post Cards */}
          {posts.map((post, index) => (
            <Card
              key={post.id}
              post={post}
              onLike={handleLike}
              onComment={handleComment}
              onRepost={handleRepost}
              onShare={handleShare}
              isLast={index === posts.length - 1}
              onUserClick={handleUserClick}
            />
          ))}
        </div>
      </div>
      {profileUser && <ProfileOverlay user={profileUser} onClose={() => setProfileUser(null)} />}
    </div>
  );
}

const styles = {
  page: {
    padding: 'var(--mobile-padding)',
    paddingBottom: 'calc(var(--mobile-padding) + 800px)',
    fontFamily: 'sans-serif',
    minHeight: '100vh',
    backgroundColor: 'transparent',
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    position: 'relative',
  },
  inputBar: {
    display: 'flex',
    alignItems: 'center',
    background: '#f9f9f9',
    borderRadius: '999px',
    padding: '8px 12px',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '100%',
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
    cursor: 'pointer',
  },
  card: {
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    width: '100%',
    maxWidth: '100%',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '20px',
    boxSizing: 'border-box',
    position: 'relative',
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
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  modalHeader: {
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
  modalTitle: {
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
  postInput: {
    width: '100%',
    minHeight: '40px',
    maxHeight: '120px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '8px',
    resize: 'vertical',
    fontSize: '14px',
    lineHeight: '1.4',
    backgroundColor: 'transparent',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '8px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    whiteSpace: 'nowrap',
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
    display: 'block',
    margin: '12px auto',
  },
  overlayActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '16px',
  },
  overlayIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  icon: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: 'gray',
    padding: '0',
  },
  postButton: {
    padding: '8px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    whiteSpace: 'nowrap',
  },
  emojiPicker: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '16px',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
  },
  emoji: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    color: 'gray',
    padding: '0',
  },
  '&:last-child': {
    marginBottom: '100px',
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
