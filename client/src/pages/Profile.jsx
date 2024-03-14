import { React, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserSuccess,updateUserFailure } from '../redux/user/userSlice';

export default function Profile() {
  const dispatch = useDispatch()
  const imageupload = useRef(null);
  const [image, setimage] = useState(undefined);
  const [imageper, setimageperce] = useState(0);
  const [imagerror, setimagerror] = useState(false);
  const { currentUser, loading, error  } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  const handleDeleteAccount = async () => {
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };
  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-3xl font-semibold'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
          onChange={handleChange}

        />
        <input
          defaultValue={currentUser?.email}
          type='text'
          id='Email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          autoComplete="username"
          onChange={handleChange}

        />
        <input
          type='password'
          id='Password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
          autoComplete="current-password"
        />
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading?'Loading...':'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handleDeleteAccount}>Delete account</span>
        <span className='text-red-700 cursor-pointer'  onClick={handleSignOut}> Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>
    
    </div>
  );
}
