const handler = async () => {
  return {
    stutusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: 2 + 2,
  };
};

module.exports = { handler };
