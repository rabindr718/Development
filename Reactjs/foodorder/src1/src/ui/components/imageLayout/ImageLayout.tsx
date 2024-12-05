import React from 'react';
import './ImageLayout.css'; // Import your CSS file for styling
import { relative } from 'path';

interface ImageLayoutProps {
  images: string[]; // Array of image URLs
}

const ImageLayout: React.FC<ImageLayoutProps> = ({ images }) => {
  return (
    <div className="grid-container">
      {images.map((image, index) => (
        <div
          style={{
            position: 'relative',
            gridRow: index === 1 ? '1 / 3' : undefined,
            gridColumn: index === 1 ? '2 / 3' : undefined,
          }}
        >
          {/* <object
              key={index}
              className="leftView"
              type="image/svg+xml"
              data={image}
              aria-label={`Left ${index + 1}`}
              ></object> */}
          <img
            style={{ objectFit: 'cover' }}
            className="leftView m0"
            src={image}
            alt={`Left ${index + 1}`}
          />
          <div className="bottamTextView m0">
            <div>
              <span>
                {index === 1
                  ? 'Energy Bill Reduction'
                  : 'Easy, Transparent Partnership'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageLayout;
