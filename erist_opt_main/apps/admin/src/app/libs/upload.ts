import { environment } from '../../environments/environment';

export const uploadImage = async (file: any) => {
  const operations = `{
  "query": "mutation ($file: Upload!) { uploadProductImageToMinio(ProductUploadImageDTO: { image: $file }) { imageName } }",
  "variables": {
    "file": null
  }
}`;
  const map = `{"0": ["variables.file"]}`;

  const formData = new FormData();
  formData.append('operations', operations);
  formData.append('map', map);
  formData.append('0', file);

  const access_token = localStorage.getItem('access_token');

  const result = await fetch(environment.apiUrl, {
    method: 'POST',
    headers: {
      'x-apollo-operation-name': 'uploadProductImageToMinio',
      authorization: 'Bearer ' + access_token,
    },
    body: formData,
  });

  const data = await result.json();

  return data;
};
