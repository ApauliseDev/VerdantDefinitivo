USE VerdantRest

SELECT  * FROM Users 
INNER JOIN Lists ON 
Lists.userId = Users.id




SELECT * FROM Users

SELECT * FROM Lists

SELECT * FROM Movies


SELECT * FROM MoviesXLists


SELECT L.name, L.userId, Movies.title,U.username, M.movieId, Movies.tmdbId, L.id FROM  Lists L
INNER JOIN Users U ON 
U.id = L.userId
INNER JOIN MoviesXLists M
ON L.id = M.listId
INNER JOIN Movies ON
Movies.id = M.id
WHERE U.id = 4 

