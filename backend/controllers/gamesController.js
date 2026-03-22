//SQL
const connection = require('../config/db.js');
//get all Games
exports.getAllGames=(req,res)=>{
    connection.query('SELECT*FROM games', (err, rows, fields)=>{
        if(err)throw err;
            res.json(rows);
    });

};

//Search a Game by id
exports.getGamesById=(req,res)=>{

    const id = req.params.id;
    connection.query('SELECT * FROM games WHERE id=? OR category=?', [id, id],(err,rows,fields)=>{
        if(err)throw err;
        if(rows.length>0)
            res.json(rows);
        else 
            res.status(404).json({message:'Game not found'});   
    });
};
//Create a new Game
//CRUD - Create
exports.createGame=(req,res)=>{
    const {game_name, category, difficulty, rating, status} = req.body;
    connection.query('INSERT INTO games(game_name, category, difficulty, rating, status) VALUES(?,?,?,?,?)', [game_name, category, difficulty, rating, status],(err,result)=>{
        if(err)throw err;
            res.json({message:'Game created successfully', GameId:result.insertId});
    })
}
exports.updateGame=(req,res)=>{
     const {id,game_name, category, difficulty, rating,status} = req.body;
     connection.query('UPDATE games SET game_name=?, category=?, difficulty=?, rating=?, status=? WHERE id=?',[game_name, category, difficulty, rating, status, id], (err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0)
            res.json({message:'Game updated successfully'});
        else
            res.status(404).json({message:'Game not found'});
     });
};
exports.deleteGame = (req, res) => {
    const { id } = req.body;
    connection.query("DELETE FROM games WHERE id=?", [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0)
            res.json({ message: 'Game delete successfully' });
        else
            res.status(404).json({ message: 'Game not found' });
    });
};