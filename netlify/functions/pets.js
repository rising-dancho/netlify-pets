const handler = async () => {
  return {
    stutusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: 'adfinem'.toUpperCase(),
  };
};

module.exports = { handler };
