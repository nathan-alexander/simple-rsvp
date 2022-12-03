import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { uploadFile } from 'react-s3'
import { Buffer } from 'buffer'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
window.Buffer = Buffer

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET
const REGION = import.meta.env.VITE_S3_BUCKET_REGION
const ACCESS_KEY = import.meta.env.VITE_AWS_KEY
const SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET

const config = {
    bucketName: S3_BUCKET,
    region: REGION,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}
function UploadProfileImage() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedFileImage, setSelectedFileImage] = useState(null)
    const { user, updateUser } = useContext(UserContext)
    function handleFileInput(e) {
        setSelectedFile(e.target.files[0])
        setSelectedFileImage(URL.createObjectURL(e.target.files[0]))
    }
    async function handleUpload(file) {
        uploadFile(file, config)
            .then(
                (data) =>
                    updateUser({
                        ...user,
                        profileImageUrl: data.location,
                    }),
                toast.info('Profile updated!', {
                    position: toast.POSITION.TOP_RIGHT,
                })
            )
            .catch((err) => console.error(err))
    }

    return (
        <>
            <div className='image-upload'>
                {user.profileImageUrl ? (
                    <h3>Change profile image</h3>
                ) : (
                    <h3>Upload profile image</h3>
                )}
                {user.profileImageUrl && (
                    <img
                        src={selectedFileImage || user.profileImageUrl}
                        className='profile-image'
                    />
                )}
                <div className='uploader'>
                    <input type='file' onChange={handleFileInput} />
                    <button onClick={() => handleUpload(selectedFile)}>
                        Upload
                    </button>
                </div>
            </div>
            <ToastContainer autoClose={3000} />
        </>
    )
}

export default UploadProfileImage
