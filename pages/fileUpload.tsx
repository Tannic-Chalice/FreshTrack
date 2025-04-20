import React from 'react';
import FileUpload from '../components/fileUpload';
import styles from '../styles/FileUploadPage.module.css'; // Import page-specific styles

const FileUploadPage: React.FC = () => {
  return (
    <div className={styles.fileUploadPage}>
      <FileUpload />  {/* Render the FileUpload component */}
    </div>
  );
};

export default FileUploadPage;
