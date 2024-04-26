import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'sasa',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    /* if (genre) {
      // const lowerCaseGenre = genre.toLowerCase()

      // conseguir el id de los generos de la base de datos usando el nombre del genro
      /* const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      // no se ha encontrado ningun genero
      // if (genres.length === 0) return []

      // conseguir el ide del primer resultado del genero que salga
      // const [{ id }] = genres

      // conseguir todos los nombres de las peliculas de la tabla de la base de datos
      // una consulta a movie_genres
      // hacer un join
      // devolver resultados
    } */

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM movie;'
    )

    console.log(movies)
    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
        (UUID_TO_BIN("${uuid}"),?,?,?,?,?,?)`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // cuidado que puede usar informacion sensible
      console.log(e)
      throw new Error('Error creating movie')
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
      FROM movie WHERE id = UUID_TO_BIN(?)`,
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {

  }

  static async update ({ id, input }) {

  }
}
