USE Verdant


select * from Users



select username,Lists.name from  Users 
INNER JOIN listsxUsers ON
Users.id = listsxUsers.userId
INNER JOIN Lists ON
listsxUsers.listId = Lists.id
WHERE Users.username = 'AgusPau'






select * from listsxUsers where  userId = 1;