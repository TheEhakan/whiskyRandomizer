
const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/bottles', authorization, async (req, res) => {

    //check if user is auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {

        //gathers bottle info to send to client
        const bottles = await pool.query('SELECT * FROM bottles WHERE user_id = $1 ORDER BY bottle_name ASC ', [req.user]);
        return res.json(bottles.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }
});

router.post('/bottles', authorization, async (req, res) => {

    //get info from user
    const { bottle_name, bottle_type, bottle_neat, bottle_iced, bottle_mixed, reject_cocktails } = req.body;

    //check if user is auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {
        //gather current bottle names
        const bottles = await pool.query('SELECT bottle_name FROM bottles WHERE user_id = $1', [req.user]);
        const bottleList = bottles.rows;

        //check to see if bottle already exixts for user
        for (b of bottleList) {
            const bottleName = b.bottle_name;
            if (bottleName === bottle_name){
                return res.json('Bottle already in list');
            };
        };

        //add bottle and return info to client
        const bottle = await pool.query('INSERT INTO bottles (bottle_name, bottle_type, bottle_neat, bottle_iced, bottle_mixed, user_id, reject_cocktails) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;', [bottle_name, bottle_type, bottle_neat, bottle_iced, bottle_mixed, req.user, reject_cocktails ]);

        return res.json(bottle.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }

});

router.put('/bottles', authorization, async (req, res) => {

    //get supplied bottle info
    const { bottle_id, bottle_name, bottle_type, bottle_neat, bottle_iced, bottle_mixed, reject_cocktails  } = req.body;

    //check if user is auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {

        //put edited data into the bottle table and return to the client
        const bottle = await pool.query('UPDATE bottles SET bottle_name = $2, bottle_type = $3, bottle_neat = $4, bottle_iced = $5, bottle_mixed = $6, reject_cocktails = ARRAY [$8] WHERE bottle_id = $1 AND user_id = $7 RETURNING *;', [bottle_id, bottle_name, bottle_type, bottle_neat, bottle_iced, bottle_mixed, req.user, reject_cocktails ]);

        return res.json(bottle.rows[0]);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }
});

router.delete('/bottles', authorization, async (req, res) => {

    //get supplied bottle id
    const { id } = req.body;

    //check if user is auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {

        //delete bottle with user and bottle id
        const bottle = await pool.query('DELETE FROM bottles WHERE bottle_id = $1 AND user_id = $2', [id, req.user]);
        return res.json(bottle ? 'Bottle Deleted' : 'Error');
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }
});




router.get('/cocktails', authorization, async (req, res) => {

    //check if user if auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {

        //get cocktail info and send it to client
        const cocktails = await pool.query('SELECT * FROM cocktails WHERE user_id = $1 ORDER BY cocktail_name ASC', [req.user]);
        return res.json(cocktails.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }
});

router.post('/cocktails', authorization, async (req, res) => {

    const { cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, cocktail_active } = req.body;

    //check if user if auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    };

    try {
        //gather current cocktail names
        const cocktails = await pool.query('SELECT cocktail_name FROM cocktails WHERE user_id = $1', [req.user]);
        const cocktailList = cocktails.rows;

        //check to see if cocktail already exixts for user
        for (c of cocktailList) {
            const cocktailName = c.cocktail_name;
            if (cocktailName === cocktail_name){
                return res.json('Cocktail already in list');
            };
        };

        //add cocktail and return info to client
        const cocktail = await pool.query('INSERT INTO cocktails (cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, user_id, cocktail_active) VALUES ($1, $2, ARRAY[$3], $4, $5, $6) RETURNING *;', [cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, req.user, cocktail_active]);

        return res.json(cocktail.rows);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    }
});

router.put('/cocktails', authorization, async (req, res) => {

    const { cocktail_id, cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, cocktail_active } = req.body;

        //check if user if auth
        if(!req.user) {
            return res.status(404).json('No user found.')
        };

        try {

            const cocktail = await pool.query('UPDATE cocktails SET cocktail_name = $1, cocktail_base_spirit = $2, cocktail_ingredients = ARRAY [$3], cocktail_recipe = $4, cocktail_active = $5 WHERE cocktail_id = $6 AND user_id = $7 RETURNING *', [cocktail_name, cocktail_base_spirit, cocktail_ingredients, cocktail_recipe, cocktail_active, cocktail_id, req.user]);

            return res.json(cocktail.rows[0]);
            
        } catch (error) {
            console.error(error.message);
            return res.status(500).json('Server Error');            
        }
})

router.delete('/cocktails', authorization, async (req, res) => {

    const { id } = req.body

    //check if user if auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    };

    try {
        const cocktail = await pool.query('DELETE FROM cocktails WHERE cocktail_id = $1 AND user_id = $2', [id, req.user])
        return res.json(cocktail ? 'Cocktail Deleted' : 'Error')
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');
    };

});

router.get('/settings', authorization, async (req, res) => {

    //check if user if auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {

        //get settings info and send to client
        const settings = await pool.query('SELECT user_settings FROM users WHERE user_id = $1', [req.user]);
        return res.json(settings.rows[0].user_settings);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');        
    }
});

router.put('/settings', authorization, async (req, res) => {

    //check if user if auth
    if(!req.user) {
        return res.status(404).json('No user found.')
    }

    try {

        //get settings info and send to client
        const settings = await pool.query('UPDATE users SET user_settings = ARRAY [$2, $3, $4] WHERE user_id = $1', [req.user, req.body[0], req.body[1], req.body[2]]);
        return res.json(settings);
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server Error');        
    }
})

module.exports = router;