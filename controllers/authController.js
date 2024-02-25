const formidable = require('formidable');
const pool = require('../config/db');


class AuthController {
    registerPage = (req, res) => {
        return res.render('dashboard/register.ejs', {
            title: 'Register'
        });
    }

    registerUser = async (req, res) => {
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            const { email, password } = fields;
            const { image } = files;

            const user = {
                email,
                password,
                image: image ? image[0].originalFilename : null
            };

            const emailCheckQuery = `SELECT COUNT(*) AS count FROM users WHERE email = '${email}'`;

            pool.query(emailCheckQuery, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: 'There was a problem checking the email',
                        error: err
                    });
                }

                const emailExists = result.rows[0].count > 0;

                if (emailExists) {
                    return res.status(400).json({
                        message: 'Email already exists'
                    });
                }


                const insertQuery = `INSERT INTO users (email, password, img_url) VALUES ('${user.email}', '${user.password}', '${user.image}')`;

                pool.query(insertQuery, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'There was a problem registering the user',
                            error: err
                        });
                    }

                    return res.status(200).json({
                        message: 'User registered successfully'
                    });
                });
            });
        });
    };


}

module.exports = new AuthController();