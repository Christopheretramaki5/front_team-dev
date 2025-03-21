import React, { useState } from 'react';
import Profiles from '../pages/adminPages/profile.jpg';
import NavBar from './NavBar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Publications');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Jocelyn Christophère',
      content: 'Ceci est un exemple de publication sur le profil utilisateur.',
      timestamp: 'Il y a 2 heures',
      profileImage: 'https://images.pexels.com/photos/846080/pexels-photo-846080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const newPostObject = {
        id: posts.length + 1,
        author: 'Jocelyn Christophère',
        content: newPost,
        timestamp: 'À l\'instant',
        profileImage: 'https://images.pexels.com/photos/920384/pexels-photo-920384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      };
      setPosts([newPostObject, ...posts]);
      setNewPost('');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Publications':
        return (
          <div className="mt-4">
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Quoi de neuf ?"
              />
              <div className="flex justify-end mt-2">
                <button onClick={handlePostSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Publier</button>
              </div>
            </div>

            {posts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow mt-4">
                <div className="flex items-center mb-2">
                  <img src={post.profileImage} alt="Profil" className="w-10 h-10 rounded-full" />
                  <div className="ml-2">
                    <p className="font-bold">{post.author}</p>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                <p>{post.content}</p>
              </div>
            ))}
          </div>
        );
      case 'À propos':
        return (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-xl">À propos de Jocelyn Christophère</h2>
            <p>Je suis un développeur passionné par les nouvelles technologies, l'innovation et la création d'applications web. J'ai plus de 5 ans d'expérience dans le développement frontend et backend. Mon objectif est de créer des produits qui améliorent l'expérience utilisateur tout en étant performants et accessibles.</p>
            <p><strong>Date de naissance :</strong> 15 juin 1992</p>
            <p><strong>Localisation :</strong> Paris, France</p>
          </div>
        );
      case 'Amis':
        return (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-xl">Amis</h2>
            <div className="flex flex-wrap">
              {['Jean Dupont', 'Marie Lemoine', 'Paul Martin', 'Sophie Durand'].map((friend, index) => (
                <div key={index} className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mx-2 mb-4">
                  <img src="https://via.placeholder.com/150" alt="Ami" className="w-full h-full object-cover" />
                  <p className="text-center">{friend}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Photos':
        return (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-xl">Galerie de photos</h2>
            <div className="grid grid-cols-3 gap-4">
              {['https://via.placeholder.com/600x400', 'https://via.placeholder.com/600x400', 'https://via.placeholder.com/600x400'].map((photo, index) => (
                <div key={index} className="w-full h-32 bg-gray-300 rounded-lg overflow-hidden">
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        );
      case 'Reels':
        return (
          <div className="mt-4 bg-white p-4 rounded-lg shadow">
            <h2 className="font-bold text-xl">Reels vidéos</h2>
            <div className="grid grid-cols-2 gap-4">
              {['https://www.w3schools.com/html/movie.mp4', 'https://www.w3schools.com/html/movie.mp4'].map((video, index) => (
                <div key={index} className="w-full h-40 bg-gray-300 rounded-lg overflow-hidden">
                  <video className="w-full h-full" controls>
                    <source src={video} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture vidéo.
                  </video>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-[170px]">
      <NavBar />
      <div className="relative w-full max-w-5xl h-80 bg-gradient-to-r from-purple-400 to-blue-500 rounded-b-2xl overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute bottom-0 left-4 flex items-center p-4">
          <img src={Profiles} alt="Profil" className="w-36 h-36 rounded-full border-4 border-white" />
          <div className="ml-4 text-white">
            <h1 className="text-3xl font-bold">Jocelyn Christophère</h1>
            <p>4.9K ami(e)s</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl bg-white rounded-lg shadow mt-4 p-4 flex justify-around">
        {['Publications', 'À propos', 'Amis', 'Photos', 'Reels'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-gray-700 hover:text-blue-500 ${activeTab === tab ? 'font-bold' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="w-full max-w-5xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default Profile;
