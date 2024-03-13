import { React, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const imageupload = useRef(null);
  const [image, setimage] = useState(undefined);
  const [imageper, setimageperce] = useState(0);
  const [imagerror, setimagerror] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => setimageperce(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)),
      () => setimagerror(true),
      () => getDownloadURL(uploadTask.snapshot.ref).then((URL) => setFormData({ ...formData, profilePicture: URL }))
    );
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          ref={imageupload}
          hidden
          accept='image/*'
          onChange={(e) => setimage(e.target.files[0])}
        />
        <img
          src={formData?.profilePicture || currentUser?.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center rounded-full object-cover mt-2 cursor-pointer'
          onClick={() => imageupload.current.click()}
        />
        <p className='text-sm self-center'>
          {imagerror ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imageper > 0 && imageper < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imageper} %`}</span>
          ) : imageper === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input
          defaultValue={currentUser?.username}
          type='text'
          id='username'
          placeholder='username'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          defaultValue={currentUser?.email}
          type='text'
          id='Email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
        />
        <input
          type='password'
          id='Password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'> Sign out</span>
      </div>
    </div>
  );
}
