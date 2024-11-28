let serverSignature;
let serverTimestamp;
let cloudinaryReturnedObject;
const cloudname = 'dggewe2of';

async function getSignature() {
  const signaturePromise = await fetch('/.netlify/functions/getSignature');
  const theResponse = await signaturePromise.json();
  console.log(theResponse);
  serverSignature = theResponse.signature;
  serverTimestamp = theResponse.timestamp;
}

getSignature();

document
  .querySelector('#file-field')
  .addEventListener('change', async function () {
    // create a blob of data
    const data = new FormData();
    data.append('file', document.querySelector('#file-field').files[0]); // .files[0]: only the first file user uploaded
    data.append('api_key', '769445293545881');
    data.append('signature', serverSignature);
    data.append('timestamp', serverTimestamp);

    // send to cloudinary
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudname}/auto/upload`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: function (e) {
          console.log(e.loaded / e.total);
        },
      }
    );

    console.log(cloudinaryResponse.data);
    cloudinaryReturnedObject = cloudinaryResponse.data;

    // getting the public id of the image
    console.log(cloudinaryResponse.data.public_id);

    document.querySelector(
      '#photo-preview'
    ).innerHTML = `<img src="https://res.cloudinary.com/${cloudname}/image/upload/w_190,h_190,c_fill/${cloudinaryResponse.data.public_id}.jpg"/>`;
  });
