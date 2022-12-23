const axios = require('axios');
const fs = require('fs');

const key = JSON.parse(fs.readFileSync("key.json"));
const openAIKey = key.secretKey;

exports.search = (query, callback) => {
  axios.post('https://api.openai.com/v1/completions', {
    prompt: query,
    max_tokens: 2048,
    model: "text-davinci-003",
    temperature: 0.5
  }, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${openAIKey}`
    }
  }).then((response) => {
    const result = {
      title: query,
      slug: `${query.replace(/ /g, "-")}`,
      date: new Date(),
      article: response.data.choices[0].text
    };

    const fileName = `${query.replace(/ /g, "-")}.json`;
    fs.writeFileSync(fileName, JSON.stringify(result));
    callback(null, result);
  }).catch((error) => {
    console.error(error);
    callback(error, null);
  });
};