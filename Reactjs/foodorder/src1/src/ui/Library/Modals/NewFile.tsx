import React, { useEffect, useRef, useState } from 'react';
import classes from './styles/newfile.module.css';
import CreateNewFolderLibrary from './CreateNewFolderLibrary';
import LibraryModel from '../components/LibraryModals (1)/LibraryModals/LibModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NewFileProps {
  activeSection: 'files' | 'folders' | 'dropdown' | null;
  onSort?: (option: string) => void;
  handleSuccess?: () => void;
  uploadPath?: string;
  folderUploadPath?: string;
  setLoading: (val: boolean) => void;
}

type Option = 'Upload folder' | 'New folder' | 'Upload file';

const NewFile: React.FC<NewFileProps> = ({
  activeSection,
  onSort,
  handleSuccess,
  uploadPath,
  folderUploadPath,
  setLoading,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleNewFolder, setIsVisibleNewFolder] = useState(false);
  const [isVisibleuploadFile, setIsVisibleuploadFile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const FolderInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [pendingState, sePendingState] = useState<
    'uploading' | 'creating' | ''
  >('');

  const handleClick = () => {
    setIsVisible(!isVisible);
    setIsVisibleuploadFile(false);
  };
  const handleClickNewFolder = () => {
    setIsVisibleNewFolder(!isVisibleNewFolder);
  };
  // Api code start for uploadFolder
  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles);
      setFiles(fileArray);
      console.log(
        'Selected files:',
        fileArray.map((file) => file.name)
      );
    }
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;
    const accessToken = Cookies.get('myToken');
    const apiUrlBase = `https://graph.microsoft.com/v1.0/sites/e52a24ce-add5-45f6-aec8-fb2535aaa68e/drives/b!ziQq5dWt9kWuyPslNaqmjstRGXtbSdFJt7ikFQDkwscktioganMSRLFyrCAJTFu-/root:${uploadPath || '/'}`;

    const MAX_TOTAL_SIZE = 60 * 1024 * 1024; // 60MB in bytes

    try {
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      // if (totalSize > MAX_TOTAL_SIZE) {
      //   throw new Error(`Total file size exceeds the 60MB limit. Current total: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);
      // }

      sePendingState('uploading');
      setIsVisible(false);

      await Promise.all(
        files.map(async (file) => {
          const apiUrl = `${apiUrlBase}${file.name}:/createUploadSession`;

          const sessionResponse = await axios.post(
            apiUrl,
            {
              item: { '@microsoft.graph.conflictBehavior': 'rename' },
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            }
          );

          const uploadUrl = sessionResponse.data.uploadUrl;
          const chunkSize = 320 * 1024;
          const totalChunks = Math.ceil(file.size / chunkSize);

          for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, file.size);
            const chunk = file.slice(start, end);

            await axios.put(uploadUrl, chunk, {
              headers: {
                'Content-Range': `bytes ${start}-${end - 1}/${file.size}`,
                'Content-Type': file.type || 'application/octet-stream',
              },
            });
          }

          toast.success(`File "${file.name}" uploaded successfully!`);
        })
      );

      await handleSuccess?.();
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFiles([]);
      setIsVisible(false);
    } catch (error) {
      console.error('Error during file upload:', error);
      if (error instanceof Error) {
        toast.error(`Upload failed: ${error.message}`);
      } else {
        toast.error('Error during file upload. Please try again.');
      }
    } finally {
      sePendingState('');
    }
  };

  useEffect(() => {
    if (files.length > 0) {
      uploadFiles();
    }
  }, [files]);

  const handleOptionClick = () => {
    FolderInputRef.current?.click();
  };

  //api code end for uploadFolder

  // Api code start for uploadFile
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    setIsVisible(false);
  };

  const closeOnSuccess = () => {
    handleSuccess?.();
    setIsVisible(false);
  };

  const handleOptionClickFile = () => {
    setIsCreateFolder(true);
  };
  // api code end for uploadFile

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (pendingState === 'uploading') {
        event.preventDefault();
        event.returnValue =
          'You have an upload in progress. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pendingState]);

  return (
    <div className={classes.newfile_container} ref={dropdownRef}>
      <button
        onClick={handleClick}
        disabled={pendingState === 'uploading'}
        className={classes.newfile_botton}
        style={
          isVisible ? { backgroundColor: '#377cf6', color: '#ffffff' } : {}
        }
      >
        {pendingState === 'uploading' ? (
          <span style={{ fontSize: 10 }}>Uploading...</span>
        ) : (
          ' + New'
        )}
      </button>
      {isVisible && (
        <ul className={classes.dropdownMenu}>
          <>
            <>
              <input
                id="file-upload"
                type="file"
                onChange={handleFolderChange}
                ref={FolderInputRef}
                style={{ display: 'none' }}
                className={classes.folderInput}
                multiple
              />
              {(activeSection === 'files' || activeSection === 'dropdown') && (
                <li
                  className={`${classes.dropdownItem} ${selectedOption === 'Upload file' ? classes.selected : ''}`}
                  onClick={handleOptionClick}
                >
                  + Upload file
                </li>
              )}
            </>

            {(activeSection === 'folders' || activeSection === 'dropdown') && (
              <li
                className={`${classes.dropdownItem} ${selectedOption === 'New folder' ? classes.selected : ''}`}
                onClick={handleOptionClickFile}
              >
                + New folder
              </li>
            )}
          </>
        </ul>
      )}

      {isCreateFolder && (
        <CreateNewFolderLibrary
          uploadPath={folderUploadPath}
          setIsVisibleNewFolder={setIsCreateFolder}
          handleSuccess={closeOnSuccess}
        />
      )}
    </div>
  );
};

export default NewFile;
function setFile(selectedFile: File | null) {
  throw new Error('Function not implemented.');
}

function convertFileToBase64(selectedFile: File) {
  throw new Error('Function not implemented.');
}

function setUploadedImage(base64File: void) {
  throw new Error('Function not implemented.');
}
