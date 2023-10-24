import axios from 'axios';

const baseUrl = 'https://swdprojectapi.azurewebsites.net/api';

async function fetchJwtToken(email) {
  const url = `${baseUrl}/accounts/login`;
  const data = JSON.stringify({ email });

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const { accessToken, id, role } = response.data;
      // Làm gì đó với accessToken, id và role
      return accessToken;
    } else {
      throw new Error(`Failed to fetch JWT token ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Failed to fetch JWT token: ${error.message}`);
  }
}

// Sử dụng hàm fetchJwtToken
const email = 'example@email.com'; // Thay thế bằng email thực tế
fetchJwtToken(email)
  .then(accessToken => {
    console.log(`JWT Token: ${accessToken}`);
    // Tiếp tục xử lý sau khi có accessToken
  })
  .catch(error => {
    console.error(error.message);
  });