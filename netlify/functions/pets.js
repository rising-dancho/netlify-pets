const handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: 'adfinem'.toUpperCase(),
  };
};

module.exports = { handler };
