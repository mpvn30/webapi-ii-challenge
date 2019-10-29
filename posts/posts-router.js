const router = require('express').Router();

const db = require('../data/db');

//Test
router.get('/', (req, res) => {
    res.send('webapi-ii')
})

//POST
router.post('/', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

      if(!title || !contents){
          res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
      } else {
          db.insert(req.body)
          .then(response => {
              res.status(201).json({response})
          })
          .catch(error =>{
              res.status(500).json({error: "There was an error while saving the post to the database"})
          })
      }
})

//POST with ID
router.post('/:id/comments', (req, res) =>{
    const comment = req.body;
    if(!comment.post_id){
        res.status(404).json({message: "The post with the specified ID does not exist." })
    } else if(!comment.text){
        res.status(400).json({errorMessage: "Please provide text for the comment."})
    } else if(comment.post_id && comment.text){
        db.insertComment(comment)
        .then(response => {
            res.status(201).json(response)
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the comment to the database"})
        })
    }
})

//GET
router.get('/', (req, res) => {
    db.find()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

//GET with ID
router.get('/:id', (req, res) =>{
    let id = req.params.id;
    db.findById(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({message: "The post with the specified ID does not exist."})
    })
})

//GET with :id/comments
router.get('/:id/comments',(req, res) => {
    let id = req.params.id;
    if(!id){
        res.status(404).json({message: "The post with the specified ID does not exist." })
    } else {
    db.findPostComments()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(error => {
        res.status(500).json({error: "The comments information could not be retrieved."})
    })
    }
})

//DELETE
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!comment.post_id){
        res.status(404).json({message: "The post with the specified ID does not exist."})
    } else {
        db.remove(id)
        .then(response =>{
            if(response){
                res.status(200).json({message: "post deleted"})
            }
        })
        .catch(error => {
            res.status(500).json({error: "The post could not be removed"
            })
        })
    }
})

//PUT
server.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    if(!body.title && !body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        db.update(id, body)
        .then(response => {
        if (response) {
            db.findById(id)
            .then(reponse => {
                res.status(200).json({ api: "update working", response });
                })
            .catch(error => {
                res.send(500).json({
                    error: "The user information could not be modified."
                  });
                });
        } else {
              res.status(404).json({
                message: "The user with the specified ID does not exist."
              });
            }
          })
          .catch(error => {
            res.send(500).json({
              error: "The user information could not be modified."
            });
          });
      }
});

module.exports = router;