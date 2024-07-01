import axios from 'axios';

const url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
const BASE_URL = `${url}/imageservice/v1/adddocumentfrombuffer`;

const uploadDocument = (volumeId, file) => {
  const fileExt = file.name.split('.').pop();
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1]; 
      try {
        const response = await axios.post(
          BASE_URL,
          {
            volumeId,
            fileExt,
            documentStream: base64String,
          }
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("File reading has failed."));
    reader.onabort = () => reject(new Error("File reading was aborted."));
    reader.readAsDataURL(file);
  });
};

export { uploadDocument };
