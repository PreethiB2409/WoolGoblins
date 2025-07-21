import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../index.css';
import Header from "./Header";
import { supabase } from '/src/lib/supabaseClient.js';

function Customs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const [inspoFiles, setInspoFiles] = useState([]);
  const [paletteFiles, setPaletteFiles] = useState([]);
  const [size, setSize] = useState('');
  const [email, setEmail] = useState('');

  const showMenu = ["/archives", "/homepage", "/about", "/customs"].includes(location.pathname);

  const sanitizeFileName = (name) => name.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  const uploadToBucket = async (bucket, files) => {
    const urls = [];

    for (const file of files) {
      const uniqueName = `${Date.now()}-${sanitizeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(uniqueName, file);

      if (uploadError) {
        console.error(`${bucket} Upload Error:`, uploadError.message);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(uniqueName);

      urls.push(urlData.publicUrl);
    }

    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const inspoUrls = await uploadToBucket('inspo', inspoFiles);
      const paletteUrls = await uploadToBucket('palette', paletteFiles);

      const { error } = await supabase.from('Customs').insert([
        {
          size,
          cust_email: email,
          inspo_images: inspoUrls,
          colour_palette: paletteUrls,
        },
      ]);

      if (error) {
        console.error("Insert Error:", error.message);
        return;
      }

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
      setSize('');
      setEmail('');
      setInspoFiles([]);
      setPaletteFiles([]);
    } catch (err) {
      console.error("Unexpected Error:", err);
    }
  };

  return (
    <div className="customs-page">
      {showMenu && <Header />}
      <h1 className="customs-page-title">Customs</h1>
      <div className="customs-page-content">
        <h2>Want something custom made? Get in contact with us through our email!</h2>
        <p>Send us the following details and we'll get back to you!</p>
        <ul>
          <li>Inspiration images</li>
          <li>Colour palette (attach images of colours of your choice)</li>
          <li>Sizing details</li>
        </ul>

        <div className="customs-page-form">
          <form onSubmit={handleSubmit}>
            <label>
              Upload Inspiration Images:<br />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setInspoFiles(Array.from(e.target.files))}
              />
            </label>
            <br /><br />

            <label>
              Upload Colour Palette Images:<br />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setPaletteFiles(Array.from(e.target.files))}
              />
            </label>
            <br /><br />

            <label>
              Select Size:<br />
              <select value={size} onChange={(e) => setSize(e.target.value)} required>
                <option value="" disabled>--</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </label>
            <br /><br />

            <label>
              Email Address:<br />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <div className="customs-button-wrapper">
              <button type="submit" className="customs-form-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="customs-popup-overlay">
          <div className="customs-popup-content">Successfully Submitted!</div>
        </div>
      )}
    </div>
  );
}

export default Customs;
