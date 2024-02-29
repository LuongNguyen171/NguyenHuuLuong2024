import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllComments, editCommentById } from '../../../redux/reducer/Comment';
import { deletePost, getAllPosts } from '../../../redux/reducer/Post';
import { AppDispatch, RootState } from '../../../redux/store/Store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import './Home.scss';

const PostsList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts } = useSelector((state: RootState) => state.Post);
  const { comments } = useSelector((state: RootState) => state.Comment);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const filteredPosts = searchTerm ? posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())) : posts;

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllComments());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const calculateDate = (createdAt: string | Date) => {
    const dateObject = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - dateObject.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };


  const toggleExpandedComments = (postId: number) => {
    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter(id => id !== postId));
    } else {
      setExpandedComments([...expandedComments, postId]);
    }
  };

  const handleEditClick = (commentId: number) => {
    if (editCommentId === commentId) {
      setEditCommentId(null);
    } else {
      setEditCommentId(commentId);
    }
  };
  const editComment = (args: { id: number, newComment: string }) => {
    dispatch(editCommentById(args))
      .then(() => {
        dispatch(getAllComments());
        setEditCommentId(null);
      })
      .catch((error) => {
        console.error("Error editing comment:", error);
      });
  }

  const deletePostById = (id: number) => {
    dispatch(deletePost(id))
      .then(() => {
        dispatch(getAllPosts());
      })
      .catch((error) => {
        console.error("Error delete post:", error);
      });
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 20px 20px 0', }}>

        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by title" />
      </div>
      <Col>
        {filteredPosts.map(post => (
          <Col key={post.id} className="margin-50" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card className="mb-3 custom-card" style={{ width: '95vw' }}>
              <Card.Body>
                <Card.Title className='text-align-ct'>{post.title}</Card.Title>
                <Row>
                  <Col>
                    <Card.Text>Author: {post.name}</Card.Text>
                    <Card.Text>Created at: {new Date(post.created_at).toLocaleDateString()}</Card.Text>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={6} xl={6} className="d-flex align-items-center justify-content-end">
                    {post.tags.map(tag => (
                      <Button key={tag} variant="primary" className="me-2 mb-2" size="sm">{tag}</Button>
                    ))}
                  </Col>
                  <Col xs={12}>
                    <Card.Text className="content margin-top-50">{post.content.substring(0, 500)}</Card.Text>
                  </Col>
                </Row>
                <Button style={{ marginTop: '10px' }} variant="danger" onClick={() => deletePostById(post.id)}>Delete post</Button>
              </Card.Body>
              <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
                <hr style={{ width: '90%' }} />
              </div>

              <div className="comment-toggle" onClick={() => toggleExpandedComments(post.id)}>
                {expandedComments.includes(post.id) ? 'Hide replies' : `${comments.filter(comment => comment.post === post.id).length} replies`}
              </div>
              {expandedComments.includes(post.id) && comments.filter(comment => comment.post === post.id).map(reply => (
                <div key={reply.id} className="margin-20">
                  <Row className="row-cols-auto align-items-center">
                    <Col xs={0} md={0}>
                      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIfunwpbaZNROdHPF4MY_xSbHPC7GyC6P06A&usqp=CAU" style={{ width: '30px', height: '30px' }} roundedCircle />
                    </Col>
                    <Col>
                      {reply.name === '' ? <Card.Text style={{ fontWeight: '600', opacity: '0.6' }}>anonymous</Card.Text> : <Card.Text style={{ fontWeight: '600', opacity: '0.6' }}>{reply.name}</Card.Text>}
                    </Col>
                    <Col>
                      <Card.Text style={{ color: '#999' }}>{calculateDate(reply.created_at)} days ago</Card.Text>
                    </Col>
                  </Row>
                  <div className="comment-content">
                    {editCommentId === reply.id ? (
                      <input placeholder='edit the comment'
                        onKeyDown={(e: any) => {
                          if (e.key === "Enter")
                            editComment({ id: reply.id, newComment: e.target.value });
                        }}
                      />
                    ) : (
                      <Card.Text style={{ marginLeft: '54px' }} >{reply.content}</Card.Text>
                    )}
                    <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" onClick={() => handleEditClick(reply.id)} />
                  </div>
                </div>
              ))}
            </Card>
          </Col>
        ))}
      </Col>
    </div>
  );
};

export default PostsList;
