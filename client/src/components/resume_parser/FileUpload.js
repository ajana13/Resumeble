import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
// import UploadService from "../services/FileUploadService";
import {  uploadResumeRequest } from "../../redux/actions/resumeActions";

function FileUpload ({ auth, history }) {

    const [file, setFile] = React.useState(null);
    const [previewSrc, setPreviewSrc] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = React.useState(false); // state to show preview only for images
    const dropRef = React.useRef(); // React ref for managing the hover state of droppable area
  

    const onDrop = (files) => {

        // We're uploading only one file at a time so the 
        // uploaded file will be available files[0] so we're 
        // using array destructuring syntax to get that 
        // file value.
        const [uploadedFile] = files;
        setFile(uploadedFile);
      
        const fileReader = new FileReader();
        // To convert the file to dataURL we call the fileReader.readAsDataURL method.
        // Once the file is successfully read as dataURL, the onload function of 
        // fileReader will be called.
        fileReader.onload = () => {
          setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(pdf|doc|docx)$/));
    };

    const updateBorder = (dragState) => {
        if (dragState === 'over') {
          dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
          dropRef.current.style.border = '2px dashed #e9ebeb';
        }
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        console.log(file);
        formData.append('name', file.name);
        formData.append('file', file);
        uploadResumeRequest(formData)
    }
    

	return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
                <form onSubmit={handleOnSubmit}>
                    <h3>React File Upload</h3>
                    {/* The onDragEnter function will be triggered when the file is over 
                    the drop area and onDragLeave function will be triggered when the file 
                    is removed from the drop area. */}
                    <div className="upload-section">
                        <Dropzone 
                            onDrop={onDrop}
                            onDragEnter={() => updateBorder('over')}
                            onDragLeave={() => updateBorder('leave')}>
                            {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                                <input {...getInputProps()} />
                                <p>Drag and drop a file OR click here to select a file</p>
                                {file && (
                                <div>
                                    <strong>Selected file:</strong> {file.name}
                                </div>
                                )}
                            </div>
                            )}
                        </Dropzone>
                        {previewSrc ? (
                            isPreviewAvailable ? (
                            <div className="image-preview">
                                <img className="preview-image" src={previewSrc} alt="Preview" />
                            </div>
                            ) : (
                            <div className="preview-message">
                                <p>No preview available for this file</p>
                            </div>
                            )
                        ) : (
                            <div className="preview-message">
                            <p>Image preview will be shown here after selection</p>
                            </div>
                        )}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </div>
	);
}
// https://www.pluralsight.com/guides/uploading-files-with-reactjs
FileUpload.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(
    mapStateToProps,
)(FileUpload);
