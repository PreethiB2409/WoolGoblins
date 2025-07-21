import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import { supabase } from '/src/lib/supabaseClient.js'; 

function Archives() {
  const navigate = useNavigate();
  const location = useLocation();
  const [archives, setArchives] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showMenu = [
    "/archives", 
    "/homepage", 
    "/about",
    "/customs",
  ].includes(location.pathname);

  useEffect(() => {
    const fetchArchives = async () => {
      const { data, error } = await supabase
        .from('Archives')
        .select('*');

      if (error) {
        console.error('Error fetching archives:', error);
      } else {
        setArchives(data);
      }
    };

    fetchArchives();
  }, []);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedItem.images.length - 1 ? 0 : prev + 1
    );
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const getImageUrl = (path) => {
    return `https://qphidvkhcxfgrlrlxcrj.supabase.co/storage/v1/object/public/archive-images/${path}`;
  };

  return (
    <div className="archives-page">
      {showMenu && <Header />}
      <h1 className="archive-page-title">Archives</h1>
      <div className="archive-page-grid">
        {archives.map((item, index) => (
          <div
            key={index}
            className="archive-page-item"
            onClick={() => openModal(item)}
          >
            <img src={getImageUrl(item.images[0])} alt={item.name} />
            <p className="archive-page-name">{item.name}</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="archive-modal-overlay" onClick={() => setSelectedItem(null)}>
          <div className="archive-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="archive-modal-close" onClick={() => setSelectedItem(null)}>×</button>
            <div className="archive-carousel-container">
              <button className="archive-carousel-arrow left" onClick={handlePrev}>‹</button>
              <img
                src={getImageUrl(selectedItem.images[currentImageIndex])}
                alt={`${selectedItem.name} ${currentImageIndex + 1}`}
                className="archive-carousel-image"
              />
              <button className="archive-carousel-arrow right" onClick={handleNext}>›</button>
            </div>
            <h2>{selectedItem.name}</h2>
            <p className="archive-carousel-description">{selectedItem.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Archives;
