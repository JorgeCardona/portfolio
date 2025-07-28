import React, { useState } from 'react';
import './styles.css';
import { GET_MULTIMEDIA_FILE_URL } from '../config';

const GetMultimediaFile = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp3');
  const [trimStart, setTrimStart] = useState('');
  const [trimEnd, setTrimEnd] = useState('');
  const [includeThumbnail, setIncludeThumbnail] = useState(true);
  const [subtitleLangs, setSubtitleLangs] = useState('en,es');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url || !format) {
      setError('URL and format are required.');
      return;
    }

    setLoading(true);
    setError('');

    const params = new URLSearchParams({
      url,
      format,
      include_thumbnail: includeThumbnail,
    });

    if (trimStart) params.append('trim_start', trimStart);
    if (trimEnd) params.append('trim_end', trimEnd);
    if (subtitleLangs) params.append('subtitle_langs', subtitleLangs);

    try {
      const response = await fetch(`${GET_MULTIMEDIA_FILE_URL}?${params}`);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Download failed.');
      }

      const blob = await response.blob();

      // ✅ Safe header parsing
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'download.zip';

      if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition.split('filename=')[1].replace(/["']/g, '');
      }

      const blobURL = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobURL;
      link.download = filename;
      link.click();

      window.URL.revokeObjectURL(blobURL);
    } catch (err) {
      setError(err.message || 'Unexpected error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="multimedia-container">
      <h2>Download Multimedia File</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="input-group">
        <label>Video URL</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Format</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="mp3">mp3</option>
          <option value="mp4">mp4</option>
          <option value="original">original</option>
        </select>
      </div>

      <div className="input-group">
        <label>Trim Start (HH:MM:SS)</label>
        <input type="text" value={trimStart} onChange={(e) => setTrimStart(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Trim End (HH:MM:SS)</label>
        <input type="text" value={trimEnd} onChange={(e) => setTrimEnd(e.target.value)} />
      </div>

      <div className="input-group">
        <label>Include Thumbnail</label>
        <input type="checkbox" checked={includeThumbnail} onChange={(e) => setIncludeThumbnail(e.target.checked)} />
      </div>

      <div className="input-group">
        <label>Subtitle Languages (comma-separated)</label>
        <input type="text" value={subtitleLangs} onChange={(e) => setSubtitleLangs(e.target.value)} />
      </div>

      <button onClick={handleDownload} disabled={loading}>
        {loading ? 'Downloading...' : 'Download'}
      </button>
    </div>
  );
};

export default GetMultimediaFile;