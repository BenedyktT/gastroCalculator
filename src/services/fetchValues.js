const axios = require("axios");
require("dotenv").config();

module.exports = async data => {
  try {
    const response = await axios.post(
      `https://api.edamam.com/api/nutrition-details?app_id=${process.env.APPLICATION_ID}&app_key=${process.env.APPLICATION_KEY}`,
      data,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error(error.message);
    return { errors: [{ msg: error.message }] };
  }
};
