const mysql = require('mysql2')
const util = require('util')

async function main () {
  try {
    const pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'applicationuser',
      password: process.env.DB_PASS || 'applicationuser',
      database: process.env.DB_NAME || 'movie_db'
    })
    pool.query = util.promisify(pool.query)
    const imageURL = process.env.IMAGESSA_URL || '';
    const publicationsQuery = 'INSERT INTO publications (name, avatar) VALUES ?'
    const publicationsValues = [
      ['The Daily Reviewer', 'glyphicon-eye-open'],
      ['International Movie Critic', 'glyphicon-fire'],
      ['MoviesNow', 'glyphicon-time'],
      ['MyNextReview', 'glyphicon-record'],
      ['Movies n\' Games', 'glyphicon-heart-empty'],
      ['TheOne', 'glyphicon-globe'],
      ['ComicBookHero.com', 'glyphicon-flash']
    ]
    await pool.query(publicationsQuery, [publicationsValues])

    const reviewersQuery = 'INSERT INTO reviewers (name, publication, avatar) VALUES ?'
    const reviewersValues = [
      ['Robert Smith', 'The Daily Reviewer', `${imageURL}/RoberthSmith.webp`],
      ['Chris Harris', 'International Movie Critic', `${imageURL}/ChrisHarris.webp`],
      ['Janet Garcia', 'MoviesNow', `${imageURL}/YanetGarcia.webp`],
      ['Andrew West', 'MyNextReview', `${imageURL}/AndrewWest.webp`],
      ['Mindy Lee', 'Movies n\' Games', `${imageURL}/MindyLee.webp`],
      ['Martin Thomas', 'TheOne', `${imageURL}/MartinThomas.webp`],
      ['Anthony Miller', 'ComicBookHero.com', `${imageURL}/AnthonyMiller.webp`]
    ]
    await pool.query(reviewersQuery, [reviewersValues])

    const moviesQuery = 'INSERT INTO movies (title, release_year, score, reviewer, publication) VALUES ?'
    const moviesValues = [
      ['Suicide Squad', '2016', 8, 'Robert Smith', 'The Daily Reviewer'],
      ['Batman vs. Superman', '2016', 6, 'Chris Harris', 'International Movie Critic'],
      ['Captain America: Civil War', '2016', 9, 'Janet Garcia', 'MoviesNow'],
      ['Deadpool', '2016', 9, 'Andrew West', 'MyNextReview'],
      ['Avengers: Age of Ultron', '2015', 7, 'Mindy Lee', 'Movies n\' Games'],
      ['Ant-Man', '2015', 8, 'Martin Thomas', 'TheOne'],
      ['Guardians of the Galaxy', '2014', 10, 'Anthony Miller', 'ComicBookHero.com'],
      ['Doctor Strange', '2016', 7, 'Anthony Miller', 'ComicBookHero.com'],
      ['Superman: Homecoming', '2017', 10, 'Chris Harris', 'International Movie Critic'],
      ['Wonder Woman', '2017', 8, 'Martin Thomas', 'TheOne']
    ]
    await pool.query(moviesQuery, [moviesValues])

    console.log('Seeds succesfully executed')
    process.exit(0)
  } catch (err) {
    console.error('Seeds file error:', err)
    process.exit(1)
  }
}

main()
