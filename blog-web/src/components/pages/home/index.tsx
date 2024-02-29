import React from 'react';
import PostsList from './PostList';
import './Home.scss'
const HomePage: React.FC = () => {
    return (
        <div className='wrapper'>
            <PostsList />
        </div>
    );
}

export default HomePage;
