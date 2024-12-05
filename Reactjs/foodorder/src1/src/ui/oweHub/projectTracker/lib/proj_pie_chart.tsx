import React, { useState } from 'react';
import { FiLink } from 'react-icons/fi';
import { RiExternalLinkLine } from 'react-icons/ri';
import './pojpie.css';

interface ProjPieChartProps {
  projectDetail: any;
}

const ProjPieChart: React.FC<ProjPieChartProps> = ({ projectDetail }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopyLink = (url: string | undefined) => {
    if (url) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(url);
        setTimeout(() => setCopied(null), 800); // Remove the message after 0.80 seconds
      });
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    url: string | undefined
  ) => {
    if (!url || !projectDetail) {
      e.preventDefault(); // Prevent navigation if no URL or projectDetail is not present
    }
  };

  const isDisabled = !projectDetail;

  return (
    <>
      <div className="pm-doc-heading">Resources</div>

      <div className="pc-links">
        {/* CAD Link */}
        <div className={`pc-link ${isDisabled ? 'disable-btn' : ''}`}>
          <div className="link-head">
            <h3>CAD</h3>
            <span>Go to Document for more info</span>
          </div>
          <div className="link-url">
            <div
              className={`link-tab ${!projectDetail?.cad_link ? 'disable-btn' : ''}`}
              onClick={() =>
                !isDisabled && handleCopyLink(projectDetail?.cad_link)
              }
            >
              <FiLink />
            </div>
            <div
              className={`link-tab ${!projectDetail?.cad_link ? 'disable-btn' : ''}`}
            >
              <a
                href={projectDetail?.cad_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleClick(e, projectDetail?.cad_link)}
              >
                <RiExternalLinkLine />
              </a>
            </div>
          </div>
          {copied === projectDetail?.cad_link && (
            <span className="copy-message"> Copied!</span>
          )}
        </div>

        {/* DAT Link */}
        <div className={`pc-link ${isDisabled ? 'disable-btn' : ''}`}>
          <div className="link-head">
            <h3>DAT</h3>
            <span>Go to Document for more info</span>
          </div>
          <div className="link-url">
            <div
              className={`link-tab ${!projectDetail?.dat_link ? 'disable-btn' : ''}`}
              onClick={() =>
                !isDisabled && handleCopyLink(projectDetail?.dat_link)
              }
            >
              <FiLink />
            </div>
            <div
              className={`link-tab ${!projectDetail?.dat_link ? 'disable-btn' : ''}`}
            >
              <a
                href={projectDetail?.dat_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleClick(e, projectDetail?.dat_link)}
              >
                <RiExternalLinkLine />
              </a>
            </div>
          </div>
          {copied === projectDetail?.dat_link && (
            <span className="copy-message"> Copied!</span>
          )}
        </div>

        {/* Contract Link */}
        <div className={`pc-link ${isDisabled ? 'disable-btn' : ''}`}>
          <div className="link-head">
            <h3>Contract</h3>
            <span>Go to Document for more info</span>
          </div>
          <div className="link-url">
            <div
              className={`link-tab ${!projectDetail?.includeContractUrl ? 'disable-btn' : ''}`}
              onClick={() =>
                !isDisabled && handleCopyLink(projectDetail?.includeContractUrl)
              }
            >
              <FiLink />
            </div>
            <div
              className={`link-tab ${!projectDetail?.includeContractUrl ? 'disable-btn' : ''}`}
            >
              <a
                href={projectDetail?.includeContractUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) =>
                  handleClick(e, projectDetail?.includeContractUrl)
                }
              >
                <RiExternalLinkLine />
              </a>
            </div>
          </div>
          {copied === projectDetail?.includeContractUrl && (
            <span className="copy-message"> Copied!</span>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjPieChart;
