const handler = async () => {
  const pets = [
    {
      _id: {
        $oid: '64bc22876e40c1fa9f63411g',
      },
      name: 'Baker',
      species: 'cat',
      birthYear: '2015',
      description:
        'Baker purrs very frequently but also enjoys kneading fresh biscuits every morning.',
      photo:
        'https://learnwebcode.github.io/bootcamp-pet-data/photos/baker.jpg',
    },
    {
      _id: {
        $oid: '64bc22876e40c1fa9f63422i',
      },
      name: 'Frank',
      species: 'dog',
      birthYear: '2019',
      description:
        'Frank is friends with all the other cats and dogs at our center. We have never seen a friendlier dog.',
      photo:
        'https://learnwebcode.github.io/bootcamp-pet-data/photos/frank.jpg',
    },
    {
      _id: {
        $oid: '64bc22876e40c1fa9f63455f',
      },
      name: 'Meowsalot',
      species: 'cat',
      birthYear: '2023',
      description:
        'Meowsalot is the most talkative cat we’ve ever come across. Constant meowing, chirping and purring.',
      photo:
        'https://learnwebcode.github.io/bootcamp-pet-data/photos/meowsalot.jpg',
    },
    {
      _id: {
        $oid: '64bc27486e40c1fa9f634561',
      },
      name: 'Barksalot',
      species: 'dog',
      birthYear: '2022',
      description:
        'Barksalot is a sweet and lovable 3 year old ball of fluff. He loves carrots, celery, and playing fetch.',
      photo:
        'https://learnwebcode.github.io/bootcamp-pet-data/photos/barksalot.jpg',
    },
    {
      _id: {
        $oid: '64bc27786e40c1fa9f634562',
      },
      name: 'Woof',
      species: 'dog',
      birthYear: '2013',
      description:
        'Woof is a very talkative and sweet pup. She loves beets, plums, cuddles and jumping over low fences.',
    },
    {
      _id: {
        $oid: '64bc27906e40c1fa9f634563',
      },
      name: 'Purrsloud',
      species: 'cat',
      birthYear: '2017',
      description:
        'Purrsloud has the loudest and most relaxing purr that’s come through our center. Come hear it yourself.',
      photo:
        'https://learnwebcode.github.io/bootcamp-pet-data/photos/purrsloud.jpg',
    },
  ];

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pets),
  };
};

module.exports = { handler };
